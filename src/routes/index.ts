import express from 'express';
import { curtainRouter } from './curtain.route';
import { brandRouter } from './brand.route';
import { typeRouter } from './type.route';
import { userRouter } from './user.route';

export const router = express.Router();
router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/curtain', curtainRouter);
