const Etablissement = require("../models").Etablissement;
const Bloc_etablissement = require("../models").Bloc_etablissement;
const Etage_etablissement = require("../models").Etage_etablissement;
const Stock_blocPoubelle = require("../models").Stock_blocPoubelle;
const Stock_poubelle = require("../models").Stock_poubelle;

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')

exports.findPoubelleByEtab = asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 
    var test =[];
    var blocpoubelle =[];
    var poubelle =[];
    const etablissement = await Etablissement.findOne({
        where:{id:id},include: [
            {
              model: Bloc_etablissement,
              include: [{ 
                model: Etage_etablissement,
                include:[{model:Stock_blocPoubelle,
                    include:[{model:Stock_poubelle}]}]
             }]
            }
          ]
        
    }
    
        
);
for (const etab of etablissement.Bloc_etablissements) {

    test.push(etab.Etage_etablissements);
}

const etageArray = test.flat();

for (const etage of etageArray) {
  blocpoubelle.push(etage.Stock_blocPoubelles);
}
const blocpoubelleArray = blocpoubelle.flat();
for (const blocPoubelle of blocpoubelleArray) {
  poubelle.push(blocPoubelle.Stock_poubelles);
}

const poubelleArray = poubelle.flat();





    res.status(200).json({data: poubelleArray});
  })

  exports.etablissementDetails = asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 

    const etablissement = await Etablissement.findOne({
        where:{id:id},include: [
            {
              model: Bloc_etablissement,
              include: [{ 
                model: Etage_etablissement,
                include:[{model:Stock_blocPoubelle,
                    include:[{model:Stock_poubelle}]}]
             }]
            }
          ]
        
    }
    
        
);

    res.status(200).json({data: etablissement});
  })
  exports.statistiquegenrale = asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 
    var test =[];
    var blocpoubelle =[];
    var poubelle =[];
    const etablissement = await Etablissement.findOne({
        where:{id:id},include: [
            {
              model: Bloc_etablissement,
              include: [{ 
                model: Etage_etablissement,
                include:[{model:Stock_blocPoubelle,
                    include:[{model:Stock_poubelle}]}]
             }]
            }
          ]
        
    }
    
        
);
for (const etab of etablissement.Bloc_etablissements) {

    test.push(etab.Etage_etablissements);
}

const etageArray = test.flat();

for (const etage of etageArray) {
  blocpoubelle.push(etage.Stock_blocPoubelles);
}
const blocpoubelleArray = blocpoubelle.flat();
for (const blocPoubelle of blocpoubelleArray) {
  poubelle.push(blocPoubelle.Stock_poubelles);
}

const poubelleArray = poubelle.flat();
var quantite_actuel_plastique = 0;
var quantite_actuel_canette = 0;
var quantite_actuel_papier = 0;
var quantite_actuel_composte = 0;
for (const poubelle of poubelleArray) {
  if(poubelle.type_poubelle==="plastique"){
    quantite_actuel_plastique=  quantite_actuel_plastique+poubelle.quantite_actuel;
  }else if(poubelle.type_poubelle==="canette"){
    quantite_actuel_canette=  quantite_actuel_canette+poubelle.quantite_actuel;
}else if(poubelle.type_poubelle==="papier"){
  quantite_actuel_papier=  quantite_actuel_papier+poubelle.quantite_actuel;
}else{
  quantite_actuel_composte=  quantite_actuel_composte+poubelle.quantite_actuel;

}

}


    res.status(200).json({data: {
      nbr_bloc_etablissements:etablissement.Bloc_etablissements.length,
      nbr_etage:etageArray.length,
      nbr_block_poubelle:blocpoubelleArray.length,
      nbr_poubelle:poubelleArray.length,
      quantite_actuel_plastique:quantite_actuel_plastique,
      quantite_actuel_canette:quantite_actuel_canette,
      quantite_actuel_papier:quantite_actuel_papier,
      quantite_actuel_composte:quantite_actuel_composte


    }});
  })


  