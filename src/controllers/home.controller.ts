import { RequestHandler, Request, Response } from 'express';
import { ResponseDto } from '../dtos/response.dto';
import { ResponseStatus } from '../interfaces/response.interface';
import { SuccessMessages } from '../constants/success-messages.enum';
import * as HttpStatus from 'http-status';

export class HomeController {
  index: RequestHandler = (req: Request, res: Response) => {
    const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.WELCOME_HOME);
    res.status(HttpStatus.OK).json(resObj);
  };
}
