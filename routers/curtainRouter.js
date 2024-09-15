const Router = require('express');
const router = new Router();
const curtainController = require('../controllers/curtainController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), curtainController.create);
router.get('/', curtainController.getAll);
router.get('/:id', curtainController.getOne);

module.exports = router;
