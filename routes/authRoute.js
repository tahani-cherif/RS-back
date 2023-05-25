const express = require('express');
const {
  signupValidator,
  loginValidator,
} = require('../utils/validators/authValidator');

const {
  signup,
  login,
  genrateQrCode, resizeImage,uploadUserImage
  
} = require('../services/authService');

const router = express.Router();
router.post('/qrcode/:id', genrateQrCode);
router.post('/signup', uploadUserImage, resizeImage,signupValidator,signup);
router.post('/login', loginValidator, login);
// router.post('/forgotPassword', forgotPassword);
// router.post('/verifyResetCode', verifyPassResetCode);
// router.put('/resetPassword', resetPassword);

module.exports = router;