const Zone_depot = require("../models").Zone_depot;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all zone_travail
// @route   GET api/zone_depot/
// @access  Private
exports.getZone_depots=asyncHandler(async(req,res) => {
    const zone_travail = await Zone_depot.findAll();
    res.status(200).json({results:zone_travail.length,data:zone_travail})
  });

// @desc    Get specific Zone_depot by id
// @route   GET api/zone_depot/:id
// @access  Private
exports.getZone_depot = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const zone_travail = await Zone_depot.findOne({where:{id:id}});
  if(!zone_travail)
  {
    return   next(new ApiError(`Zone_depot not found for this id ${id}`,404)); 
}
  res.status(200).json({data: zone_travail});
})


// @desc    Create a new Zone_depot
// @route   POST api/zone_depot/
// @access  Private
exports.createZone_depot=asyncHandler(async(req,res)=>{
    const body=req.body
    const zone_travail=await Zone_depot.create(body)
     res.status(201).json({data:zone_travail})
   
});

// @desc    update specified Zone_depot
// @route   PUT api/zone_depot/:id
// @access  Private
exports.updateZone_depot =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
    const zone_travail=await Zone_depot.update(req.body,{where:{id:id}})
    res.status(200).json({message:true});  
})


// @desc    delete specified zone_travail
// @route   DELETE api/zone_depot/:id
// @access  Private
exports.deleteZone_depot=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Zone_depot.destroy({where:{id:id}})
  res.status(204).send();  
});