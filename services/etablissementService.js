const Etablissement = require("../models").Etablissement;
const Bloc_etablissement = require("../models").Bloc_etablissement;
const Etage_etablissement = require("../models").Etage_etablissement;
const Stock_blocPoubelle = require("../models").Stock_blocPoubelle;
const Stock_poubelle = require("../models").Stock_poubelle;
const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all etablissement
// @route   GET api/zonetravail/
// @access  Private
exports.getEtablissements=asyncHandler(async(req,res) => {
    const etablissement = await Etablissement.findAll({
      include: [
          {
            model: Bloc_etablissement,
            include: [{ 
              model: Etage_etablissement,
              include:[{model:Stock_blocPoubelle,
                  include:[{model:Stock_poubelle}]}]
           }]
          }
        ]
      
  });
    res.status(200).json({results:etablissement.length,data:etablissement})
  });

// @desc    Get specific Etablissement by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getEtablissement = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const etablissement = await Etablissement.findOne({where:{id:id}});
  if(!etablissement)
  {
    return   next(new ApiError(`Etablissement not found for this id ${id}`,404)); 
}
  res.status(200).json({data: etablissement});
})


// @desc    Create a new Etablissement
// @route   POST api/zonetravail/
// @access  Private
exports.createEtablissement=asyncHandler(async(req,res)=>{
    const body=req.body
    const etablissement=await Etablissement.create(body)
     res.status(201).json({data:etablissement})
   
});

// @desc    update specified Etablissement
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateEtablissement =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const etablissement = await Etablissement.findByPk(id);
  if (!etablissement) {
    return next(
      new ApiError(`No etablissement for this id ${id}`, 404)
    );
  }
    await Etablissement.update(req.body,{where:{id:id}})
    const updatedEtablissement = await User.findByPk(id);  
    res.status(200).json({data:updatedEtablissement});  
})


// @desc    delete specified etablissement
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteEtablissement=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Etablissement.destroy({where:{id:id}})
  res.status(204).send();  
});