const { findPoubelleByEtab,etablissementDetails,statistiquegenrale} = require('../services/responsableEtablissementService');
const  express = require('express')
const router = express.Router()
router.route('/findpoubelle/:id').get(findPoubelleByEtab);
router.route('/etablissementdetails/:id').get(etablissementDetails);
router.route('/statistiquegenrale/:id').get(statistiquegenrale);
module.exports=router;