import { WinstonLogger } from '../../src/utils/logger/winston.logger';
import { MockUserRepository } from './mocks/mock-user.repository';
import { UserService } from '../../src/services/user.service';
import HttpException from '../../src/utils/exceptions/http.exception';
import { ErrorMessages } from '../../src/constants/error-messages.enum';
import * as HttpStatus from 'http-status';

let userService: UserService;

describe('UserService', () => {
  beforeAll(() => {
    const logger = new WinstonLogger('User Service Test');
    const userRepository = new MockUserRepository();
    userService = new UserService(userRepository, logger);
  });

  describe('UserService should be Defined', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
    });
  });

  describe('Get User By Id', () => {
    it('should fail if user does not exist', async () => {
      const userId = 2;
      expect.assertions(3);
      const expectedResponse = await expect(userService.getUserById(userId));
      expectedResponse.rejects.toBeInstanceOf(HttpException);
      expectedResponse.rejects.toHaveProperty('message', ErrorMessages.USER_NOT_FOUND);
      expectedResponse.rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
    });

    it('should return user details', async () => {
      const userId = 1;
      expect.assertions(1);
      const expectedResponse = expect(userService.getUserById(userId));
      // await expectedResponse.resolves.toBeInstanceOf(IUser);
      await expectedResponse.resolves.toHaveProperty('id', userId);
    });
  });

  describe('Get User By Email', () => {
    it('should fail if user does not exist', async () => {
      const email = 'test1@test.com';
      expect.assertions(3);
      const expectedResponse = await expect(userService.getUserByEmail(email));
      expectedResponse.rejects.toBeInstanceOf(HttpException);
      expectedResponse.rejects.toHaveProperty('message', ErrorMessages.USER_NOT_FOUND);
      expectedResponse.rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
    });

    it('should return user details', async () => {
      const email = 'test@test.com';
      expect.assertions(1);
      const expectedResponse = expect(userService.getUserByEmail(email));
      // await expectedResponse.resolves.toBeInstanceOf(IUser);
      await expectedResponse.resolves.toHaveProperty('email', email);
    });
  });
});
