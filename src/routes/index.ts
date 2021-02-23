import { Router } from 'express';
import { HomeController } from '../controllers/home.controller';
import AuthRouter from './auth.route';
import CartRouter from './cart.route';

const router = Router();
const homeController = new HomeController();


router.get('/', homeController.index);

router.use('/auth', AuthRouter);

router.use('/carts', CartRouter);

export default router;
