import {RedisService} from "../utils/redis/redis.service";
import {CartItem} from "../interfaces/cart-item";
import {ILogger} from "../utils/logger/logger.interface";
import {ErrorMessages} from "../constants/error-messages.enum";
import HttpException from "../utils/exceptions/http.exception";
import * as HttpStatus from "http-status";
import {AddProductToCartRequestDto} from "../dtos/add-product-to-cart-request.dto";

export class CartService {
    private readonly redisService: RedisService;
    private readonly logger: ILogger;

    constructor(
        redisService: RedisService,
        logger: ILogger
    ) {
        this.redisService = redisService;
        this.logger = logger;
    }

    async addProductToCart(userId: number, cartItem: AddProductToCartRequestDto): Promise<boolean> {
        try {
            const cartKey = CartService.generateUserCartKey(userId);
            // check if user cart record exists
            const cartData: CartItem[] = await this.redisService.get(cartKey);
            if (!cartData) {
                await this.redisService.set(cartKey, JSON.stringify([cartItem]));
            }else {
                await this.redisService.set(cartKey, JSON.stringify([...cartData, cartItem]));
            }
            return true;
        } catch (e) {
            this.logger.error(`${ErrorMessages.ADD_TO_CART_FAILED}: ${e}`);
            throw new HttpException(ErrorMessages.ADD_TO_CART_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserCart(userId: number): Promise<CartItem[]> {
        try {
            const cartKey = CartService.generateUserCartKey(userId);
            const data = await this.redisService.get(cartKey);
            return JSON.parse(data);
        } catch (e) {
            this.logger.error(`${ErrorMessages.GET_USER_CART_FAILED}: ${e}`);
            throw new HttpException(ErrorMessages.GET_USER_CART_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async clearUserCart(userId: number): Promise<void> {
        try {
            const cartKey = CartService.generateUserCartKey(userId);
            await this.redisService.set(cartKey, []);
        } catch (e) {
            this.logger.error(`${ErrorMessages.CLEAR_CART_FAILED}: ${e}`);
            throw new HttpException(ErrorMessages.CLEAR_CART_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUserCart(userId: number) {}

    static generateUserCartKey (userId: number): string {
        return `USER_${userId}`;
    }
}
