const { check, body } = require("express-validator");
const  slugify  = require("slugify");
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");

exports.getSubCategoryValidator=[check('id').isMongoId().withMessage('invalid SubCategory id format'),validatorMiddleware,];
exports.createSubCategoryValidator=[
    check('name')
    .notEmpty().withMessage('name required')
    .isLength({min:2}).withMessage('name too short')
    .isLength({max:32}).withMessage('name too long').custom((val,{req})=>{
        req.body.slug = slugify(val);
        return true;
    
    }),
    check('category')
    .notEmpty().withMessage('category id required')
    .isMongoId().withMessage('invalid id format'),
    validatorMiddleware,];

exports.updateSubCategoryValidator=[check('id').isMongoId().withMessage('invalid SubCategory id format'),
body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
  
  }),validatorMiddleware,];    

exports.deleteSubCategoryValidator=[check('id').isMongoId().withMessage('invalid SubCategory id format'),validatorMiddleware,];    
