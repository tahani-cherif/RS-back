const express=require('express')



const {createVider_poubelle,
    deleteVider_poubelle,getDataFromLastMonth,getVider_poubelle,getVider_poubelles,updateVider_poubelle,createVider_poubelleWithDetails
    }=require('../services/viderPoubelleService');

const router=express.Router();
router.route('/withdetails').post(createVider_poubelleWithDetails)

router.route('/').get(getVider_poubelles)
                 .post(createVider_poubelle);
router.route('/getdatafromlastMonth').get(getDataFromLastMonth);

router.route('/:id').get(getVider_poubelle)
                    .put(updateVider_poubelle)
                    .delete(deleteVider_poubelle);
module.exports = router;