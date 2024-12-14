const router = require('express').Router();
const Profile = require('../controllers/controller-profile');
const Auth = require('../controllers/controller-auth');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userid) {
        return next();
    }
    res.redirect('/login');
};

// Routes
router.get('/profile', isAuthenticated, Profile.profile);
// ...existing code...

module.exports = router;
