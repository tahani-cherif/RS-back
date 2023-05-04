const Zone_travail = require("../models").Zone_travail;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all zone_travail
// @route   GET api/zonetravail/
// @access  Private
exports.getZonetravails=asyncHandler(async(req,res) => {
    const zone_travail = await Zone_travail.findAll();
    res.status(200).json({results:zone_travail.length,data:zone_travail})
  });

// @desc    Get specific Zone_travail by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getZonetravail = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const zone_travail = await Zone_travail.findOne({where:{id:id}});
  if(!zone_travail)
  {
    return   next(new ApiError(`Zone_travail not found for this id ${id}`,404)); 
}
  res.status(200).json({data: zone_travail});
})


// @desc    Create a new Zone_travail
// @route   POST api/zonetravail/
// @access  Private
exports.createZonetravail=asyncHandler(async(req,res)=>{
    const body=req.body
    const zone_travail=await Zone_travail.create(body)
     res.status(201).json({data:zone_travail})
   
});

// @desc    update specified Zone_travail
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateZonetravail =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
    const zone_travail=await Zone_travail.update(req.body,{where:{id:id}})
    res.status(200).json({message:true});  
})


// @desc    delete specified zone_travail
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteZonetravail=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Zone_travail.destroy({where:{id:id}})
  res.status(204).send();  
});