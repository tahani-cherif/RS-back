const express=require('express')
const {createStock_blocPoubelleValidator,deleteStock_blocPoubelleValidator,getStock_blocPoubelleValidator,updateStock_blocPoubelleValidator
       }=require('../utils/validators/Stock_blocPoubelleValidator');


const {createStock_blocPoubelle,getStockBlocPoubellesPasAffecter,getStockBlocPoubelles,deleteStock_blocPoubelle,updateStock_blocPoubelle,getStock_blocPoubelle,getStock_blocPoubelles,getStockBlocPoubellesByEtage,updateStockBlocPoubelle
    }=require('../services/stock_blocPoubelleService');

const router=express.Router();
router.route('/byetage/:id').get(getStockBlocPoubellesByEtage)
router.route('/affecter').get(getStockBlocPoubelles)
router.route('/pasaffecter').get(getStockBlocPoubellesPasAffecter)
router.route('/addtoetage/:id').put(updateStock_blocPoubelleValidator,updateStock_blocPoubelle)
router.route('/').get(getStock_blocPoubelles)
                 .post(createStock_blocPoubelleValidator,createStock_blocPoubelle);

router.route('/:id').get(getStock_blocPoubelleValidator,getStock_blocPoubelle)
                    .put(updateStock_blocPoubelleValidator,updateStockBlocPoubelle)
                    .delete(deleteStock_blocPoubelleValidator,deleteStock_blocPoubelle);
module.exports = router;