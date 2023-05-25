const Stock_blocPoubelle = require("../models").Stock_blocPoubelle;
const Stock_poubelle = require("../models").Stock_poubelle;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const cron = require('node-cron');


// @desc    Get all stock_blocPoubelle
// @route   GET api/Stock_blocPoubelle/
// @access  Private
exports.getStock_blocPoubelles=asyncHandler(async(req,res) => {
    const stock_blocPoubelle = await Stock_blocPoubelle.findAll();
    res.status(200).json({results:stock_blocPoubelle.length,data:stock_blocPoubelle})
    
  });

// @desc    Get specific Stock_blocPoubelle by id
// @route   GET api/Stock_blocPoubelle/:id
// @access  Private
exports.getStock_blocPoubelle = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const stock_blocPoubelle = await Stock_blocPoubelle.findOne({where:{id:id}});
  if(!stock_blocPoubelle)
  {
    return   next(new ApiError(`Stock_blocPoubelle not found for this id ${id}`,404)); 
}
  res.status(200).json({data: stock_blocPoubelle});
})


// @desc    Create a new Stock_blocPoubelle
// @route   POST api/Stock_blocPoubelle/
// @access  Private
exports.createStock_blocPoubelle=asyncHandler(async(req,res)=>{
    const body=req.body
    const stock_blocPoubelle=await Stock_blocPoubelle.create(body)
    
     const stock_poubelle = await Stock_poubelle.findAll();
     lengthStock= stock_poubelle.length+1;
     let j =0;
     for(let i=lengthStock; i<lengthStock+4;i++) {
      
      let typePoubelle= ["plastique", "canette","papier","composte"];
      poubelle =await Stock_poubelle.create({
      nom_poubelle:null,
      reference:`${body.reference}-${i.toString().padStart(4, '0')}`,
      type_poubelle:typePoubelle[j],
      isAffect:false,
      StockBlocPoubelleId:stock_blocPoubelle.id,
      etat:0,
      capacite:1000.0,
      quantite_actuel:0.0
})
     j++;
    } 
    
    res.status(201).json({data:stock_blocPoubelle})

});

// @desc    update specified Stock_blocPoubelle
// @route   PUT api/Stock_blocPoubelle/:id
// @access  Private
exports.updateStock_blocPoubelle =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
    const stock_blocPoubelle=await Stock_blocPoubelle.update(req.body,{where:{id:id}})
    res.status(200).json({message:true});  
})


// @desc    delete specified stock_blocPoubelle
// @route   DELETE api/Stock_blocPoubelle/:id
// @access  Private
exports.deleteStock_blocPoubelle=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Stock_blocPoubelle.destroy({where:{id:id}})
  res.status(204).send();  
});
