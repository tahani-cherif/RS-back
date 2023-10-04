const express=require('express')



const {createRevenu,deleteRevenu,getRevenu,getRevenus,updateRevenu
    }=require('../services/revenuService');

const router=express.Router();

router.route('/').get(getRevenus)
                 .post(createRevenu);

router.route('/:id').get(getRevenu)
                    .put(updateRevenu)
                    .delete(deleteRevenu);
module.exports = router;