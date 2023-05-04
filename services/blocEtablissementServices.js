const { check } = require('express-validator');
const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path');
const ApiError = require('../apiError');

const Poubelle = db.Poubelle;
const Stock = db.Stock;

// create main Model
const Bloc_etablissement = db.Bloc_etablissement
var etat;

// main work

// 1. create Bloc_etablissement

const addBloc_etablissement = async (req, res,next) => {


    let info = {
        nom_bloc_etablissment: req.body.nom_bloc_etablissment,
        EtablissementId	: req.body.EtablissementId	,
       
    }
    
    
  

    
  const Bloc_etablissements = await Bloc_etablissement.create(info)
    let infoPoubelle = [{
        nom_poubelle: "plastique",
        etat: 0,
        BlocEtablissementId:Bloc_etablissements.id
       
    },{
        nom_poubelle: "canette",
        etat: 0,
        BlocEtablissementId:Bloc_etablissements.id
       
    },
    {
        nom_poubelle: "papier",
        etat: 0,
        BlocEtablissementId:Bloc_etablissements.id
       
    },
    {
        nom_poubelle: "composte",
        etat: 0,
        BlocEtablissementId:Bloc_etablissements.id
       
    }]
    const stocksPlastique = await Stock.findOne({where: {type_poubelle: infoPoubelle[0].nom_poubelle} });
    const stocksCanette = await Stock.findOne({where: {type_poubelle: infoPoubelle[1].nom_poubelle} });

    const stocksPapier = await Stock.findOne({where: {type_poubelle: infoPoubelle[2].nom_poubelle} });

    const stocksComposte = await Stock.findOne({where: {type_poubelle: infoPoubelle[3].nom_poubelle} });

    if(stocksPlastique.quantite<=0 ||stocksCanette.quantite<=0 ||stocksPapier.quantite<=0 ||stocksComposte.quantite<=0 ){
        return next(new ApiError(`pas du stock`, 400));
    }
 else{
infoPoubelle.map(function(e){
    addQuatrePoubelle(e);
    updateStock(e);
})
    
    
    res.status(200).send(Bloc_etablissements);

 }
  


 
}

const addQuatrePoubelle = async (infos) => {

    await Poubelle.create(infos)
 
}


const updateStock = async (infosP) => {

    const stocks = await Stock.findOne({where: {type_poubelle: infosP.nom_poubelle} });
    let newStock = stocks.quantite-1;
  await  Stock.update({ quantite:newStock}, { where: { id: stocks.id }})
 
}



// 2. get all Bloc_etablissements

const getAllBloc_etablissements = async (req, res) => {

    let Bloc_etablissements = await Bloc_etablissement.findAll({})
    res.status(200).send(Bloc_etablissements)

}

// 3. get single Bloc_etablissement

const getOneBloc_etablissement = async (req, res) => {

    let id = req.params.id
    let Bloc_etablissements = await Bloc_etablissement.findOne({ where: { id: id }})
    res.status(200).send(Bloc_etablissements)

}

// 4. update Bloc_etablissement

const updateBloc_etablissement = async (req, res) => {

    let id = req.params.id

    const Bloc_etablissements = await Bloc_etablissement.update(req.body, { where: { id: id }})

    res.status(200).send(Bloc_etablissements)
   

}

// 5. delete Bloc_etablissement by id

const deleteBloc_etablissement = async (req, res) => {

    let id = req.params.id
    
    await Bloc_etablissement.destroy({ where: { id: id }} )

    res.status(200).send('Bloc_etablissement is deleted !')

}

// 6. get published Bloc_etablissement

const getPublishedBloc_etablissement = async (req, res) => {

    const Bloc_etablissements =  await Bloc_etablissement.findAll({})

    res.status(200).send(Bloc_etablissements)

}

// 7. connect one to many relation Bloc_etablissement and Reviews




// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')









module.exports = {
    addBloc_etablissement,
    getAllBloc_etablissements,
    getOneBloc_etablissement,
    updateBloc_etablissement,
    deleteBloc_etablissement,
 }