const Stock_poubelle = require("../../models").Stock_poubelle;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getStock_poubelleValidator=[
    check('id').notEmpty().withMessage('Invalid Stock_poubelle id format')
               .custom((Id) =>  
               Stock_poubelle.findOne({where:{id:Id}}).then((stock_poubelle) => {
                if (!stock_poubelle) {
                return Promise.reject(
                    new Error(`No Stock_poubelle for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createStock_poubelleValidator=[
    check('nom_poubelle').optional(),
    check('reference').notEmpty().withMessage('reference required'),
    check('type_poubelle').notEmpty().withMessage('reference required').isIn(['plastique','canette','papier','composte']).withMessage('type_poubelle must be plastique | canette | papier | composte '),
    check('isAffect').isBoolean().withMessage('isAffect must be true or false'),
   
    validatorMiddleware,
];

exports.updateStock_poubelleValidator=[
    check('id').notEmpty().withMessage('Invalid Stock_poubelle id format')
               .custom((Id) =>  
               Stock_poubelle.findOne({where:{id:Id}}).then((stock_poubelle) => {
                if (!stock_poubelle) {
                return Promise.reject(
                    new Error(`No Stock_poubelle for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteStock_poubelleValidator=[
    check('id').notEmpty().withMessage('Invalid Stock_poubelle id format')
               .custom((Id) =>  
               Stock_poubelle.findOne({where:{id:Id}}).then((stock_poubelle) => {
                if (!stock_poubelle) {
                return Promise.reject(
                    new Error(`No Stock_poubelle for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];