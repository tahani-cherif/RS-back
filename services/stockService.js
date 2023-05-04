const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Stock = db.Stock

// main work

// 1. create Stock

const addStock = async (req, res) => {

    let info = {
        type_poubelle: req.body.type_poubelle,
        quantite: req.body.quantite,
       
    }

    const Stocks = await Stock.create(info)
    res.status(200).send(Stocks)
    console.log(Stocks)

}



// 2. get all Stocks

const getAllStocks = async (req, res) => {

    let Stocks = await Stock.findAll({})
    res.status(200).send(Stocks)

}

// 3. get single Stock

const getOneStock = async (req, res) => {

    let id = req.params.id
    let Stocks = await Stock.findOne({ where: { id: id }})
    res.status(200).send(Stocks)

}

// 4. update Stock

const updateStock = async (req, res) => {

    let id = req.params.id

    const Stocks = await Stock.update(req.body, { where: { id: id }})

    res.status(200).send(Stocks)
   

}

// 5. delete Stock by id

const deleteStock = async (req, res) => {

    let id = req.params.id
    
    await Stock.destroy({ where: { id: id }} )

    res.status(200).send('Stock is deleted !')

}

// 6. get published Stock

const getPublishedStock = async (req, res) => {

    const Stocks =  await Stock.findAll({})

    res.status(200).send(Stocks)

}

// 7. connect one to many relation Stock and Reviews




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
    addStock,
    getAllStocks,
    getOneStock,
    updateStock,
    deleteStock,
 }