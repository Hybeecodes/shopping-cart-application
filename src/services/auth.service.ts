import { LoginRequestDto } from '../dtos/login-request.dto';
import HttpException from '../utils/exceptions/http.exception';
import { ErrorMessages } from '../constants/error-messages.enum';
import * as HttpStatus from 'http-status';
import { WinstonLogger } from '../utils/logger/winston.logger';
import { ILogger } from '../utils/logger/logger.interface';
import { BcryptService } from '../utils/bcrypt/bcrypt.service';
import { JwtService } from '../utils/jwt/jwt.service';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { eventEmitter } from '../utils/events';
import { ForgotPasswordRequestDto } from '../dtos/forgot-password-request.dto';
import { nanoid } from 'nanoid';
import EventEmitter from 'events';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';
import { UserRepository } from '../repositories/user.repository';
import { IEmailService } from '../utils/email/email.service.interface';
import { EmailService } from '../utils/email/email.service';

/**
 * Authentication Service: contains all logic that's related to user authentication
 */
export class AuthService {
  private readonly userRepository: UserRepository;
  private readonly logger: ILogger;
  private readonly bcryptService: BcryptService;
  private readonly jwtService: JwtService;
  private readonly eventEmitter: EventEmitter;
  private readonly emailService: IEmailService;

  constructor(
    userRepository: UserRepository,
    logger: WinstonLogger,
    bcryptService: BcryptService,
    jwtService: JwtService
  ) {
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.logger = logger;
    this.bcryptService = bcryptService;
    this.jwtService = jwtService;
    this.eventEmitter = eventEmitter;
    this.initializeEventHandlers();
    this.emailService = new EmailService();
  }

  /**
   * Initializes the event handlers related to authentication
   */
  initializeEventHandlers() {
    this.eventEmitter.on('sendPasswordResetLink', async (data: { email: string; resetCode: string }) => {
      const { resetCode, email } = data;
      const payload = { email, resetCode };
      const hash = this.jwtService.signPayload(payload);
      const subject = 'Forgot Password';
      const message = `Your Reset Password hash is: ${hash}`;
      await this.emailService.sendMail(email, subject, message);
    });
  }

  /**
   * Authenticates user and returns access token
   * @param loginData {LoginRequestDto}
   * @return {LoginResponseDto}
   * @throws {HttpException}
   */
  async login(loginData: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = loginData;
    // verify if user with email exists
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
      throw new HttpException(ErrorMessages.INVALID_EMAIL_PASSWORD, HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await this.bcryptService.comparePassword(password, user['password']);

    if (!isPasswordCorrect) {
      this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
      throw new HttpException(ErrorMessages.INVALID_EMAIL_PASSWORD, HttpStatus.UNAUTHORIZED);
    }
    const token = this.jwtService.signPayload({ email });
    const response = new LoginResponseDto();
    response.token = token;
    response.displayName = user['displayName'];
    return response;
  }

  /**
   * Registers new user
   * @param registerData {RegisterRequestDto}
   * @returns {boolean}
   * @throws {HttpException}
   */
  async register(registerData: RegisterRequestDto): Promise<boolean> {
    const { displayName, email, password } = registerData;

    // ensure displayName and email are unique
    const checkEmail = await this.userRepository.getUserByEmail(email);
    if (checkEmail) {
      this.logger.error(ErrorMessages.EMAIL_EXISTS);
      throw new HttpException(ErrorMessages.EMAIL_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const checkDisplayName = await this.userRepository.getUserByDisplayName(displayName);
    if (checkDisplayName) {
      this.logger.error(ErrorMessages.DISPLAY_NAME_EXISTS);
      throw new HttpException(ErrorMessages.DISPLAY_NAME_EXISTS, HttpStatus.BAD_REQUEST);
    }
    try {
      const passwordHash = await this.bcryptService.hashPassword(password);

      const newUser = { ...registerData, password: passwordHash };
      await this.userRepository.save(newUser);
      return true;
    } catch (e) {
      this.logger.error(ErrorMessages.REGISTER_USER_FAILED);
      throw new HttpException(ErrorMessages.REGISTER_USER_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Sends Password Reset Hash to user's email
   * @param forgotPasswordData {ForgotPasswordRequestDto}
   * @returns {void}
   * @throws {HttpException}
   */
  async forgotPassword(forgotPasswordData: ForgotPasswordRequestDto): Promise<void> {
    const { email } = forgotPasswordData;
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      this.logger.error(ErrorMessages.USER_WITH_EMAIL_NOT_FOUND);
      throw new HttpException(ErrorMessages.USER_WITH_EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    try {
      const resetCode = nanoid(5);
      await this.userRepository.update({ resetCode }, user.id);
      eventEmitter.emit('sendPasswordResetLink', { email, resetCode });
      return;
    } catch (e) {
      this.logger.error(`${ErrorMessages.FORGOT_PASSWORD_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.FORGOT_PASSWORD_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Validates reset hash and updates user new password
   * @param resetPassData {ResetPasswordRequestDto}
   * @returns {void}
   * @throws {HttpException}
   */
  async resetPassword(resetPassData: ResetPasswordRequestDto): Promise<void> {
    const { hash, newPassword, confirmPassword } = resetPassData;
    // check if hash is valid
    let payload: { email: string; resetCode: string };
    try {
      payload = this.jwtService.verifyToken(hash);
    } catch (e) {
      this.logger.error(ErrorMessages.INVALID_RESET_HASH);
      throw new HttpException(ErrorMessages.INVALID_RESET_HASH, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.getUserByEmail(payload.email);
    if (!user) {
      this.logger.error(ErrorMessages.INVALID_RESET_HASH);
      throw new HttpException(ErrorMessages.INVALID_RESET_HASH, HttpStatus.BAD_REQUEST);
    }
    if (user.resetCode !== payload.resetCode) {
      this.logger.error(ErrorMessages.INVALID_RESET_HASH);
      throw new HttpException(ErrorMessages.INVALID_RESET_HASH, HttpStatus.BAD_REQUEST);
    }
    if (newPassword !== confirmPassword) {
      throw new HttpException(ErrorMessages.INVALID_CONFIRM_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    try {
      const password = await this.bcryptService.hashPassword(newPassword);
      await this.userRepository.update({ resetCode: null, password }, user.id);
      return;
    } catch (e) {
      this.logger.error(`${ErrorMessages.RESET_PASSWORD_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.RESET_PASSWORD_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
