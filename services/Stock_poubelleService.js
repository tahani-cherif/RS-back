const Etablissement = require("../models").Etablissement;
const Bloc_etablissement = require("../models").Bloc_etablissement;
const Etage_etablissement = require("../models").Etage_etablissement;
const Stock_blocPoubelle = require("../models").Stock_blocPoubelle;
const Stock_poubelle = require("../models").Stock_poubelle;

const Planning = require("../models").Planning;

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all stock_poubelle
// @route   GET api/Stock_poubelle/
// @access  Private
exports.getStock_poubelles=asyncHandler(async(req,res) => {
    const stock_poubelle = await Stock_poubelle.findAll();
    res.status(200).json({results:stock_poubelle.length,data:stock_poubelle})
  });

// @desc    Get specific Stock_poubelle by id
// @route   GET api/Stock_poubelle/:id
// @access  Private
exports.getStock_poubelle = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const stock_poubelle = await Stock_poubelle.findOne({where:{id:id}});
  if(!stock_poubelle)
  {
    return   next(new ApiError(`Stock_poubelle not found for this id ${id}`,404)); 
}
  res.status(200).json({data: stock_poubelle});
})


// @desc    Create a new Stock_poubelle
// @route   POST api/Stock_poubelle/
// @access  Private
exports.createStock_poubelle=asyncHandler(async(req,res)=>{
    const body=req.body
    const stock_poubelle=await Stock_poubelle.create(body)
     res.status(201).json({data:stock_poubelle})
   
});

// @desc    update specified Stock_poubelle
// @route   PUT api/Stock_poubelle/:id
// @access  Private
exports.updateStock_poubelle =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const stockPoubelle = await Stock_poubelle.findOne({
    where:{id:id},include: [
        {
          model: Stock_blocPoubelle,
          include: [{ 
            model: Etage_etablissement,
            include:[{model:Bloc_etablissement,
                include:[{model:Etablissement}]}]
         }]
        }
      ]
    
});
  var document={};
if(req.body.etat){
  document ={
      
    reference:req.body.reference,
    type_poubelle:req.body.type_poubelle,
    isAffect:req.body.isAffect,
    StockBlocPoubelleId:req.body.StockBlocPoubelleId,
    nom_poubelle:req.body.nom_poubelle,
    capacite:req.body.capacite,
    quantite_actuel:stockPoubelle.capacite*(req.body.etat/100),
    etat:req.body.etat,


    
}
} else if(req.body.quantite_actuel){
  document ={
      
    reference:req.body.reference,
    type_poubelle:req.body.type_poubelle,
    isAffect:req.body.isAffect,
    StockBlocPoubelleId:req.body.StockBlocPoubelleId,
    nom_poubelle:req.body.nom_poubelle,
    capacite:req.body.capacite,
    quantite_actuel: req.body.quantite_actuel,
    etat: stockPoubelle.capacite ===0?0: (100*req.body.quantite_actuel)/stockPoubelle.capacite,


    
}
}
if(req.body.etat>80){
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(15, 0, 0, 0);
  
  const endTime = new Date(tomorrow.getTime());
  endTime.setHours(endTime.getHours() + 1);
  await Planning.create({Subject:"First depot",	StartTime:tomorrow,	EndTime:endTime,	validation:false,	statut:"en cours",type_poubelle:stockPoubelle.type_poubelle,	EtablissementId:stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.id,	CamionId:stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.CamionId
  })
}
    await Stock_poubelle.update(document,{where:{id:id}})
    const newstockPoubelle = await Stock_poubelle.findByPk(id);
    res.status(200).json({data:newstockPoubelle});  
})


// @desc    delete specified stock_poubelle
// @route   DELETE api/Stock_poubelle/:id
// @access  Private
exports.deleteStock_poubelle=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Stock_poubelle.destroy({where:{id:id}})
  res.status(204).send();  
});