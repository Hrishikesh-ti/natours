const express = require('express');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/tour/:id', authController.protect, viewsController.getTour);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post(
  '/update-password',
  authController.protect,
  viewsController.updateUserPassword
);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
