import Router from 'express';
import brandController from '../controllers/brandController';
import checkRole from '../middleware/checkRoleMiddleware';

export const router = new Router();
router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getOne);
