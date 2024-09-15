import express from 'express';
import brandController from '../controllers/brandController';
import { checkRoleMiddleware } from '../middlewares';

export const brandRouter = express.Router();
brandRouter.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
brandRouter.get('/', brandController.getAll);
brandRouter.get('/:id', brandController.getOne);
