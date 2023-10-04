const Etablissement = require("../models").Etablissement;
const Bloc_etablissement = require("../models").Bloc_etablissement;
const Etage_etablissement = require("../models").Etage_etablissement;
const Stock_blocPoubelle = require("../models").Stock_blocPoubelle;
const Stock_poubelle = require("../models").Stock_poubelle;
const CodePostal = require("../models").CodePostal;
const {uploadSingleImage}= require('../middlewares/uploadImageMiddleware')
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const asyncHandler = require('express-async-handler')
const ApiError=require('../utils/apiError');


// @desc    Get all etablissement
// @route   GET api/zonetravail/
// @access  Private
exports.uploadUserImage = uploadSingleImage('etablissementImg')
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename= `etablissement-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/etablissements/${filename}`);
    // Save image into our db
    req.body.etablissementImg = filename;}
    next();
    });
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
  exports.getEtablissementsWithoutDetails=asyncHandler(async(req,res) => {
    const etablissement = await Etablissement.findAll();
    res.status(200).json({results:etablissement.length,data:etablissement})
  });

  exports.getEtablissementsMap = asyncHandler(async (req, res) => {
    const etablissements = await Etablissement.findAll({where:{CamionId:req.params.id},
      include: [
        {
          model: Bloc_etablissement,
          include: [
            {
              model: Etage_etablissement,
              include: [
                {
                  model: Stock_blocPoubelle,
                  include: [{ model: Stock_poubelle }],
                },
              ],
            },
          ],
        },
      ],
    });
  
    // Process the etablissements data to add the "show" key
    const processedEtablissements = etablissements.map((etablissement) => {
      const blocs = etablissement.Bloc_etablissements;
      const shouldShow = blocs.some((bloc) => {
        return bloc.Etage_etablissements.some((etage) => {
          return etage.Stock_blocPoubelles.some((stockBlocPoubelle) => {
            return stockBlocPoubelle.Stock_poubelles.some(
              (stockPoubelle) => stockPoubelle.etat > 70
            );
          });
        });
      });
  
      return {
        ...etablissement.toJSON(),
        show: shouldShow,
      };
    });
  
    res.status(200).json({ results: etablissements.length, data: processedEtablissements });
  });
  exports.getEtablissementsParcamion=asyncHandler(async(req,res) => {
    const etablissement = await Etablissement.findAll({where:{CamionId:req.params.CamionId}});
    res.status(200).json({results:etablissement.length,data:etablissement})
  });

  exports.getEtablissementsWithoutzt=asyncHandler(async(req,res) => {
    const etablissement = await Etablissement.findAll({where:{ZoneTravailId:null}});
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
exports.findPoubelleByEtab = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 
  var test =[];
  var blocpoubelle =[];
  var poubelle =[];
  const etablissement = await Etablissement.findOne({
      where:{id:id},include: [
          {
            model: Bloc_etablissement,
            include: [{ 
              model: Etage_etablissement,
              include:[{model:Stock_blocPoubelle,
                  include:[{model:Stock_poubelle}]}]
           }]
          }
        ]
      
  }
  
      
);
for (const etab of etablissement.Bloc_etablissements) {

  test.push(etab.Etage_etablissements);
}

const etageArray = test.flat();

for (const etage of etageArray) {
blocpoubelle.push(etage.Stock_blocPoubelles);
}
const blocpoubelleArray = blocpoubelle.flat();
for (const blocPoubelle of blocpoubelleArray) {
poubelle.push(blocPoubelle.Stock_poubelles);
}

const poubelleArray = poubelle.flat();
const statsByType = poubelleArray.reduce((result, bin) => {
  const { type_poubelle, etat, quantite_actuel } = bin;
  if (!result[type_poubelle]) {
    result[type_poubelle] = { totalQuantiteActuel: 0, totalEtat: 0, count: 0, averageEtat: 0 };
  }
  result[type_poubelle].totalQuantiteActuel += quantite_actuel;
  result[type_poubelle].totalEtat += etat;
  result[type_poubelle].count++;
  return result;
}, {});

// Calculate the average etat for each type
for (const type in statsByType) {
  const { totalQuantiteActuel, totalEtat, count } = statsByType[type];
  statsByType[type].averageEtat = totalEtat / count;
}




  res.status(200).json({data: statsByType});
})
exports.etablissementDetailsById = asyncHandler(async(req,res,next)=>{
  const {id}=req.params; 

  const etablissement = await Etablissement.findOne({
      where:{id:id},include: [
          {
            model: Bloc_etablissement,
            include: [{ 
              model: Etage_etablissement,
              include:[{model:Stock_blocPoubelle,
                  include:[{model:Stock_poubelle}]}]
           }]
          }
        ]
      
  }
  
      
);

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

exports.createEtablissementwithcp=asyncHandler(async(req,res)=>{

  const body=req.body
  console.log("-------------------------------------------")
  console.log(body)
  console.log("-------------------------------------------")
  const codePostal = await CodePostal.findOne({where:{code_postal:body.code_postal	}});


  const etablissement=await Etablissement.create({...body,ZoneTravailId:codePostal.ZoneTravailId})
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
    const updatedEtablissement = await Etablissement.findByPk(id);  
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