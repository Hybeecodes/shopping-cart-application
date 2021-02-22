import { IUserRepository } from '../repositories/interfaces/user.repository.interface';
import { ILogger } from '../utils/logger/logger.interface';
import { IUser } from '../interfaces/user.interface';
import { ErrorMessages } from '../constants/error-messages.enum';
import * as HttpStatus from 'http-status';
import HttpException from '../utils/exceptions/http.exception';

/**
 * @summary contains user related logic
 */
export class UserService {
  private readonly userRepository: IUserRepository;
  private readonly logger: ILogger;

  /**
   * @constructor
   * @param userRepository {IUserRepository}
   * @param logger {ILogger}
   */
  constructor(userRepository: IUserRepository, logger: ILogger) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  /**
   * Returns One User Details, given an ID
   * @param userId {number}
   * @returns {IUser}
   * @throws {HttpException}
   */
  async getUserById(userId: number): Promise<IUser> {
    let user: IUser;
    try {
      user = await this.userRepository.getUserById(userId);
    } catch (e) {
      this.logger.error(`${ErrorMessages.GET_USER_BY_ID_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.GET_USER_BY_ID_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!user) {
      this.logger.error(`${ErrorMessages.USER_NOT_FOUND}`);
      throw new HttpException(ErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * Returns One User Details, given an ID
   * @param email {string}
   * @returns {IUser}
   * @throws {HttpException}
   */
  async getUserByEmail(email: string): Promise<IUser> {
    let user: IUser;
    try {
      user = await this.userRepository.getUserByEmail(email);
    } catch (e) {
      this.logger.error(`${ErrorMessages.GET_USER_BY_EMAIL_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.GET_USER_BY_EMAIL_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!user) {
      this.logger.error(`${ErrorMessages.USER_NOT_FOUND}`);
      throw new HttpException(ErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
