const  express = require('express')

const { createPlanning,deletePlanning,getPlanning,getPlannings,updatePlanning } = require('../services/planningService');

const router = express.Router()

router.route('/').get(getPlannings).post(createPlanning)
router.route('/:id').get(getPlanning).put(updatePlanning).delete(deletePlanning)
module.exports=router;