import { BcryptService } from '../../src/utils/bcrypt/bcrypt.service';
import { JwtService } from '../../src/utils/jwt/jwt.service';
import { WinstonLogger } from '../../src/utils/logger/winston.logger';
import { MockUserRepository } from './mocks/mock-user.repository';
import { AuthService } from '../../src/services/auth.service';
import { LoginRequestDto } from '../../src/dtos/login-request.dto';
import HttpException from '../../src/utils/exceptions/http.exception';
import { ErrorMessages } from '../../src/constants/error-messages.enum';
import { LoginResponseDto } from '../../src/dtos/login-response.dto';
import * as HttpStatus from 'http-status';

let authService: AuthService;

describe('AuthenticationService', () => {
  beforeAll(() => {
    const bcryptService = new BcryptService();
    const jwtService = new JwtService();
    const logger = new WinstonLogger('Authentication Service Test');
    const userRepository = new MockUserRepository();
    authService = new AuthService(userRepository, logger, bcryptService, jwtService);
  });
  describe('AuthService should be Defined', () => {
    it('should pass', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('User Login', () => {
    it('should throw an error if email does not exist', async () => {
      const loginData: LoginRequestDto = {
        email: 'test1@test.com',
        password: '123456',
      };
      expect.assertions(3);
      const expectedResponse = await expect(authService.login(loginData));
      expectedResponse.rejects.toBeInstanceOf(HttpException);
      expectedResponse.rejects.toHaveProperty('message', ErrorMessages.INVALID_EMAIL_PASSWORD);
      expectedResponse.rejects.toHaveProperty('status', HttpStatus.UNAUTHORIZED);
    });

    it('should throw an error if password is wrong', async () => {
      const loginData: LoginRequestDto = {
        email: 'test1@test.com',
        password: '12345',
      };
      expect.assertions(3);
      const expectedResponse = await expect(authService.login(loginData));
      expectedResponse.rejects.toBeInstanceOf(HttpException);
      expectedResponse.rejects.toHaveProperty('message', ErrorMessages.INVALID_EMAIL_PASSWORD);
      expectedResponse.rejects.toHaveProperty('status', HttpStatus.UNAUTHORIZED);
    });

    it('should be successful if login details is correct', async () => {
      const loginData: LoginRequestDto = {
        email: 'test@test.com',
        password: 'password',
      };
      expect.assertions(3);
      const expectedResponse = expect(authService.login(loginData));
      await expectedResponse.resolves.toBeInstanceOf(LoginResponseDto);
      await expectedResponse.resolves.toHaveProperty('token');
      await expectedResponse.resolves.toHaveProperty('displayName');
    });
  });
});
