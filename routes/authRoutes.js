const express = require('express');
const router = express.Router();
const { googleLogin, logout, checkLoginFromCookie } = require('../controllers/authController');

// Google login
router.post('/google', googleLogin);

// Logout route
router.post('/logout', logout);

// Check login from cookie
router.get('/checkLoginFromCookie', checkLoginFromCookie);


module.exports = router;
