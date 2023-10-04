const express=require('express')



const {createCodePostal,deleteCodePostal,getCodePostal,getCodePostals,updateCodePostal,getCodePostalsLibre,getCodePostalsByZoneTravail
    }=require('../services/codePostalService');

const router=express.Router();
router.route('/byzonetravail/:id').get(getCodePostalsByZoneTravail)

router.route('/libre').get(getCodePostalsLibre)
router.route('/').get(getCodePostals)
                 .post(createCodePostal);

router.route('/:id').get(getCodePostal)
                    .put(updateCodePostal)
                    .delete(deleteCodePostal);
module.exports = router;