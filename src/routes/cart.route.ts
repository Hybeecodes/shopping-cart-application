import { Router } from 'express';
import { validateBody } from '../utils/middlewares/validator.middleware';
import { AddProductToCartRequestDto } from '../dtos/add-product-to-cart-request.dto';
import { CartService } from '../services/cart.service';
import { WinstonLogger } from '../utils/logger/winston.logger';
import { RedisService } from '../utils/redis/redis.service';
import { CartController } from '../controllers/cart.controller';
import { AuthGuardMiddleware } from '../utils/middlewares/auth-guard.middleware';
import { JwtService } from '../utils/jwt/jwt.service';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';

const productService = new ProductService(new ProductRepository(), new WinstonLogger('Product Module'));
const cartService = new CartService(new RedisService(), productService, new WinstonLogger('Cart Module'));
const cartController = new CartController(cartService);

const userRepository = new UserRepository();
const userLogger = new WinstonLogger('User Module');
const userService = new UserService(userRepository, userLogger);
const jwtService = new JwtService();
const authMiddleware = new AuthGuardMiddleware(userService, jwtService);

const router = Router();

router.post('/', authMiddleware.authenticate, validateBody(AddProductToCartRequestDto), cartController.add);

router.get('/', authMiddleware.authenticate, cartController.get);

router.delete('/', authMiddleware.authenticate, cartController.clear);

export default router;
