const { check, body } = require("express-validator");
const slugify =require('slugify');
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");

exports.createUserValidator=[
    check('username')
    .notEmpty().withMessage('username required')
    .isLength({min:3}).withMessage('username too short')
    .isLength({max:32}).withMessage('username too long')
    .custom((val,{req})=>{
        req.body.slug = slugify(val);
        return true;
    
    }),
    check('email')
    .trim()
    .isEmail().withMessage('invalid email')
    
    ,validatorMiddleware,];

exports.updateUserValidator=[check('id').isMongoId().withMessage('invalid User id format'),

body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;

}),validatorMiddleware,];    

exports.deleteUserValidator=[check('id').isMongoId().withMessage('invalid User id format'),validatorMiddleware,];    
