import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';
import * as HttpStatus from 'http-status';
import { ResponseDto } from '../../dtos/response.dto';
import { ResponseStatus } from '../../interfaces/response.interface';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Something went wrong';
  // modify error object based on dev env
  const resObj = new ResponseDto(ResponseStatus.ERROR, message);
  response.status(status).send(resObj);
  return next();
}

export default errorMiddleware;
