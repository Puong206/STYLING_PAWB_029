const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const verifyUser = require('../configs/verify');
const controllerContact = require('../controllers/controller-contact');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/contact', verifyUser.isLogin, controllerContact.getContact);
router.get('/profile', verifyUser.isLogin, profileController.profile);

module.exports = router;