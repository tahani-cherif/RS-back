const  express = require('express')

const { createBloc_etablissement,deleteBloc_etablissement,getBloc_etablissement,getBloc_etablissements,updateBloc_etablissement,createFilterObj } = require('../services/blocEtablissementService');
const { createBloc_etablissementValidator,deleteBloc_etablissementValidator,getBloc_etablissementValidator,updateBloc_etablissementValidator } = require('../utils/validators/blocEtablissementValidator');

const router=express.Router({mergeParams: true});

router.route('/').get(createFilterObj,getBloc_etablissements).post(createBloc_etablissementValidator,createBloc_etablissement)
router.route('/:id').get(getBloc_etablissementValidator,getBloc_etablissement).put(updateBloc_etablissementValidator,updateBloc_etablissement).delete(deleteBloc_etablissementValidator,deleteBloc_etablissement)
module.exports=router;