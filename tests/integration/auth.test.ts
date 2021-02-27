import request from 'supertest';
import app from '../../src/app';
import * as HttpStatus from 'http-status';
import { ErrorMessages } from '../../src/constants/error-messages.enum';
import { User } from '../../db/models/user';
import { ResponseStatus } from '../../src/interfaces/response.interface';
import { SuccessMessages } from '../../src/constants/success-messages.enum';

describe('Authentication Module', () => {
  afterAll(async () => {
    await User.destroy({ where: { email: 'paystackUser@mailinator.com' } }); // remove created record
  });

  describe('Register Endpoint', () => {
    it('should return true', async (done) => {
      const registerData = {
        email: 'paystackUser2@mailinator.com',
        password: 'password',
        displayName: 'testName',
      };
      const res = await request(app).post('/api/auth/register').send(registerData).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.status).toBe(ResponseStatus.SUCCESS);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(SuccessMessages.REGISTRATION_SUCCESSFUL);
      done();
    });

    it('should throw an error when email exists already', async (done) => {
      const registerData = {
        email: 'paystackUser@mailinator.com',
        password: 'password',
        displayName: 'testName',
      };
      const res = await request(app).post('/api/auth/register').send(registerData).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(ErrorMessages.EMAIL_EXISTS);
      done();
    });

    it('should throw an error when displayName exists already', async (done) => {
      const registerData = {
        email: 'paystackUser@mailinator.com',
        password: 'password',
        displayName: 'testName',
      };
      const res = await request(app).post('/api/auth/register').send(registerData).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(ErrorMessages.EMAIL_EXISTS);
      done();
    });

    it('should throw BAD REQUEST error when no data is sent is sent', async (done) => {
      const registerData = {};
      const res = await request(app).post('/api/auth/register').send(registerData).set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBeDefined();
      done();
    });
  });

  describe('Login Endpoint', () => {
    it('should return user token and display name when called', async (done) => {
      const loginData = {
        email: 'paystackUser@mailinator.com',
        password: 'password',
      };
      const res = await request(app).post('/api/auth/login').send(loginData).set('Accept', 'application/json');
      expect.assertions(6);
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.status).toBe(ResponseStatus.SUCCESS);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(SuccessMessages.LOGIN_SUCCESSFUL);
      expect(res.body.data).toHaveProperty('displayName');
      expect(res.body.data).toHaveProperty('token');
      done();
    });

    it('should throw an error when wrong email is sent', async (done) => {
      const loginData = {
        email: 'test1@gmail.com',
        password: 'password',
      };
      const res = await request(app).post('/api/auth/login').send(loginData).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(ErrorMessages.INVALID_EMAIL_PASSWORD);
      done();
    });

    it('should throw an error when wrong password is sent', async (done) => {
      const loginData = {
        email: 'paystackUser@mailinator.com',
        password: 'password22',
      };
      const res = await request(app).post('/api/auth/login').send(loginData).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(ErrorMessages.INVALID_EMAIL_PASSWORD);
      done();
    });

    it('should throw an error when no data is sent is sent', async (done) => {
      const loginData = {};
      const res = await request(app).post('/api/auth/login').send(loginData).set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBeDefined();
      done();
    });
  });

  describe('Forgot Password Endpoint', () => {
    it('should return true if all is good', async (done) => {
      const data = {
        email: 'paystackUser@mailinator.com',
      };
      const res = await request(app).post('/api/auth/password/forgot').send(data).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.status).toBe(ResponseStatus.SUCCESS);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(SuccessMessages.FORGOT_PASSWORD_SUCCESS);
      done();
    });

    it('should throw an error when no data is sent', async (done) => {
      const data = {};
      const res = await request(app).post('/api/auth/password/forgot').send(data).set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      done();
    });

    it('should throw an error when email does not exist', async (done) => {
      const data = {
        email: 'test22@gmail.com',
      };
      const res = await request(app).post('/api/auth/password/forgot').send(data).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(ErrorMessages.USER_WITH_EMAIL_NOT_FOUND);
      done();
    });
  });

  describe('Reset Password Endpoint', () => {
    it('should throw an error when no data is sent', async (done) => {
      const data = {};
      const res = await request(app).post('/api/auth/password/reset').send(data).set('Accept', 'application/json');
      expect.assertions(3);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      done();
    });

    it('should throw an error when invalid reset hash is sent', async (done) => {
      const data = {
        hash:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9iaWtveWExMUBnbWFpbC5jb20iLCJyZXNldENvZGUiOiJPaHB2dCIsImlhdCI6MTYxMjEzNDgyOCwiZXhwIjoxNjEyMTcwODI4fQ.vFPUNtUjdyunvLSuTzOc0rc44aVb4HWg0uyAxGMjyFQ',
        newPassword: 'password',
        confirmPassword: 'password',
      };
      const res = await request(app).post('/api/auth/password/reset').send(data).set('Accept', 'application/json');
      expect.assertions(4);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.status).toBe(ResponseStatus.ERROR);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toBe(ErrorMessages.INVALID_RESET_HASH);
      done();
    });
  });
});
