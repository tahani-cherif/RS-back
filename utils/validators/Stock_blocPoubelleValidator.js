const Stock_blocPoubelle = require("../../models").Stock_blocPoubelle;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getStock_blocPoubelleValidator=[
    check('id').notEmpty().withMessage('Invalid Stock_blocPoubelle id format')
               .custom((Id) =>  
               Stock_blocPoubelle.findOne({where:{id:Id}}).then((stock_blocPoubelle) => {
                if (!stock_blocPoubelle) {
                return Promise.reject(
                    new Error(`No Stock_blocPoubelle for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createStock_blocPoubelleValidator=[
    check('reference').notEmpty().withMessage('reference required'),
    check('isAffect').isBoolean().withMessage('isAffect must be true or false'),
   
    validatorMiddleware,
];

exports.updateStock_blocPoubelleValidator=[
    check('id').notEmpty().withMessage('Invalid Stock_blocPoubelle id format')
               .custom((Id) =>  
               Stock_blocPoubelle.findOne({where:{id:Id}}).then((stock_blocPoubelle) => {
                if (!stock_blocPoubelle) {
                return Promise.reject(
                    new Error(`No Stock_blocPoubelle for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteStock_blocPoubelleValidator=[
    check('id').notEmpty().withMessage('Invalid Stock_blocPoubelle id format')
               .custom((Id) =>  
               Stock_blocPoubelle.findOne({where:{id:Id}}).then((stock_blocPoubelle) => {
                if (!stock_blocPoubelle) {
                return Promise.reject(
                    new Error(`No Stock_blocPoubelle for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];