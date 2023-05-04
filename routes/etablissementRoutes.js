const  express = require('express')

const { addEtablissement,deleteEtablissement,getAllEtablissements,getOneEtablissement,updateEtablissement } = require('../services/etablissementService');
const { createEtablissementValidator } = require('../utils/validators/etablissementValidator');

const router = express.Router()

router.route('/').get(getAllEtablissements).post(createEtablissementValidator,addEtablissement)
router.route('/:id').get(getOneEtablissement).put(updateEtablissement).delete(deleteEtablissement)
module.exports=router;