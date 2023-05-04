const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Etablissement = db.Etablissement

// main work

// 1. create Etablissement

const addEtablissement = async (req, res) => {

    let info = {
        nom_etablissment: req.body.nom_etablissment,
        type_etablissement: req.body.type_etablissement,
       
    }

    const Etablissements = await Etablissement.create(info)
    res.status(200).send(Etablissements)
    console.log(Etablissements)

}



// 2. get all Etablissements

const getAllEtablissements = async (req, res) => {

    let Etablissements = await Etablissement.findAll({})
    res.status(200).send(Etablissements)

}

// 3. get single Etablissement

const getOneEtablissement = async (req, res) => {

    let id = req.params.id
    let Etablissements = await Etablissement.findOne({ where: { id: id }})
    res.status(200).send(Etablissements)

}

// 4. update Etablissement

const updateEtablissement = async (req, res) => {

    let id = req.params.id

    const Etablissements = await Etablissement.update(req.body, { where: { id: id }})

    res.status(200).send(Etablissements)
   

}

// 5. delete Etablissement by id

const deleteEtablissement = async (req, res) => {

    let id = req.params.id
    
    await Etablissement.destroy({ where: { id: id }} )

    res.status(200).send('Etablissement is deleted !')

}

// 6. get published Etablissement

const getPublishedEtablissement = async (req, res) => {

    const Etablissements =  await Etablissement.findAll({})

    res.status(200).send(Etablissements)

}

// 7. connect one to many relation Etablissement and Reviews




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
    addEtablissement,
    getAllEtablissements,
    getOneEtablissement,
    updateEtablissement,
    deleteEtablissement,
 }