const  express = require('express')

const { addBloc_etablissement,deleteBloc_etablissement,getAllBloc_etablissements,getOneBloc_etablissement,updateBloc_etablissement } = require('../services/blocEtablissementServices');
const { createBloc_etablissementValidator } = require('../utils/validators/blocEtablissementValidator');

const router = express.Router()

router.route('/').get(getAllBloc_etablissements).post(createBloc_etablissementValidator,addBloc_etablissement)
router.route('/:id').get(getOneBloc_etablissement).put(updateBloc_etablissement).delete(deleteBloc_etablissement)
module.exports=router;