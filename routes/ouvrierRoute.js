const { findPoubelleByEtab,etablissementDetails,statistiquegenrale,viderPoubelle,getDataFromLastMonth} = require('../services/ouvrierService');
const  express = require('express')
const router = express.Router()
router.route('/findpoubelle/:id').get(findPoubelleByEtab);
router.route('/etablissementdetails/:id').get(etablissementDetails);
router.route('/statistiquegenrale/:id').get(statistiquegenrale);
router.route('/viderpoubelle/:id/:CamionId').put(viderPoubelle);
module.exports=router;