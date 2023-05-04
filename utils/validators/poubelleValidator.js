const { check, body } = require("express-validator");
const slugify =require('slugify');
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");
const Poubelle = require("../../models").Poubelle;

exports.createPoubelleValidator=[
    check('nom_poubelle')
   
    .notEmpty().withMessage('nom etablissment required')
    
  
    ,check('type_Poubelle')
    .notEmpty().withMessage('type Poubelle required')

    ,validatorMiddleware];

exports.updatePoubelleValidator=[check('id').isMongoId().withMessage('invalid Poubelle id format'),

body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;

}),validatorMiddleware,];    

exports.deletePoubelleValidator=[check('id').isMongoId().withMessage('invalid Poubelle id format'),validatorMiddleware,];    
