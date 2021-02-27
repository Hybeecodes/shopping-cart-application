import { CartService } from '../services/cart.service';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ResponseDto } from '../dtos/response.dto';
import { ResponseStatus } from '../interfaces/response.interface';
import { SuccessMessages } from '../constants/success-messages.enum';
import * as HttpStatus from 'http-status';
import { AddProductToCartRequestDto } from '../dtos/add-product-to-cart-request.dto';

export class CartController {
  private readonly cartService: CartService;

  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  add: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['user']['id'];
      const response = await this.cartService.addProductToCart(userId, req.body as AddProductToCartRequestDto);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.ADD_TO_CART_SUCCESS, response);
      return res.status(HttpStatus.CREATED).send(resObj);
    } catch (e) {
      next(e);
    }
  };

  get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['user']['id'];
      const response = await this.cartService.getUserCart(userId);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.GET_CART_SUCCESS, response);
      return res.status(HttpStatus.OK).send(resObj);
    } catch (e) {
      next(e);
    }
  };

  clear: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['user']['id'];
      const response = await this.cartService.clearUserCart(userId);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.CLEAR_CART_SUCCESS, response);
      return res.status(HttpStatus.OK).send(resObj);
    } catch (e) {
      next(e);
    }
  };

  removeFromCart: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['user']['id'];
      const productId = parseInt(req.params.productId);
      const response = await this.cartService.removeProductFromCart(userId, productId);
      const resObj = new ResponseDto(
        ResponseStatus.SUCCESS,
        SuccessMessages.REMOVE_PRODUCT_FROM_CART_SUCCESS,
        response
      );
      return res.status(HttpStatus.OK).send(resObj);
    } catch (e) {
      next(e);
    }
  };
}
