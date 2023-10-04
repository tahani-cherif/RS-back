const Vider_poubelle = require("../models").Vider_poubelle;
const Revenu = require("../models").Revenu;
const Dechet = require("../models").Dechet;

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const Sequelize = require('sequelize');
const { sequelize } = require("../models");
const Stock_poubelle = require("../models").Stock_poubelle;
const Camion = require("../models").Camion;

const Op = Sequelize.Op;

// @desc    Get all vider_poubelle
// @route   GET api/zonetravail/
// @access  Private
exports.getVider_poubelles=asyncHandler(async(req,res) => {
    const vider_poubelle = await Vider_poubelle.findAll();
    res.status(200).json({results:vider_poubelle.length,data:vider_poubelle})
  });

// @desc    Get specific Vider_poubelle by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getVider_poubelle = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const vider_poubelle = await Vider_poubelle.findOne({where:{id:id}});
  if(!vider_poubelle)
  {
    return   next(new ApiError(`Vider_poubelle not found for this id ${id}`,404)); 
}
  res.status(200).json({data: vider_poubelle});
})


// @desc    Create a new Vider_poubelle
// @route   POST api/zonetravail/
// @access  Private
exports.createVider_poubelle=asyncHandler(async(req,res)=>{
    const body=req.body
    const vider_poubelle=await Vider_poubelle.create(body)
     res.status(201).json({data:vider_poubelle})
   
});
exports.createVider_poubelleWithDetails=asyncHandler(async(req,res)=>{
  const body=req.body
  const vider_poubelle=await Vider_poubelle.create(body)
  const camion = await Camion.findByPk(body.CamionId);
  if (!camion) {
    return next(
      new ApiError(`No camion for this id ${id}`, 404)
    );
  }
  if(body.type_poubelle=="plastique"){
    const currentVolume = camion.volume_actuelle_plastique;
    const newVolume = currentVolume + body.quantite_depose;
    await camion.update({ volume_actuelle_plastique: newVolume });

  }
  else if(body.type_poubelle=="canette") {
    const currentVolume = camion.volume_actuelle_canette;
    const newVolume = currentVolume + body.quantite_depose;
    await camion.update({ volume_actuelle_canette: newVolume });

  }else if(body.type_poubelle=="papier") {
    const currentVolume = camion.volume_actuelle_papier;
    const newVolume = currentVolume + body.quantite_depose;
    await camion.update({ volume_actuelle_papier: newVolume });

  }else if(body.type_poubelle=="composte") {
    const currentVolume = camion.volume_actuelle_composte;
    const newVolume = currentVolume + body.quantite_depose;
    await camion.update({ volume_actuelle_composte: newVolume });

  }
  const poubelle = await Stock_poubelle.findByPk(body.StockPoubelleId);
  if (!poubelle) {
    return next(
      new ApiError(`No poubelle for this id ${id}`, 404)
    );
  }
  await poubelle.update({ etat: 0,quantite_actuel:0 });



   res.status(201).json({data:vider_poubelle})
 
});

// @desc    update specified Vider_poubelle
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateVider_poubelle =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const vider_poubelle = await Vider_poubelle.findByPk(id);
  if (!vider_poubelle) {
    return next(
      new ApiError(`No vider_poubelle for this id ${id}`, 404)
    );
  }
    await Vider_poubelle.update(req.body,{where:{id:id}})
    const updatedVider_poubelle = await User.findByPk(id);  
    res.status(200).json({data:updatedVider_poubelle});  
})


// @desc    delete specified vider_poubelle
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteVider_poubelle=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Vider_poubelle.destroy({where:{id:id}})
  res.status(204).send();  
});
exports.getDataFromLastMonth = asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 
    const currentDate = new Date();
    const start = Date.now();
    // Calculate the start and end dates of the last month
    const lastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const lastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const query = {
        where: {
            date_depot: {
            [Op.between]: [lastMonthStartDate, lastMonthEndDate]
          }
          
        },
        attributes: [
          "type_poubelle",
          'EtablissementId',
          [sequelize.fn("SUM", sequelize.col("quantite_depose")), "quantite_depose"],
        ],
        group:['type_poubelle','EtablissementId']
        
        
      };
    const viderPoubelle = await Vider_poubelle.findAll(query);
    const convertedData = viderPoubelle.reduce((result, item) => {
      const { EtablissementId, type_poubelle, quantite_depose } = item;
      
      if (!result[EtablissementId]) {
          result[EtablissementId] = {
              EtablissementId,
              quantite_plastique: 0,
              quantite_papier: 0,
              quantite_canette: 0,
              quantite_composte: 0,
          };
      }
      
      if (type_poubelle === "plastique") {
          result[EtablissementId].quantite_plastique += quantite_depose;
      } else if (type_poubelle === "papier") {
          result[EtablissementId].quantite_papier += quantite_depose;
      }else if (type_poubelle === "canette") {
        result[EtablissementId].quantite_canette += quantite_depose;
    }else if (type_poubelle === "composte") {
      result[EtablissementId].quantite_composte += quantite_depose;
  }
      
      return result;
  }, {});
  const dechet = await Dechet.findAll();
  var puplastique=0;
  var pucanette=0;

  var pupapier=0;

  var pucomposte=0;

  dechet.map(e => e.type_dechet==='plastique'? puplastique =e.prix_unitaire:e.type_dechet==='canette'? pucanette =e.prix_unitaire:e.type_dechet==='papier'? pupapier=e.prix_unitaire:e.type_dechet==='composte'?pucomposte=e.prix_unitaire:null);
  const output = Object.values(convertedData);
  for(let i=0; i<output.length; i++) {

    console.log(`${(puplastique*output[i].quantite_plastique)}+${(pucanette*output[i].quantite_canette)}+${(pupapier*output[i].quantite_papier)}+${(pucomposte*output[i].quantite_composte)}`)
   await Revenu.create({
    date:start,
    	quantite_plastique_menusel:output[i].quantite_plastique,
      quantite_papier_menusel:output[i].quantite_papier,
      	quantite_composte_menusel:output[i].quantite_composte,
        	quantite_canette_menusel:output[i].quantite_canette,
          prix_unitaire_plastique:puplastique,
          prix_unitaire_canette:pucanette,
          prix_unitaire_papier:pupapier,
          prix_unitaire_composte:pucomposte,
          	revenu_total:(puplastique*output[i].quantite_plastique)+(pucanette*output[i].quantite_canette)+(pupapier*output[i].quantite_papier)+(pucomposte*output[i].quantite_composte),	
            revenu_gestionnaire:(((puplastique*output[i].quantite_plastique)+(pucanette*output[i].quantite_canette)+(pupapier*output[i].quantite_papier)+(pucomposte*output[i].quantite_composte))*0.8).toFixed(3),
            revenu_responsable:(((puplastique*output[i].quantite_plastique)+(pucanette*output[i].quantite_canette)+(pupapier*output[i].quantite_papier)+(pucomposte*output[i].quantite_composte))*0.2).toFixed(3),
            EtablissementId	:output[i].EtablissementId

  })
  }
    res.status(200).json({data:output});
  })
