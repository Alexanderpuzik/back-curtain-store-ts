const Router = require('express');
const router = new Router();
const curtainRouter = require('./curtainRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/curtain', curtainRouter);

module.exports = router;
