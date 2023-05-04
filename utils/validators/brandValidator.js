const { check, body } = require("express-validator");
const slugify =require('slugify');
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");

exports.getBrandValidator=[check('id').isMongoId().withMessage('invalid brand id format'),validatorMiddleware,];
exports.createBrandValidator=[
    check('name')
    .notEmpty().withMessage('name required')
    .isLength({min:3}).withMessage('name too short')
    .isLength({max:32}).withMessage('name too long')
    .custom((val,{req})=>{
        req.body.slug = slugify(val);
        return true;
    
    })
    
    ,validatorMiddleware,];

exports.updateBrandValidator=[check('id').isMongoId().withMessage('invalid brand id format'),

body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;

}),validatorMiddleware,];    

exports.deleteBrandValidator=[check('id').isMongoId().withMessage('invalid brand id format'),validatorMiddleware,];    
