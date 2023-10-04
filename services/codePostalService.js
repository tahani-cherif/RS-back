const CodePostal = require("../models").CodePostal;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all codePostal
// @route   GET api/zonetravail/
// @access  Private
exports.getCodePostalsLibre=asyncHandler(async(req,res) => {
    const codePostal = await CodePostal.findAll({where:{ZoneTravailId:null	}});
    res.status(200).json({results:codePostal.length,data:codePostal})
  });
  exports.getCodePostals=asyncHandler(async(req,res) => {
    const codePostal = await CodePostal.findAll();
    res.status(200).json({results:codePostal.length,data:codePostal})
  });
  exports.getCodePostalsByZoneTravail=asyncHandler(async(req,res) => {
    const codePostal = await CodePostal.findAll({where:{ZoneTravailId:req.params.id}});
    res.status(200).json({results:codePostal.length,data:codePostal})
  });


// @desc    Get specific CodePostal by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getCodePostal = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const codePostal = await CodePostal.findOne({where:{id:id}});
  if(!codePostal)
  {
    return   next(new ApiError(`CodePostal not found for this id ${id}`,404)); 
}
  res.status(200).json({data: codePostal});
})


// @desc    Create a new CodePostal
// @route   POST api/zonetravail/
// @access  Private
exports.createCodePostal=asyncHandler(async(req,res)=>{
    const body=req.body
    const codePostal=await CodePostal.create(body)
     res.status(201).json({data:codePostal})
   
});

// @desc    update specified CodePostal
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateCodePostal =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
    const codePostal=await CodePostal.update(req.body,{where:{id:id}})
    res.status(200).json({message:true});  
})


// @desc    delete specified codePostal
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteCodePostal=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await CodePostal.destroy({where:{id:id}})
  res.status(204).send();  
});