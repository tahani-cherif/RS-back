const { check, body } = require("express-validator");
const slugify =require('slugify');
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");
const Etablissement = require("../../models").Etablissement;

exports.createEtablissementValidator=[
    check('nom_etablissment')
   
    .notEmpty().withMessage('nom etablissment required')
    
  
    ,check('type_etablissement')
    .notEmpty().withMessage('type etablissement required')

    ,validatorMiddleware];

exports.updateEtablissementValidator=[check('id').isMongoId().withMessage('invalid Etablissement id format'),

body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;

}),validatorMiddleware,];    

exports.deleteEtablissementValidator=[check('id').isMongoId().withMessage('invalid Etablissement id format'),validatorMiddleware,];    
