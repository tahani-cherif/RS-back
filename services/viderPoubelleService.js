const Vider_poubelle = require("../models").Vider_poubelle;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const Sequelize = require('sequelize');
const Stock_poubelle = require("../models").Stock_poubelle;
const Op = Sequelize.Op;

// @desc    Get all vider_poubelle
// @route   GET api/zonetravail/
// @access  Private
exports.getVider_poubelles=asyncHandler(async(req,res) => {
    const vider_poubelle = await Vider_poubelle.findAll();
    res.status(200).json({results:vider_poubelle.length,data:vider_poubelle})
  });

// @desc    Get specific Vider_poubelle by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getVider_poubelle = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const vider_poubelle = await Vider_poubelle.findOne({where:{id:id}});
  if(!vider_poubelle)
  {
    return   next(new ApiError(`Vider_poubelle not found for this id ${id}`,404)); 
}
  res.status(200).json({data: vider_poubelle});
})


// @desc    Create a new Vider_poubelle
// @route   POST api/zonetravail/
// @access  Private
exports.createVider_poubelle=asyncHandler(async(req,res)=>{
    const body=req.body
    const vider_poubelle=await Vider_poubelle.create(body)
     res.status(201).json({data:vider_poubelle})
   
});

// @desc    update specified Vider_poubelle
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateVider_poubelle =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const vider_poubelle = await Vider_poubelle.findByPk(id);
  if (!vider_poubelle) {
    return next(
      new ApiError(`No vider_poubelle for this id ${id}`, 404)
    );
  }
    await Vider_poubelle.update(req.body,{where:{id:id}})
    const updatedVider_poubelle = await User.findByPk(id);  
    res.status(200).json({data:updatedVider_poubelle});  
})


// @desc    delete specified vider_poubelle
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteVider_poubelle=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Vider_poubelle.destroy({where:{id:id}})
  res.status(204).send();  
});
exports.getDataFromLastMonth = asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 
    const currentDate = new Date();

    // Calculate the start and end dates of the last month
    const lastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const lastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const query = {
        where: {
            date_depot: {
            [Op.between]: [lastMonthStartDate, lastMonthEndDate]
          }
          
        },
        group: "type_poubelle",
        
      };
    const viderPoubelle = await Vider_poubelle.findAll(query);
    var quantite_actuel_plastique =0;
    var quantite_actuel_canette =0;
    var quantite_actuel_papier =0;
    var quantite_actuel_composte =0;
    for (const poubelle of viderPoubelle) {
        if(poubelle.type_poubelle==="plastique"){
          quantite_actuel_plastique=  quantite_actuel_plastique+poubelle.quantite_depose;
        }else if(poubelle.type_poubelle==="canette"){
          quantite_actuel_canette=  quantite_actuel_canette+poubelle.quantite_depose;
      }else if(poubelle.type_poubelle==="papier"){
        quantite_actuel_papier=  quantite_actuel_papier+poubelle.quantite_depose;
      }else{
        quantite_actuel_composte=  quantite_actuel_composte+poubelle.quantite_depose;
      
      }}
var statistique = {quantite_actuel_plastique: quantite_actuel_plastique,quantite_actuel_canette:quantite_actuel_canette,quantite_actuel_papier:quantite_actuel_papier,quantite_actuel_composte:quantite_actuel_composte};
    res.status(200).json({data:viderPoubelle});
  })
