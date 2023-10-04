const express=require('express')
const authService = require('../services/authService');

const {getZone_travailValidator,
      createZone_travailValidator,
      updateZone_travailValidator,
      deleteZone_travailValidator
       }=require('../utils/validators/zone-travailValiator');


const {getZonetravail,
       createZonetravail,
        updateZonetravail,
        deleteZonetravail,
        getZonetravails,createZonetravailWithcp,
    }=require('../services/zone-travailService');

const router=express.Router();
router.route('/withcodepostal').post(createZonetravailWithcp)

router.route('/').get(getZonetravails)
                 .post(authService.protect,createZone_travailValidator,createZonetravail);

router.route('/:id').get(getZone_travailValidator,getZonetravail)
                    .put(updateZone_travailValidator,updateZonetravail)
                    .delete(deleteZone_travailValidator,deleteZonetravail);
module.exports = router;