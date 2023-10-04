const  express = require('express')

const { createEtablissement,deleteEtablissement,getEtablissement,getEtablissements,updateEtablissement,createEtablissementwithcp,getEtablissementsWithoutDetails,getEtablissementsWithoutzt,getEtablissementsParcamion,resizeImage,uploadUserImage ,findPoubelleByEtab,etablissementDetailsById,getEtablissementsMap} = require('../services/etablissementService');
const { createEtablissementValidator,deleteEtablissementValidator,getEtablissementValidator,updateEtablissementValidator } = require('../utils/validators/etablissementValidator');

const router = express.Router()
const blocEtablissement =require('./blocEtablissementRoute');
router.route('/avgbytype/:id').get(findPoubelleByEtab)
router.route('/details/:id').get(etablissementDetailsById)
router.route('/map/:id').get(getEtablissementsMap)


router.use('/:EtablissementId/blocEtablissement',blocEtablissement);
router.route('/withzonedetravail').post(uploadUserImage, resizeImage,createEtablissementwithcp)
router.route('/withoutdetails').get(getEtablissementsWithoutDetails)
router.route('/withoutzonedetravail').get(getEtablissementsWithoutzt)
router.route('/parcamion/:CamionId').get(getEtablissementsParcamion)



router.route('/').get(getEtablissements).post(uploadUserImage, resizeImage,createEtablissementValidator,createEtablissement)
router.route('/:id').get(getEtablissementValidator,getEtablissement).put(uploadUserImage, resizeImage,updateEtablissementValidator,updateEtablissement).delete(deleteEtablissementValidator,deleteEtablissement)
module.exports=router;