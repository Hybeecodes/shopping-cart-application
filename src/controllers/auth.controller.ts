import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import * as HttpStatus from 'http-status';
import { ForgotPasswordRequestDto } from '../dtos/forgot-password-request.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';
import { ResponseDto } from '../dtos/response.dto';
import { ResponseStatus } from '../interfaces/response.interface';
import { SuccessMessages } from '../constants/success-messages.enum';

/**
 * @summary contains request handlers for authentication
 */
export class AuthController {
  private readonly authService: AuthService;

  /**
   *
   * @param authService {AuthService}
   */
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * Authenticates User
   * @param req {Request}
   * @param res (Response
   * @param next {NextFunction}
   * @returns {Response}
   */
  login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.login(req.body as LoginRequestDto);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.LOGIN_SUCCESSFUL, response);
      return res.status(HttpStatus.OK).send(resObj);
    } catch (e) {
      next(e);
    }
  };

  /**
   * Register New User
   * @param req {Request}
   * @param res (Response
   * @param next {NextFunction}
   * @returns {Response}
   */
  register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.register(req.body as RegisterRequestDto);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.REGISTRATION_SUCCESSFUL, response);
      return res.status(HttpStatus.CREATED).send(resObj);
    } catch (e) {
      next(e);
    }
  };

  /**
   * Forgot Password
   * @param req {Request}
   * @param res (Response
   * @param next {NextFunction}
   * @returns {Response}
   */
  forgotPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.forgotPassword(req.body as ForgotPasswordRequestDto);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.FORGOT_PASSWORD_SUCCESS, response);
      return res.status(HttpStatus.OK).send(resObj);
    } catch (e) {
      next(e);
    }
  };

  /**
   * Resets user password
   * @param req {Request}
   * @param res (Response
   * @param next {NextFunction}
   * @returns {Response}
   */
  resetPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.authService.resetPassword(req.body as ResetPasswordRequestDto);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.RESET_PASSWORD_SUCCESS, response);
      return res.status(HttpStatus.OK).send(resObj);
    } catch (e) {
      next(e);
    }
  };
}
