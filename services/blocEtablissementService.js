const Bloc_etablissement = require("../models").Bloc_etablissement;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')
const Etablissement = require("../models").Etablissement;


// @desc    Get all bloc_etablissement
// @route   GET api/zonetravail/
// @access  Private
exports.getBloc_etablissements=asyncHandler(async(req,res) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
    const bloc_etablissement = await Bloc_etablissement.findAll({include: [
      {
        model: Etablissement,
       
      }
    ]});
    res.status(200).json({results:bloc_etablissement.length,data:bloc_etablissement})
  });

  exports.createFilterObj=(req,res,next) => {
    console.log(req.params)
       let filterObject={};
       if(req.params.EtablissementId) filterObject ={where:{EtablissementId:req.params.EtablissementId}};
       req.filterObj =filterObject;
     next();
     }

// @desc    Get specific Bloc_etablissement by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getBloc_etablissement = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const bloc_etablissement = await Bloc_etablissement.findOne({where:{id:id}});
  if(!bloc_etablissement)
  {
    return   next(new ApiError(`Bloc_etablissement not found for this id ${id}`,404)); 
}
  res.status(200).json({data: bloc_etablissement});
})

exports.getBloc_etablissementByEtab = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const bloc_etablissement = await Bloc_etablissement.findAll({ include: [
    {
      model: Etablissement,
     
    }
  ],where:{EtablissementId:id}});
  if(!bloc_etablissement)
  {
    return   next(new ApiError(`Bloc_etablissement not found for this id ${id}`,404)); 
}
  res.status(200).json({data: bloc_etablissement});
})

// @desc    Create a new Bloc_etablissement
// @route   POST api/zonetravail/
// @access  Private
exports.createBloc_etablissement=asyncHandler(async(req,res)=>{
    const body=req.body
    const bloc_etablissement=await Bloc_etablissement.create(body)
     res.status(201).json({data:bloc_etablissement})
   
});

// @desc    update specified Bloc_etablissement
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateBloc_etablissement =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const bloc_etablissement = await Bloc_etablissement.findByPk(id);
  if (!bloc_etablissement) {
    return next(
      new ApiError(`No bloc_etablissement for this id ${id}`, 404)
    );
  }
    await Bloc_etablissement.update(req.body,{where:{id:id}})
    const updatedBloc_etablissement = await User.findByPk(id);  
    res.status(200).json({data:updatedBloc_etablissement});  
})


// @desc    delete specified bloc_etablissement
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteBloc_etablissement=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Bloc_etablissement.destroy({where:{id:id}})
  res.status(204).send();  
});