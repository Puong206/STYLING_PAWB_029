const router = require('express').Router();
const appController = require('../controllers/controller-app');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, appController.getApp);
router.get('/add', verifyUser.isLogin, appController.formApp);
router.post('/save', verifyUser.isLogin, appController.saveApp);
router.get('/edit/:id', verifyUser.isLogin, appController.editApp);
router.post('/update/:id', verifyUser.isLogin, appController.updateApp);
router.get('/delete/:id', verifyUser.isLogin, appController.deleteApp);

module.exports = router;