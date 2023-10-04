const Revenu = require("../models").Revenu;
const Etablissement = require("../models").Etablissement;

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError')


// @desc    Get all revenu
// @route   GET api/zonetravail/
// @access  Private
exports.getRevenus=asyncHandler(async(req,res) => {
    const revenu = await Revenu.findAll({
      include: [
        {
          model: Etablissement,
         
        }
      ]
    });
    res.status(200).json({results:revenu.length,data:revenu})
  });


// @desc    Get specific Revenu by id
// @route   GET api/zonetravail/:id
// @access  Private
exports.getRevenu = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  const revenu = await Revenu.findOne({where:{id:id}});
  if(!revenu)
  {
    return   next(new ApiError(`Revenu not found for this id ${id}`,404)); 
}
  res.status(200).json({data: revenu});
})


// @desc    Create a new Revenu
// @route   POST api/zonetravail/
// @access  Private
exports.createRevenu=asyncHandler(async(req,res)=>{
    const body=req.body
    const revenu=await Revenu.create(body)
     res.status(201).json({data:revenu})
   
});

// @desc    update specified Revenu
// @route   PUT api/zonetravail/:id
// @access  Private
exports.updateRevenu =asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const revenu = await Revenu.findByPk(id);
  if (!revenu) {
    return next(
      new ApiError(`No revenu for this id ${id}`, 404)
    );
  }
    await Revenu.update(req.body,{where:{id:id}})
    const updatedRevenu = await User.findByPk(id);  
    res.status(200).json({data:updatedRevenu});  
})


// @desc    delete specified revenu
// @route   DELETE api/zonetravail/:id
// @access  Private
exports.deleteRevenu=asyncHandler(async(req,res,next)=>{
   const {id}=req.params;
    const deletes=await Revenu.destroy({where:{id:id}})
  res.status(204).send();  
});

