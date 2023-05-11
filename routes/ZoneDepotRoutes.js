const express=require('express')
const {createZone_depotValidator,deleteZone_depotValidator,getZone_depotValidator,updateZone_depotValidator
       }=require('../utils/validators/ZoneDepotValidator');


const {createZone_depot,deleteZone_depot,getZone_depot,updateZone_depot,getZone_depots
    }=require('../services/Zone_depotService');

const router=express.Router();

router.route('/').get(getZone_depots)
                 .post(createZone_depotValidator,createZone_depot);

router.route('/:id').get(getZone_depotValidator,getZone_depot)
                    .put(updateZone_depotValidator,updateZone_depot)
                    .delete(deleteZone_depotValidator,deleteZone_depot);
module.exports = router;