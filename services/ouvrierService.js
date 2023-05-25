const Etablissement = require("../models").Etablissement;
const Bloc_etablissement = require("../models").Bloc_etablissement;
const Etage_etablissement = require("../models").Etage_etablissement;
const Stock_blocPoubelle = require("../models").Stock_blocPoubelle;
const Stock_poubelle = require("../models").Stock_poubelle;
const Camion = require("../models").Camion;
const Vider_poubelle = require("../models").Vider_poubelle;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

exports.findPoubelleByEtab = asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 
    var blocEtablisssement =[];
    var etageEtablisssement =[];
    var blocpoubelle =[];
    var poubelle =[];
    const etablissement = await Etablissement.findAll({
        where:{CamionId:id},include: [
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
for (const etab of etablissement) {

    blocEtablisssement.push(etab.Bloc_etablissements);
}
const blocEtablisssementArray = blocEtablisssement.flat();

for (const bloc of blocEtablisssementArray) {

    etageEtablisssement.push(bloc.Etage_etablissements);
}

const etageArray = etageEtablisssement.flat();

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

    const etablissement = await Etablissement.findAll({
        where:{CamionId:id},include: [
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
    const etablissement = await Etablissement.findAll({
        where:{CamionId:id},include: [
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

  exports.viderPoubelle = asyncHandler(async(req,res,next)=>{
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
    var etablissementId = stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.id
    const camion = await Camion.findByPk(req.params.CamionId);
    var camiondocument={};
    var viderdocument={};
    var etablissementdocument={};
    if(stockPoubelle.type_poubelle==="plastique"){
        camiondocument={
            volume_actuelle_plastique:camion.volume_actuelle_plastique+stockPoubelle.quantite_actuel,
          
           }

           viderdocument={
            date_depot:Date.now(),
            etat:stockPoubelle.etat,
            quantite_depose:stockPoubelle.quantite_actuel,
            type_poubelle:"plastique",
            StockPoubelleId:id,
            CamionId: req.params.CamionId
 }
 etablissementdocument={quantite_dechets_plastique:stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.quantite_dechets_plastique+stockPoubelle.quantite_actuel,}
      }else if(stockPoubelle.type_poubelle==="canette"){
        etablissementdocument={quantite_dechets_canette:stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.quantite_dechets_canette+stockPoubelle.quantite_actuel,}

        camiondocument={
       volume_actuelle_canette:camion.volume_actuelle_canette+stockPoubelle.quantite_actuel,
       }
       viderdocument={
        date_depot:Date.now(),
        etat:stockPoubelle.etat,
        quantite_depose:stockPoubelle.quantite_actuel,
        type_poubelle:"canette",
        StockPoubelleId:id,
        CamionId: req.params.CamionId
}
    }else if(stockPoubelle.type_poubelle==="papier"){
        camiondocument={
          volume_actuelle_papier:camion.volume_actuelle_papier+stockPoubelle.quantite_actuel,
        }
        viderdocument={
            date_depot:Date.now(),
            etat:stockPoubelle.etat,
            quantite_depose:stockPoubelle.quantite_actuel,
            type_poubelle:"papier",
            StockPoubelleId:id,
            CamionId: req.params.CamionId
    }
    etablissementdocument={quantite_dechets_papier:stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.quantite_dechets_papier+stockPoubelle.quantite_actuel,}

    }else{
      etablissementdocument={quantite_dechets_composte:stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.quantite_dechets_composte+stockPoubelle.quantite_actuel,}

        camiondocument={
            volume_actuelle_composte:camion.volume_actuelle_composte+stockPoubelle.quantite_actuel,
       }
       viderdocument={
        date_depot:Date.now(),
        etat:stockPoubelle.etat,
        quantite_depose:stockPoubelle.quantite_actuel,
        type_poubelle:"composte",
        StockPoubelleId:id,
        CamionId: req.params.CamionId
}
    
    }
    await Vider_poubelle.create(viderdocument)
    await Camion.update(camiondocument,{where:{id:req.params.CamionId}})
    await Etablissement.update(etablissementdocument,{where:{id:stockPoubelle.Stock_blocPoubelle.Etage_etablissement.Bloc_etablissement.Etablissement.id}})
    
    var document={};

    document ={   
      reference:req.body.reference,
      type_poubelle:req.body.type_poubelle,
      isAffect:req.body.isAffect,
      StockBlocPoubelleId:req.body.StockBlocPoubelleId,
      nom_poubelle:req.body.nom_poubelle,
      capacite:req.body.capacite,
      quantite_actuel:0,
      etat:0,
  
  }
  
      await Stock_poubelle.update(document,{where:{id:id}})


      const newstockPoubelle = await Stock_poubelle.findByPk(id);


    res.status(200).json({data:newstockPoubelle});
  })


//   cron.schedule('* * * * *', async () => {
//     try {
//       // Create a new record
//       await Revenu.create({
//         reference:"SBP04",
//         isAffect:false
    
        
//     });
  
//       console.log('Revenu created successfully!');
//     } catch (error) {
//       console.error('Error creating record:', error);
//     }
//   });