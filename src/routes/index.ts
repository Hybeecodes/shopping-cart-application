import { Router } from 'express';
import { HomeController } from '../controllers/home.controller';
const router = Router();
const homeController = new HomeController();
import AuthRouter from './auth.route';

router.get('/', homeController.index);

router.use('/auth', AuthRouter);

export default router;
