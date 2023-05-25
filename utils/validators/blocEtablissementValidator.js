const Bloc_etablissement = require("../../models").Bloc_etablissement;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getBloc_etablissementValidator=[
    check('id').notEmpty().withMessage('Invalid Bloc_etablissement id format')
               .custom((Id) =>  
               Bloc_etablissement.findOne({where:{id:Id}}).then((bloc_etablissement) => {
                if (!bloc_etablissement) {
                return Promise.reject(
                    new Error(`No Bloc_etablissement for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createBloc_etablissementValidator=[
    check('nom_bloc_etablissment').notEmpty().withMessage('nom_bloc_etablissment required').isString().withMessage('nom_bloc_etablissment must be String'),
    check('EtablissementId').notEmpty().withMessage('EtablissementId required').isNumeric().withMessage('EtablissementId must be Number'),

    validatorMiddleware,
];

exports.updateBloc_etablissementValidator=[
    check('id').notEmpty().withMessage('Bloc_etablissement id required')
               .custom((Id) =>  
               Bloc_etablissement.findOne({where:{id:Id}}).then((bloc_etablissement) => {
                if (!bloc_etablissement) {
                return Promise.reject(
                    new Error(`No Bloc_etablissement for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteBloc_etablissementValidator=[
    check('id').notEmpty().withMessage('Bloc_etablissement id required')
               .custom((Id) =>  
               Bloc_etablissement.findOne({where:{id:Id}}).then((bloc_etablissement) => {
                if (!bloc_etablissement) {
                return Promise.reject(
                    new Error(`No Bloc_etablissement for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];