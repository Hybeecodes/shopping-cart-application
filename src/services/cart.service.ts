import { RedisService } from '../utils/redis/redis.service';
import { CartItem } from '../interfaces/cart-item';
import { ILogger } from '../utils/logger/logger.interface';
import { ErrorMessages } from '../constants/error-messages.enum';
import HttpException from '../utils/exceptions/http.exception';
import * as HttpStatus from 'http-status';
import { AddProductToCartRequestDto } from '../dtos/add-product-to-cart-request.dto';
import { ProductService } from './product.service';
import { CartDataResponse, CartItemResponse } from '../interfaces/cart-data';

export class CartService {
  private readonly redisService: RedisService;
  private readonly productService: ProductService;
  private readonly logger: ILogger;

  constructor(redisService: RedisService, productService: ProductService, logger: ILogger) {
    this.redisService = redisService;
    this.productService = productService;
    this.logger = logger;
  }

  async addProductToCart(userId: number, cartItem: AddProductToCartRequestDto): Promise<boolean> {
    // ensure that product exist
    const product = await this.productService.getProductById(cartItem.productId);
    // check if quantity is valid
    if (product.stockLevel < cartItem.quantity) {
      this.logger.error(`${ErrorMessages.INVALID_PRODUCT_QUANTITY}`);
      throw new HttpException(ErrorMessages.INVALID_PRODUCT_QUANTITY, HttpStatus.BAD_REQUEST);
    }
    try {
      const cartKey = CartService.generateUserCartKey(userId);
      // check if user cart record exists
      const cartDataStr = await this.redisService.get(cartKey);
      const cartData: CartItem[] = JSON.parse(cartDataStr);
      console.log(cartData);
      if (!cartData) {
        await this.redisService.set(cartKey, JSON.stringify([cartItem]));
      } else {
        // update product if product quantity exists in cart
        const productCartItem: CartItem = cartData.find((c) => {
          return c.productId === cartItem.productId;
        });

        if (productCartItem) {
          // check if updated quantity is valid
          if (product.stockLevel < productCartItem.quantity + cartItem.quantity) {
            this.logger.error(`${ErrorMessages.INVALID_PRODUCT_QUANTITY}`);
            throw new HttpException(ErrorMessages.INVALID_PRODUCT_QUANTITY, HttpStatus.BAD_REQUEST);
          }
          cartData.map((c) => {
            if (c.productId === cartItem.productId) {
              c.quantity += cartItem.quantity;
            }
          });

          await this.redisService.set(cartKey, JSON.stringify([...cartData]));
        } else {
          await this.redisService.set(cartKey, JSON.stringify([...cartData, cartItem]));
        }
      }
      return true;
    } catch (e) {
      this.logger.error(`${ErrorMessages.ADD_TO_CART_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.ADD_TO_CART_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserCart(userId: number): Promise<CartDataResponse> {
    try {
      const cartKey = CartService.generateUserCartKey(userId);
      const data = await this.redisService.get(cartKey);
      const cardData: CartItem[] = JSON.parse(data);
      return this.generateUserCartObject(cardData);
    } catch (e) {
      this.logger.error(`${ErrorMessages.GET_USER_CART_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.GET_USER_CART_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async clearUserCart(userId: number): Promise<void> {
    try {
      const cartKey = CartService.generateUserCartKey(userId);
      await this.redisService.set(cartKey, JSON.stringify([]));
    } catch (e) {
      this.logger.error(`${ErrorMessages.CLEAR_CART_FAILED}: ${e}`);
      throw new HttpException(ErrorMessages.CLEAR_CART_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserCart(userId: number) {}

  static generateUserCartKey(userId: number): string {
    return `USER_${userId}`;
  }

  async generateUserCartObject(cartData: CartItem[]) {
    try {
      let cartDataResponse = new CartDataResponse();
      for (const item of cartData) {
        // get all necessary details of cart
        const { productId } = item;
        const product = await this.productService.getProductById(productId);
        const itemResponse = new CartItemResponse();
        itemResponse.productId = product.id;
        itemResponse.productName = product.name;
        itemResponse.quantity = item.quantity;
        itemResponse.subTotal = item.quantity * product.sellingPrice;
        itemResponse.unitPrice = parseFloat(String(product.sellingPrice));
        itemResponse.sku = product.sku;
        cartDataResponse.totalAmount += itemResponse.subTotal;
        cartDataResponse.items.push(itemResponse);
      }
      return cartDataResponse;
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
