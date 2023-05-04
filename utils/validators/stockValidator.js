const { check, body } = require("express-validator");
const slugify =require('slugify');
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");
const Stock = require("../../models").Stock;

exports.createStockValidator=[
    check('type_poubelle')
    .isIn(['plastique','canette','papier','composte'])
    .withMessage('Type poubelle must be plastique | canette | papier | composte')
    .notEmpty().withMessage('Type poubelle required')
    .custom(async (value) => {

        const user = await Stock.findOne({where: {type_poubelle: value} });
        if (user) {
            throw new Error(`${value} already exists`);
        }
      }),
  
    check('quantite')
    .isInt({ min: 0 }).withMessage('quantite must be numeric and positive')
    
    ,validatorMiddleware];

exports.updateStockValidator=[check('id').isMongoId().withMessage('invalid Stock id format'),

body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;

}),validatorMiddleware,];    

exports.deleteStockValidator=[check('id').isMongoId().withMessage('invalid Stock id format'),validatorMiddleware,];    
