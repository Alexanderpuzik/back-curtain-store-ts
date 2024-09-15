import Router from 'express'
const router = new Router()
import typeController from '../controllers/typeController'
import checkRole from '../middleware/checkRoleMiddleware'

router.post('/',checkRole('ADMIN'), typeController.create)
router.get('/',typeController.getAll)


module.exports = router
