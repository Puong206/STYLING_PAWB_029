const router = require('express').Router();
const contactController = require('../controllers').contact;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, contactController.getContact);
router.get('/add', verifyUser.isLogin, contactController.formContact);
router.post('/save', verifyUser.isLogin, contactController.saveContact);
router.get('/edit/:id', verifyUser.isLogin, contactController.editContact);
router.post('/update/:id', verifyUser.isLogin, contactController.updateContact);
router.get('/delete/:id', verifyUser.isLogin, contactController.deleteContact);

module.exports = router;