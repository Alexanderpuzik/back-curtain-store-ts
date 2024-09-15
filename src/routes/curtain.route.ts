import express from 'express';
import curtainController from '../controllers/curtainController';
import { checkRoleMiddleware } from '../middlewares';

export const curtainRouter = express.Router();
curtainRouter.post('/', checkRoleMiddleware('ADMIN'), curtainController.create);
curtainRouter.get('/', curtainController.getAll);
curtainRouter.get('/:id', curtainController.getOne);
