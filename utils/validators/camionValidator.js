const Camion = require("../../models").Camion;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getCamionValidator=[
    check('id').notEmpty().withMessage('Invalid Camion id format')
               .custom((Id) =>  
               Camion.findOne({where:{id:Id}}).then((camion) => {
                if (!camion) {
                return Promise.reject(
                    new Error(`No Camion for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createCamionValidator=[
    check('matricule').notEmpty().withMessage('matricule required').isString().withMessage('matricule must be String'),
    check('heure_entree').optional(),
    check('heure_sortie').optional(),
    check('longitude').notEmpty().withMessage('longitude required').isFloat().withMessage('invalid longitude'),
    check('latitude').notEmpty().withMessage('latitude required').isFloat().withMessage('invalid latitude'),
    check('volume_maximale_camion').notEmpty().withMessage('volume_maximale_camion required').isNumeric().withMessage('volume_maximale_camion must be String'),
    check('volume_actuelle_plastique').notEmpty().withMessage('volume_actuelle_plastique required').isNumeric().withMessage('invalid volume_actuelle_plastique'),
    check('volume_actuelle_papier').notEmpty().withMessage('volume_actuelle_papier required').isNumeric().withMessage('volume_actuelle_papier must be String'),
    check('volume_actuelle_composte').notEmpty().withMessage('volume_actuelle_composte required').isNumeric().withMessage('invalid volume_actuelle_composte'),
    check('volume_actuelle_canette').notEmpty().withMessage('volume_actuelle_canette required').isNumeric().withMessage('invalid volume_actuelle_canette'),
    validatorMiddleware,
];

exports.updateCamionValidator=[
    check('id').notEmpty().withMessage('Camion id required')
               .custom((Id) =>  
               Camion.findOne({where:{id:Id}}).then((camion) => {
                if (!camion) {
                return Promise.reject(
                    new Error(`No Camion for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteCamionValidator=[
    check('id').notEmpty().withMessage('Camion id required')
               .custom((Id) =>  
               Camion.findOne({where:{id:Id}}).then((camion) => {
                if (!camion) {
                return Promise.reject(
                    new Error(`No Camion for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];