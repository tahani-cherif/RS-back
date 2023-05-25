const  express = require('express')

const { createEtablissement,deleteEtablissement,getEtablissement,getEtablissements,updateEtablissement } = require('../services/etablissementService');
const { createEtablissementValidator,deleteEtablissementValidator,getEtablissementValidator,updateEtablissementValidator } = require('../utils/validators/etablissementValidator');

const router = express.Router()
const blocEtablissement =require('./blocEtablissementRoute');

router.use('/:EtablissementId/blocEtablissement',blocEtablissement);
router.route('/').get(getEtablissements).post(createEtablissementValidator,createEtablissement)
router.route('/:id').get(getEtablissementValidator,getEtablissement).put(updateEtablissementValidator,updateEtablissement).delete(deleteEtablissementValidator,deleteEtablissement)
module.exports=router;