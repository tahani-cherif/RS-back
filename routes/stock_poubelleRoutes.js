const express=require('express')
const {createStock_poubelleValidator,deleteStock_poubelleValidator,getStock_poubelleValidator,updateStock_poubelleValidator
       }=require('../utils/validators/Stock_poubelleValidator');


const {createStock_poubelle,deleteStock_poubelle,getStock_poubelle,updateStock_poubelle,getStock_poubelles
    }=require('../services/Stock_poubelleService');

const router=express.Router();

router.route('/').get(getStock_poubelles)
                 .post(createStock_poubelleValidator,createStock_poubelle);

router.route('/:id').get(getStock_poubelleValidator,getStock_poubelle)
                    .put(updateStock_poubelleValidator,updateStock_poubelle)
                    .delete(deleteStock_poubelleValidator,deleteStock_poubelle);
module.exports = router;