const Etage_etablissement = require("../../models").Etage_etablissement;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getEtage_etablissementValidator=[
    check('id').notEmpty().withMessage('Invalid Etage_etablissement id format')
               .custom((Id) =>  
               Etage_etablissement.findOne({where:{id:Id}}).then((etage_etablissement) => {
                if (!etage_etablissement) {
                return Promise.reject(
                    new Error(`No Etage_etablissement for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createEtage_etablissementValidator=[
    check('nom_etage_etablissement').notEmpty().withMessage('nom_bloc_etablissment required').isString().withMessage('nom_bloc_etablissment must be String'),
    check('BlocEtablissementId').notEmpty().withMessage('BlocEtablissementId required').isNumeric().withMessage('BlocEtablissementId must be Number'),

    validatorMiddleware,
];

exports.updateEtage_etablissementValidator=[
    check('id').notEmpty().withMessage('Etage_etablissement id required')
               .custom((Id) =>  
               Etage_etablissement.findOne({where:{id:Id}}).then((etage_etablissement) => {
                if (!etage_etablissement) {
                return Promise.reject(
                    new Error(`No Etage_etablissement for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteEtage_etablissementValidator=[
    check('id').notEmpty().withMessage('Etage_etablissement id required')
               .custom((Id) =>  
               Etage_etablissement.findOne({where:{id:Id}}).then((etage_etablissement) => {
                if (!etage_etablissement) {
                return Promise.reject(
                    new Error(`No Etage_etablissement for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];