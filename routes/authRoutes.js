const express = require('express');
const router = express.Router();

const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/', authController.home);
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleOAuthCallback);
router.get('/profile', authController.profilePage);
router.get('/logout', authController.logout);

module.exports = router;