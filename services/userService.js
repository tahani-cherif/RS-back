const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const User = db.User

// main work

// 1. create User

const addUser = async (req, res) => {

    let info = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }

    const Users = await User.create(info)
    res.status(200).send(Users)
    console.log(Users)

}



// 2. get all Users

const getAllUsers = async (req, res) => {

    let Users = await User.findAll({})
    res.status(200).send(Users)

}

// 3. get single User

const getOneUser = async (req, res) => {

    let id = req.params.id
    let Users = await User.findOne({ where: { id: id }})
    res.status(200).send(Users)

}

// 4. update User

const updateUser = async (req, res) => {

    let id = req.params.id

    const Users = await User.update(req.body, { where: { id: id }})

    res.status(200).send(Users)
   

}

// 5. delete User by id

const deleteUser = async (req, res) => {

    let id = req.params.id
    
    await User.destroy({ where: { id: id }} )

    res.status(200).send('User is deleted !')

}

// 6. get published User

const getPublishedUser = async (req, res) => {

    const Users =  await User.findAll({})

    res.status(200).send(Users)

}

// 7. connect one to many relation User and Reviews




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
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
 }