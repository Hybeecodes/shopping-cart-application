import HttpException from '../exceptions/http.exception';
import * as HttpStatus from 'http-status';
import { JwtService } from '../jwt/jwt.service';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from '../../services/user.service';
import { ErrorMessages } from '../../constants/error-messages.enum';

export class AuthGuardMiddleware {
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  constructor(userService: UserService, jwtService: JwtService) {
    this.jwtService = jwtService;
    this.userService = userService;
  }

  authenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req['user'] = await this.validateRequest(req as { headers: { authorization: any } });
      return next();
    } catch (e) {
      next(e);
    }
  };

  private async validateRequest(request: { headers: { authorization: any } }) {
    if (!request.headers.authorization) {
      throw new HttpException(ErrorMessages.NO_AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
    const auth = request.headers.authorization;
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED, HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
      const { email } = this.jwtService.verifyToken(token);
      return await this.userService.getUserByEmail(email);
    } catch (error) {
      const message = `Token error: ${error.message || error.name}`;
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
