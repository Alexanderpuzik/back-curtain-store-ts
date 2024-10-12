import express from 'express';
import typeController from '../controllers/type.controller';
import { checkRoleMiddleware } from '../middlewares';

export const typeRouter = express.Router();
typeRouter.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
typeRouter.get('/', typeController.getAll);
