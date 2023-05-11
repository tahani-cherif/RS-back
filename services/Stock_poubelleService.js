const Stock_poubelle = require("../models").Stock_poubelle;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all stock_poubelle
// @route   GET api/Stock_poubelle/
// @access  Private
exports.getStock_poubelles=asyncHandler(async(req,res) => {
    const stock_poubelle = await Stock_poubelle.findAll();
    res.status(200).json({results:stock_poubelle.length,data:stock_poubelle})
  });

// @desc    Get specific Stock_poubelle by id
// @route   GET api/Stock_poubelle/:id
// @access  Private
exports.getStock_poubelle = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const stock_poubelle = await Stock_poubelle.findOne({where:{id:id}});
  if(!stock_poubelle)
  {
    return   next(new ApiError(`Stock_poubelle not found for this id ${id}`,404)); 
}
  res.status(200).json({data: stock_poubelle});
})


// @desc    Create a new Stock_poubelle
// @route   POST api/Stock_poubelle/
// @access  Private
exports.createStock_poubelle=asyncHandler(async(req,res)=>{
    const body=req.body
    const stock_poubelle=await Stock_poubelle.create(body)
     res.status(201).json({data:stock_poubelle})
   
});

// @desc    update specified Stock_poubelle
// @route   PUT api/Stock_poubelle/:id
// @access  Private
exports.updateStock_poubelle =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
    const stock_poubelle=await Stock_poubelle.update(req.body,{where:{id:id}})
    res.status(200).json({message:true});  
})


// @desc    delete specified stock_poubelle
// @route   DELETE api/Stock_poubelle/:id
// @access  Private
exports.deleteStock_poubelle=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Stock_poubelle.destroy({where:{id:id}})
  res.status(204).send();  
});