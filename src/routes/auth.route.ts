import { Router } from 'express';
import { validateBody } from '../utils/middlewares/validator.middleware';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { WinstonLogger } from '../utils/logger/winston.logger';
import { BcryptService } from '../utils/bcrypt/bcrypt.service';
import { JwtService } from '../utils/jwt/jwt.service';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { ForgotPasswordRequestDto } from '../dtos/forgot-password-request.dto';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';

// Get Auth  Service Dependencies
const userRepository = new UserRepository();
const logger = new WinstonLogger('Authentication');
const bcryptService = new BcryptService();
const jwtService = new JwtService();

const authService = new AuthService(userRepository, logger, bcryptService, jwtService);
const authController = new AuthController(authService);

const router = Router();

router.post('/login', validateBody(LoginRequestDto), authController.login);

router.post('/register', validateBody(RegisterRequestDto), authController.register);

router.post('/password/forgot', validateBody(ForgotPasswordRequestDto), authController.forgotPassword);

router.post('/password/reset', validateBody(ResetPasswordRequestDto), authController.resetPassword);

export default router;
