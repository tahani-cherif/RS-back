const Dechet = require("../../models").Dechet;
const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/ValidatoMiddleware');

exports.getDechetValidator=[
    check('id').notEmpty().withMessage('Invalid Dechet id format')
               .custom((Id) =>  
               Dechet.findOne({where:{id:Id}}).then((dechet) => {
                if (!dechet) {
                return Promise.reject(
                    new Error(`No Dechet for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.createDechetValidator=[
    check('type_dechet').notEmpty().withMessage('type_dechet required').isIn(["plastique","canette","papier","composte"]).withMessage('type_dechet must be plastique | canette | papier | composte '),
    check('prix_unitaire').notEmpty().withMessage('prix_unitaire required').isNumeric().withMessage('invalid prix_unitaire'),
    check('prixApresPromotion')
    .optional()
    .isNumeric().withMessage('prixApresPromotion must be a number')
    .custom((value,{req})=>{
        if(req.body.prix_unitaire <= value){
          throw new Error('prixApresPromotion must be lower than prix_unitaire')
        }
        return true;
    }),
    validatorMiddleware,
];

exports.updateDechetValidator=[
    check('id').notEmpty().withMessage('Invalid Dechet id format')
               .custom((Id) =>  
               Dechet.findOne({where:{id:Id}}).then((dechet) => {
                if (!dechet) {
                return Promise.reject(
                    new Error(`No Dechet for this id: ${Id}`)
                );
                }
              })),
    validatorMiddleware,
];

exports.deleteDechetValidator=[
    check('id').notEmpty().withMessage('Invalid Dechet id format')
               .custom((Id) =>  
               Dechet.findOne({where:{id:Id}}).then((dechet) => {
                if (!dechet) {
                return Promise.reject(
                    new Error(`No Dechet for this id: ${Id}`)
                );
                }
            })),
    validatorMiddleware,
];