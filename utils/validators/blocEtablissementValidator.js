const { check, body } = require("express-validator");
const slugify =require('slugify');
const validatorMiddleware = require("../../middlewares/ValidatoMiddleware");
const Bloc_etablissement = require("../../models").Bloc_etablissement;

exports.createBloc_etablissementValidator=[
    check('nom_bloc_etablissment')
   
    .notEmpty().withMessage('nom etablissment required')
    

    ,validatorMiddleware];

exports.updateBloc_etablissementValidator=[check('id').isMongoId().withMessage('invalid Bloc_etablissement id format'),

body("name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;

}),validatorMiddleware,];    

exports.deleteBloc_etablissementValidator=[check('id').isMongoId().withMessage('invalid Bloc_etablissement id format'),validatorMiddleware,];    
