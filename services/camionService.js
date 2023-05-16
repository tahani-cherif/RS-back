const Camion = require("../models").Camion;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all camion
// @route   GET api/zonetravail/
// @access  Private
exports.getCamions=asyncHandler(async(req,res) => {
    const camion = await Camion.findAll();
    res.status(200).json({results:camion.length,data:camion})
  });

// @desc    Get specific Camion by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getCamion = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const camion = await Camion.findOne({where:{id:id}});
  if(!camion)
  {
    return   next(new ApiError(`Camion not found for this id ${id}`,404)); 
}
  res.status(200).json({data: camion});
})


// @desc    Create a new Camion
// @route   POST api/zonetravail/
// @access  Private
exports.createCamion=asyncHandler(async(req,res)=>{
    const body=req.body
    const camion=await Camion.create(body)
     res.status(201).json({data:camion})
   
});

// @desc    update specified Camion
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateCamion =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
    const camion=await Camion.update(req.body,{where:{id:id}})
    res.status(200).json({message:true});  
})


// @desc    delete specified camion
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteCamion=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Camion.destroy({where:{id:id}})
  res.status(204).send();  
});