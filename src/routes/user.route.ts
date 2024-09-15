import express from 'express';
import userController from '../controllers/userController';
import { authMiddleware } from '../middlewares';

export const userRouter = express.Router();
userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', authMiddleware, userController.check);
