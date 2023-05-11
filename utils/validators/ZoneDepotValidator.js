const Zone_depot = require("../../models").Zone_depot;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getZone_depotValidator=[
    check('id').notEmpty().withMessage('Invalid Zone_depot id format')
               .custom((Id) =>  
               Zone_depot.findOne({where:{id:Id}}).then((zone_depot) => {
                if (!zone_depot) {
                return Promise.reject(
                    new Error(`No Zone_depot for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createZone_depotValidator=[
    check('adresse').notEmpty().withMessage('adresse required'),
    check('longitude').notEmpty().withMessage('longitude required').isFloat().withMessage('invalid longitude'),
    check('latitude').notEmpty().withMessage('latitude required').isFloat().withMessage('invalid latitude'),
    check('quantite_depot_maximale').isFloat().withMessage('quantite_depot_maximale must be Numeric').notEmpty().withMessage('quantite_depot_maximale required'),
    check('quantite_depot_actuelle_plastique').isFloat().notEmpty().withMessage('quantite_depot_actuelle_plastique required'),
    check('quantite_depot_actuelle_papier').isFloat().notEmpty().withMessage('quantite_depot_actuelle_papier required'),
    check('quantite_depot_actuelle_composte').isFloat().notEmpty().withMessage('quantite_depot_actuelle_composte required'),
    check('quantite_depot_actuelle_canette').isFloat().notEmpty().withMessage('quantite_depot_actuelle_canette required'),
    validatorMiddleware,
];

exports.updateZone_depotValidator=[
    check('id').notEmpty().withMessage('Invalid Zone_depot id format')
               .custom((Id) =>  
               Zone_depot.findOne({where:{id:Id}}).then((zone_depot) => {
                if (!zone_depot) {
                return Promise.reject(
                    new Error(`No Zone_depot for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteZone_depotValidator=[
    check('id').notEmpty().withMessage('Invalid Zone_depot id format')
               .custom((Id) =>  
               Zone_depot.findOne({where:{id:Id}}).then((zone_depot) => {
                if (!zone_depot) {
                return Promise.reject(
                    new Error(`No Zone_depot for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];