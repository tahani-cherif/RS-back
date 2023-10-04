const User = require("../models").User;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const {uploadSingleImage}= require('../middlewares/uploadImageMiddleware')
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');
exports.uploadUserImage = uploadSingleImage('profileImg')
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename= `user-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/users/${filename}`);
    // Save image into our db
    req.body.profileImg = filename;}
    next();
    });
// @desc    Get all user
// @route   GET api/User/
// @access  Private
exports.getUsers=asyncHandler(async(req,res) => {
    const user = await User.findAll();
    res.status(200).json({results:user.length,data:user})
  });

// @desc    Get specific User by id
// @route   GET api/User/:id
// @access  Private
exports.getUser = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const user = await User.findOne({where:{id:id}});
  if(!user)
  {
    return   next(new ApiError(`User not found for this id ${id}`,404)); 
}
  res.status(200).json({data: user});
})


// @desc    Create a new User
// @route   POST api/User/
// @access  Private
exports.createUser=asyncHandler(async(req,res)=>{
    const body=req.body
    console.log(body)
    const user=await User.create(body)
     res.status(201).json({data:user})
   
});

// @desc    update specified User
// @route   PUT api/User/:id
// @access  Private
exports.updateUser =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return next(
      new ApiError(`No user for this id ${id}`, 404)
    );
  }
    await user.update({name:req.body.name,phone:req.body.phone,email:req.body.email,profileImg:req.body.profileImg,role:req.body.role})
   
      const updatedUser = await User.findByPk(id);  
       
    res.status(200).json({ data: updatedUser });
})


exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const {id}=req.params;
  const user = await User.findByPk(id);
   
  
    if (!user) {
        return next(
          new ApiError(`No user for this id ${id}`, 404)
        );
      }
      await user.update({
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      })
      const updatedUser = await User.findByPk(id);  
    res.status(200).json({ data: updatedUser });
  });


// @desc    delete specified user
// @route   DELETE api/User/:id
// @access  Private
exports.deleteUser=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
   const user = await User.findByPk(id);
   
    if(!user){
      return next(new ApiError(`No User for this id ${id}`,404));    }else{
       await User.destroy({where:{id:id}})
        res.status(200).json({ message: "user deleted" });  
      }
  
});