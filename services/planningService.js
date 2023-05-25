const Planning = require("../models").Planning;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all planning
// @route   GET api/zonetravail/
// @access  Private
exports.getPlannings=asyncHandler(async(req,res) => {
    const planning = await Planning.findAll();
    res.status(200).json(planning)
  });

// @desc    Get specific Planning by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getPlanning = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const planning = await Planning.findOne({where:{id:id}});
  if(!planning)
  {
    return   next(new ApiError(`Planning not found for this id ${id}`,404)); 
}
  res.status(200).json({data: planning});
})


// @desc    Create a new Planning
// @route   POST api/zonetravail/
// @access  Private
exports.createPlanning=asyncHandler(async(req,res)=>{
    const body=req.body
    const planning=await Planning.create(body)
     res.status(201).json({data:planning})
   
});

// @desc    update specified Planning
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updatePlanning =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const planning = await Planning.findByPk(id);
  if (!planning) {
    return next(
      new ApiError(`No planning for this id ${id}`, 404)
    );
  }
    await Planning.update(req.body,{where:{id:id}})
    const updatedPlanning = await User.findByPk(id);  
    res.status(200).json({data:updatedPlanning});  
})


// @desc    delete specified planning
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deletePlanning=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Planning.destroy({where:{id:id}})
  res.status(204).send();  
});