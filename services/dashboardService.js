const expressAsyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const Etablissement = require("../models").Etablissement;
const Bloc_etablissement = require("../models").Bloc_etablissement;
const Etage_etablissement = require("../models").Etage_etablissement;
const User = require("../models").User;
const Camion = require("../models").Camion;
const Revenu = require("../models").Revenu;
const Dechet = require("../models").Dechet;

const Stock_blocPoubelle = require("../models").Stock_blocPoubelle;
const Zone_depot = require("../models").Zone_depot;
const Zone_travail = require("../models").Zone_travail;

exports.getDashboardCount=expressAsyncHandler(async(req,res) => {
    const stock_blocPoubelle = await Stock_blocPoubelle.findAll({ where:{EtageEtablissementId: {
        [Op.not]: null, 
}}});
const blocPoubelle_enstock = await Stock_blocPoubelle.findAll({ where:{EtageEtablissementId:null}});
const etablissement = await Etablissement.findAll({});
const bloc_etablissement = await Bloc_etablissement.findAll({});
const etage_etablissement = await Etage_etablissement.findAll({});
const zone_depot = await Zone_depot.findAll({});
const zone_travail = await Zone_travail.findAll({});
const ouvrier = await User.findAll({where:{role:'ouvrier'}});
const admin = await User.findAll({where:{role:'admin'}});
const responsable_etablissement = await User.findAll({where:{role:'responsable_etablissement'}});
const camion = await Camion.findAll({});

const plastique = await Dechet.findOne({ where: { type_dechet: 'plastique' } });
const composte = await Dechet.findOne({ where: { type_dechet: 'composte' } });

const papier = await Dechet.findOne({ where: { type_dechet: 'papier' } });

const canette = await Dechet.findOne({ where: { type_dechet: 'canette' } });


const revenu = await Revenu.sum('revenu_total');
console.log("-------------------------------------------------------")
console.log(plastique)
console.log("-------------------------------------------------------")

    res.status(200).json({
       blocPoubelle_affecter: stock_blocPoubelle.length,
       blocPoubelle_enstock: blocPoubelle_enstock.length,
       etablissement: etablissement.length,
       bloc_etablissement: bloc_etablissement.length,
       etage_etablissement:etage_etablissement.length,
       poubelle_affecter:stock_blocPoubelle.length*4,
       poubelle_enstock:blocPoubelle_enstock.length*4,
       zone_depot:zone_depot.length ,
       zone_travail:zone_travail.length ,
       ouvrier:ouvrier.length ,
       admin:admin.length,
       responsable_etablissement:responsable_etablissement.length ,
       camion:camion.length,
       somme_revenu:revenu?revenu:0,
       prix_plastique_old:plastique?plastique.prix_unitaire:0,
       prix_plastique_new:plastique?plastique.prixApresPromotion:0,
       prix_composte_old:composte?composte.prix_unitaire:0,
       prix_composte_new:composte?composte.prixApresPromotion:0,
       prix_papier_old:papier?papier.prix_unitaire:0,
       prix_papier_new:papier?papier.prixApresPromotion:0,
       prix_canette_old:canette?canette.prix_unitaire:0,
       prix_canette_new:canette?canette.prixApresPromotion:0








    })
  });