const express=require('express')
const {createDechetValidator,deleteDechetValidator,getDechetValidator,updateDechetValidator
       }=require('../utils/validators/DechetValidator');


const {createDechet,deleteDechet,getDechet,updateDechet,getDechets
    }=require('../services/DechetSercvice');

const router=express.Router();

router.route('/').get(getDechets)
                 .post(createDechetValidator,createDechet);

router.route('/:id').get(getDechetValidator,getDechet)
                    .put(updateDechetValidator,updateDechet)
                    .delete(deleteDechetValidator,deleteDechet);
module.exports = router;