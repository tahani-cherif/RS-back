const { check, body } = require("express-validator");
const  slugify  = require("slugify");
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");
const CategoryModel = require("../../Models/categoryModel");
const SubCategoryModel = require("../../Models/subCategoryModel");

exports.getProductValidator=[check('id').isMongoId().withMessage('invalid product id format'),validatorMiddleware,];
exports.createProductValidator=[
    check('title')
    .notEmpty().withMessage('product title required')
    .isLength({min:3}).withMessage('must be at least 3 characters').custom((val,{req})=>{
      req.body.slug = slugify(val);
      return true;
  
  }),
    check('description')
    .notEmpty().withMessage('product description required')
    .isLength({max:2000}).withMessage('Too long description'),
    check('quantity')
    .notEmpty().withMessage('product quantity required')
    .isNumeric().withMessage('product quantity must be a number'),
    check('sold')
    .optional()
    .isNumeric().withMessage('product sold must be a number'),
    check('price')
    .notEmpty().withMessage('product price required')
    .isNumeric().withMessage('product price must be a number')
    .isLength({max:32}).withMessage('Too long price'),
    check('priceAfterDiscount')
    .optional()
    .toFloat()
    .isNumeric().withMessage('product priceAfterDiscount must be a number')
    .custom((value,{req})=>{
        if(req.body.price <= value){
          throw new Error('priceAfterDiscount must be lower than price')
        }
        return true;
    }),
    check('availableColors')
    .optional()
    .isArray().withMessage('availableColors should be array of strings'),
    check('imageCover')
    .notEmpty().withMessage('product imageCover required'),
    check('images')
    .optional()
    .isArray().withMessage('images should be array of strings'),
    check('category')
    .notEmpty().withMessage('product must be belong to a category')
    .isMongoId().withMessage('Invalid ID formate')
    .custom((categoryId)=> 
    CategoryModel.findById(categoryId).then((category)=>{
      if(!category){
        return Promise.reject(new Error(`Invalid Category for this id : ${categoryId}`));
      }
    }))
    ,
 
    check('subCategories')
    .optional()
    .isMongoId().withMessage('Invalid ID formate')
    .custom((subCategoryIds)=> 
    SubCategoryModel.find({_id:{$exists:true,$in:subCategoryIds}}).then((result)=>{
      if(result.length <1 || result.length!==subCategoryIds.length){
        const difference = subCategoryIds.filter(x => result.map(e=>e._id.toString()).indexOf(x) === -1);
        return Promise.reject(new Error(`Invalid Subcategory for : ${difference}`));
      }
    }))
    .custom((val,{req})=> 
    SubCategoryModel.find({category: req.body.category}).then((subcategories)=>{
    const subCategoriesIdsInDB =[];
    subcategories.forEach((subcategory)=>{
      subCategoriesIdsInDB.push(subcategory._id.toString());
    });
    if(!val.every((v)=>subCategoriesIdsInDB.includes(v))){
      return Promise.reject(new Error(`subcategories not belong to category`));
    }
    }))
    ,
    check('brand')
    .optional()
    .isMongoId().withMessage('Invalid ID formate'),
    check('ratingsAverage')
    .optional()
    .isNumeric().withMessage('ratingsAverage must be a number')
    ,validatorMiddleware,];

exports.updateProductValidator=[check('id').isMongoId().withMessage('invalid product id format'),
body("title").custom((val,{req})=>{
  req.body.slug = slugify(val);
  return true;

}),validatorMiddleware,];    

exports.deleteProductValidator=[check('id').isMongoId().withMessage('invalid product id format'),validatorMiddleware,];    
