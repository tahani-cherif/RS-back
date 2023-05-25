const Etage_etablissement = require("../models").Etage_etablissement;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all etage_etablissement
// @route   GET api/zonetravail/
// @access  Private
exports.getEtage_etablissements=asyncHandler(async(req,res) => {
    const etage_etablissement = await Etage_etablissement.findAll();
    res.status(200).json({results:etage_etablissement.length,data:etage_etablissement})
  });

// @desc    Get specific Etage_etablissement by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getEtage_etablissement = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const etage_etablissement = await Etage_etablissement.findOne({where:{id:id}});
  if(!etage_etablissement)
  {
    return   next(new ApiError(`Etage_etablissement not found for this id ${id}`,404)); 
}
  res.status(200).json({data: etage_etablissement});
})


// @desc    Create a new Etage_etablissement
// @route   POST api/zonetravail/
// @access  Private
exports.createEtage_etablissement=asyncHandler(async(req,res)=>{
    const body=req.body
    const etage_etablissement=await Etage_etablissement.create(body)
     res.status(201).json({data:etage_etablissement})
   
});

// @desc    update specified Etage_etablissement
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateEtage_etablissement =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const etage_etablissement = await Etage_etablissement.findByPk(id);
  if (!etage_etablissement) {
    return next(
      new ApiError(`No etage_etablissement for this id ${id}`, 404)
    );
  }
    await Etage_etablissement.update(req.body,{where:{id:id}})
    const updatedEtage_etablissement = await User.findByPk(id);  
    res.status(200).json({data:updatedEtage_etablissement});  
})


// @desc    delete specified etage_etablissement
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteEtage_etablissement=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Etage_etablissement.destroy({where:{id:id}})
  res.status(204).send();  
});