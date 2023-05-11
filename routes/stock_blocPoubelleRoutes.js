const express=require('express')
const {createStock_blocPoubelleValidator,deleteStock_blocPoubelleValidator,getStock_blocPoubelleValidator,updateStock_blocPoubelleValidator
       }=require('../utils/validators/Stock_blocPoubelleValidator');


const {createStock_blocPoubelle,deleteStock_blocPoubelle,updateStock_blocPoubelle,getStock_blocPoubelle,getStock_blocPoubelles
    }=require('../services/stock_blocPoubelleService');

const router=express.Router();

router.route('/').get(getStock_blocPoubelles)
                 .post(createStock_blocPoubelleValidator,createStock_blocPoubelle);

router.route('/:id').get(getStock_blocPoubelleValidator,getStock_blocPoubelle)
                    .put(updateStock_blocPoubelleValidator,updateStock_blocPoubelle)
                    .delete(deleteStock_blocPoubelleValidator,deleteStock_blocPoubelle);
module.exports = router;