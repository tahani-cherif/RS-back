const express=require('express')
const {createCamionValidator,deleteCamionValidator,getCamionValidator,updateCamionValidator
       }=require('../utils/validators/camionValidator');


const {createCamion,deleteCamion,getCamion,updateCamion,getCamions
    }=require('../services/camionService');

const router=express.Router();

router.route('/').get(getCamions)
                 .post(createCamionValidator,createCamion);

router.route('/:id').get(getCamionValidator,getCamion)
                    .put(updateCamionValidator,updateCamion)
                    .delete(deleteCamionValidator,deleteCamion);
module.exports = router;