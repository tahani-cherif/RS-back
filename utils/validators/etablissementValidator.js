const Etablissement = require("../../models").Etablissement;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getEtablissementValidator=[
    check('id').notEmpty().withMessage('Invalid Etablissement id format')
               .custom((Id) =>  
               Etablissement.findOne({where:{id:Id}}).then((etablissement) => {
                if (!etablissement) {
                return Promise.reject(
                    new Error(`No Etablissement for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createEtablissementValidator=[
    check('gouvernorat').notEmpty().withMessage('gouvernorat required').isString().withMessage('gouvernorat must be String'),
    check('delegation').notEmpty().withMessage('delegation required').isString().withMessage('delegation must be String'),
    check('localite').notEmpty().withMessage('localite required').isString().withMessage('localite must be String'),
    check('code_postal').notEmpty().withMessage('code_postal required').isNumeric().withMessage('code_postal must be Number'),
    check('nom_etablissement').notEmpty().withMessage('nom_etablissement required').isString().withMessage('nom_etablissement must be String'),
    check('niveau_etablissement').notEmpty().withMessage('niveau_etablissement required').isString().withMessage('niveau_etablissement must be String'),
    check('type_etablissement').notEmpty().withMessage('type_etablissement required').isString().withMessage('type_etablissement must be String'),
    check('nbr_personnes').notEmpty().withMessage('nbr_personnes required').isNumeric().withMessage('nbr_personnes must be Number'),
    check('longitude').notEmpty().withMessage('longitude required').isFloat().withMessage('invalid longitude'),
    check('latitude').notEmpty().withMessage('latitude required').isFloat().withMessage('invalid latitude'),

    check('quantite_dechets_plastique').notEmpty().withMessage('quantite_dechets_plastique required').isNumeric().withMessage('quantite_dechets_plastique must be Number'),
    check('quantite_dechets_composte').notEmpty().withMessage('quantite_dechets_composte required').isNumeric().withMessage('quantite_dechets_composte must be Number'),
    check('quantite_dechets_papier').notEmpty().withMessage('quantite_dechets_papier required').isNumeric().withMessage('quantite_dechets_papier must be Number'),
    check('quantite_dechets_canette').notEmpty().withMessage('quantite_dechets_canette required').isNumeric().withMessage('quantite_dechets_canette must be Number'),

    check('quantite_plastique_mensuel').notEmpty().withMessage('quantite_plastique_mensuel required').isNumeric().withMessage('quantite_plastique_mensuel must be Number'),
    check('quantite_composte_mensuel').notEmpty().withMessage('quantite_composte_mensuel required').isNumeric().withMessage('quantite_composte_mensuel must be Number'),
    check('quantite_papier_mensuel').notEmpty().withMessage('quantite_papier_mensuel required').isNumeric().withMessage('quantite_papier_mensuel must be Number'),
    check('quantite_canette_mensuel').notEmpty().withMessage('quantite_canette_mensuel required').isNumeric().withMessage('quantite_canette_mensuel must be Number'),
    validatorMiddleware,
];

exports.updateEtablissementValidator=[
    check('id').notEmpty().withMessage('Etablissement id required')
               .custom((Id) =>  
               Etablissement.findOne({where:{id:Id}}).then((etablissement) => {
                if (!etablissement) {
                return Promise.reject(
                    new Error(`No Etablissement for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteEtablissementValidator=[
    check('id').notEmpty().withMessage('Etablissement id required')
               .custom((Id) =>  
               Etablissement.findOne({where:{id:Id}}).then((etablissement) => {
                if (!etablissement) {
                return Promise.reject(
                    new Error(`No Etablissement for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];