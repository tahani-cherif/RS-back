const { check , body} = require("express-validator");
const  slugify  = require("slugify");
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");

exports.getCategoryValidator=[check('id').isMongoId().withMessage('invalid category id format'),validatorMiddleware,];
exports.createCategoryValidator=[
    check('name')
    .notEmpty().withMessage('name required').custom((val,{req})=>{
        req.body.slug = slugify(val);
        return true;
    
    })
    .isLength({min:3}).withMessage('name too short')
    .isLength({max:32}).withMessage('name too long')
    ,validatorMiddleware,];

exports.updateCategoryValidator=[check('id').isMongoId().withMessage('invalid category id format'),
body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;

}),validatorMiddleware,];    

exports.deleteCategoryValidator=[check('id').isMongoId().withMessage('invalid category id format'),validatorMiddleware,];    
