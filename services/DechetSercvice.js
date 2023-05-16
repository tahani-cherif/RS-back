const Dechet = require("../models").Dechet;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all dechet
// @route   GET api/zonetravail/
// @access  Private
exports.getDechets=asyncHandler(async(req,res) => {
    const dechet = await Dechet.findAll();
    res.status(200).json({results:dechet.length,data:dechet})
  });

// @desc    Get specific Dechet by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getDechet = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const dechet = await Dechet.findOne({where:{id:id}});
  if(!dechet)
  {
    return   next(new ApiError(`Dechet not found for this id ${id}`,404)); 
}
  res.status(200).json({data: dechet});
})


// @desc    Create a new Dechet
// @route   POST api/zonetravail/
// @access  Private
exports.createDechet=asyncHandler(async(req,res)=>{
    const body=req.body
    const dechet=await Dechet.create(body)
     res.status(201).json({data:dechet})
   
});

// @desc    update specified Dechet
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateDechet =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
    const dechet=await Dechet.update(req.body,{where:{id:id}})
    res.status(200).json({message:true});  
})


// @desc    delete specified dechet
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteDechet=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Dechet.destroy({where:{id:id}})
  res.status(204).send();  
});