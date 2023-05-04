const  express = require('express')

const { addUser,deleteUser,getAllUsers,getOneUser,updateUser } = require('../services/userService');
const { createUserValidator } = require('../utils/validators/userValidator');

const router = express.Router()

router.route('/').get(getAllUsers).post(createUserValidator,addUser)
router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser)
module.exports=router;