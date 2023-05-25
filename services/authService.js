const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
var generator = require('generate-password');

// const sendEmail = require('../utils/sendEmail');
const createToken = require('../utils/createToken');

const User = require("../models").User;
const {uploadSingleImage}= require('../middlewares/uploadImageMiddleware')
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
exports.uploadUserImage = uploadSingleImage('profileImg')
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename= `user-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/users/${filename}`);
    // Save image into our db
    req.body.profileImg = filename;}
    next();
    });
// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
 
  var passwords = generator.generate( {
    length: 10,
    uppercase: false
  });
  
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: passwords,
      passwordConfirm:passwords,
      role:req.body.role,
      profileImg:req.body.profileImg,
      phone:req.body.phone,
      CamionId:req.body.CamionId,
      EtablissementId:req.body.EtablissementId,
    });

    sendEmail(user.email,"Bienvenue à Reschool Ecology",`<!DOCTYPE html>
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
    
            <title>Laravel</title>
    
            <!-- Fonts -->
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    
            <!-- Styles -->
            <style>
                .email-page{
                    background-color: rgb(197, 251, 190);
                    font-size: 16px;
                    height: 100%;
                    margin: 10px ;
                    padding: 20px 8%;
                    font-family: Arial, Helvetica, sans-serif;
                }
    
                .card{
                   background-color:white;
                   padding: 20px;
                }
                .button-login{
                   background-color: rgb(50, 228, 50);
                   width: 25%;
                   height: 40px;
                   font-weight: bold;
                   color:white;
                   font-size: 16px;
                   border: none;
                   border-radius: 5px;
                }
                .button-login a{
                    color: white;
                    text-decoration: none;
                }
                .img-logo{
                    width: 60px;
                    height:60px;
                }
                .header{
                    display: grid;
                    grid-template-columns: 20% 50%;
    
                }
                .title{
                    font-size:25px;
                    font-weight:bold;
                    margin-top: 15px;
                    color: rgb(52, 129, 52);
                }
            </style>
        </head>
        
        <body>
         
            <div class="email-page">
                <div class="card">
                    <div class="header">
                        <img class="img-logo" src="https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/326177005_1130511484301457_5095460731561430591_n.png?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=koBxDbYiTX8AX-1tRlh&_nc_ht=scontent.ftun14-1.fna&oh=00_AfCfqJjoCNVJ6EErddIEHkTzM7mDnLhKhbeAOk9IhBQYLA&oe=64695065" alt="logo"/>
                        <p class="title">Nouveau mot de passe</p>
                    </div>
                    <hr/>
                        <p>Bonjour <b>${user.name}</b>    </p>
                        <p>
                            Nous sommes très heureux que vous ayez accepté  de devenir un membre à notre projet et nous sommes impatients de vous compter parmi nous.
                        </p>
                        <p>
                            Au nom de <b>Reschool ecology</b> , nous somme ravi de vous accueillir dans notre entreprise,
                            dans l’attente de vous connecter,
                        </p>
                         <p> <b>Email: </b>${user.email}</p>
                         <p> <b>Mot de passe: </b>${passwords}</p>
                    <button class="button-login"><a target="_blank" href="https://reschoolecology.tech">Login</a></button>
                </div>
            </div>
        </body>
    </html>
    `)
  // 2- Generate token
  const token = createToken(user.id);

  res.status(201).json({ data: user, token })
});
const sendEmail = async (email, subject, text) => {
  try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // sender address
        auth: {
          user:process.env.EMAIL,
          pass: process.env.PASSWORD
        }
       
      });

      await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: subject,
          html: text,
      });

      console.log("email sent sucessfully");
  } catch (error) {
      console.log(error, "email not sent");
  }
};



exports.genrateQrCode = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const {id}=req.params;
  const user = await User.findByPk(id);
   
  
    if (!user) {
        return next(
          new ApiError(`No user for this id ${id}`, 404)
        );
      }
      await user.update({
        qrCode: await bcrypt.hash(id, 12),
      })
      const updatedUser = await User.findByPk(id);  
    res.status(200).json({ data: updatedUser });
});

// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({where:{ email: req.body.email }});

  if (!user ) {
    return next(new ApiError('Incorrect email or', 401));
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect password', 401));
  }
  // 3) generate token
  const token = createToken(user.id);

  // Delete password from response
  const { password: _, ...userWithoutPassword } = user.toJSON();
  // 4) send response to client side
  res.status(200).json({ data: userWithoutPassword, token });
});

// @desc   make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new ApiError(
        'You are not login, Please login to get access this route',
        401
      )
    );
  }

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3) Check if user exists
  const currentUser = await User.findByPk(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        'The user that belong to this token does no longer exist',
        401
      )
    );
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          'User recently changed his password. please login again..',
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();
});

// // @desc    Authorization (User Permissions)
// // ["admin", "manager"]
 

// // @desc    Forgot password
// // @route   POST /api/v1/auth/forgotPassword
// // @access  Public
// exports.forgotPassword = asyncHandler(async (req, res, next) => {
//   // 1) Get user by email
//   const user = await User.findOne({where:{ email: req.body.email }});
//   if (!user) {
//     return next(
//       new ApiError(`There is no user with that email ${req.body.email}`, 404)
//     );
//   }
//   // 2) If user exist, Generate hash reset random 6 digits and save it in db
//   const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
//   const hashedResetCode = crypto
//     .createHash('sha256')
//     .update(resetCode)
//     .digest('hex');

//   // Save hashed password reset code into db
//   user.passwordResetCode = hashedResetCode;
//   // Add expiration time for password reset code (10 min)
//   user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   user.passwordResetVerified = false;

//   await user.save();

//   // 3) Send the reset code via email
//   const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Your password reset code (valid for 10 min)',
//       message,
//     });
//   } catch (err) {
//     user.passwordResetCode = undefined;
//     user.passwordResetExpires = undefined;
//     user.passwordResetVerified = undefined;

//     await user.save();
//     return next(new ApiError('There is an error in sending email', 500));
//   }

//   res
//     .status(200)
//     .json({ status: 'Success', message: 'Reset code sent to email' });
// });

// // @desc    Verify password reset code
// // @route   POST /api/v1/auth/verifyResetCode
// // @access  Public
// exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
//   // 1) Get user based on reset code
//   const hashedResetCode = crypto
//     .createHash('sha256')
//     .update(req.body.resetCode)
//     .digest('hex');

//   const user = await User.findOne({
//     passwordResetCode: hashedResetCode,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   if (!user) {
//     return next(new ApiError('Reset code invalid or expired'));
//   }

//   // 2) Reset code valid
//   user.passwordResetVerified = true;
//   await user.save();

//   res.status(200).json({
//     status: 'Success',
//   });
// });

// // @desc    Reset password
// // @route   POST /api/v1/auth/resetPassword
// // @access  Public
// exports.resetPassword = asyncHandler(async (req, res, next) => {
//   // 1) Get user based on email
//   const user = await User.findOne({where:{ email: req.body.email }});
//   if (!user) {
//     return next(
//       new ApiError(`There is no user with email ${req.body.email}`, 404)
//     );
//   }

//   // 2) Check if reset code verified
//   if (!user.passwordResetVerified) {
//     return next(new ApiError('Reset code not verified', 400));
//   }

//   user.password = req.body.newPassword;
//   user.passwordResetCode = undefined;
//   user.passwordResetExpires = undefined;
//   user.passwordResetVerified = undefined;

//   await user.save();

//   // 3) if everything is ok, generate token
//   const token = createToken(user._id);
//   res.status(200).json({ token });
// });