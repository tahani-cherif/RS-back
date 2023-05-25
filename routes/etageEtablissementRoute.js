const  express = require('express')

const { createEtage_etablissement,deleteEtage_etablissement,getEtage_etablissement,getEtage_etablissements,updateEtage_etablissement } = require('../services/etageEtablissementService');
const { createEtage_etablissementValidator,deleteEtage_etablissementValidator,getEtage_etablissementValidator,updateEtage_etablissementValidator } = require('../utils/validators/etageValidator');

const router = express.Router()

router.route('/').get(getEtage_etablissements).post(createEtage_etablissementValidator,createEtage_etablissement)
router.route('/:id').get(getEtage_etablissementValidator,getEtage_etablissement).put(updateEtage_etablissementValidator,updateEtage_etablissement).delete(deleteEtage_etablissementValidator,deleteEtage_etablissement)
module.exports=router;