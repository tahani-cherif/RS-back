const Zone_travail = require("../../models").Zone_travail;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getZone_travailValidator=[
    check('id').notEmpty().withMessage('Invalid Zone_travail id format')
               .custom((Id) =>  
               Zone_travail.findOne({where:{id:Id}}).then((zone_travail) => {
                if (!zone_travail) {
                return Promise.reject(
                    new Error(`No Zone_travail for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createZone_travailValidator=[
    check('region').notEmpty().withMessage('region required'),
    check('code_postal').notEmpty().withMessage('code_postal required'),
    check('quantite_total_collecte_plastique').notEmpty().withMessage('quantite_total_collecte_plastique required')
                                              .isNumeric().withMessage('quantite_total_collecte_plastique must be ndouble'),
    check('quantite_total_collecte_composte').notEmpty().withMessage('quantite_total_collecte_composte required')
                                             .isNumeric().withMessage('quantite_total_collecte_composte must be ndouble'),
    check('quantite_total_collecte_papier').notEmpty().withMessage('quantite_total_collecte_papier required')
                                           .isNumeric().withMessage('quantite_total_collecte_papier must be ndouble'),
    check('quantite_total_collecte_canette').notEmpty().withMessage('quantite_total_collecte_canette required')
                                           .isNumeric().withMessage('quantite_total_collecte_canette must be ndouble'),
    validatorMiddleware,
];

exports.updateZone_travailValidator=[
    check('id').notEmpty().withMessage('Invalid Zone_travail id format')
               .custom((Id) =>  
               Zone_travail.findOne({where:{id:Id}}).then((zone_travail) => {
                if (!zone_travail) {
                return Promise.reject(
                    new Error(`No Zone_travail for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteZone_travailValidator=[
    check('id').notEmpty().withMessage('Invalid Zone_travail id format')
               .custom((Id) =>  
               Zone_travail.findOne({where:{id:Id}}).then((zone_travail) => {
                if (!zone_travail) {
                return Promise.reject(
                    new Error(`No Zone_travail for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];