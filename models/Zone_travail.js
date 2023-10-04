const { sequelize } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
    const Zone_travail=sequelize.define("Zone_travail",
    {  
        region:{
            type :DataTypes.STRING,
            allowNull:false},

            quantite_total_collecte_plastique:{
            type :DataTypes.DOUBLE,
            default:0,
            
        allowNull:false},
        quantite_total_collecte_composte:{
            type :DataTypes.DOUBLE,
            default:0,
        allowNull:false},
        quantite_total_collecte_papier:{
            type :DataTypes.DOUBLE,
            default:0,
        allowNull:false},
        quantite_total_collecte_canette:{
            type :DataTypes.DOUBLE,
            default:0,
        allowNull:false},
    }
    

    );
    
   
    Zone_travail.associate=models=>{
        Zone_travail.hasMany(models.Camion,{
              
        }),
        Zone_travail.hasMany(models.Zone_depot,{
          
             
        })
         Zone_travail.associate=models=>{
        Zone_travail.hasMany(models.Etablissement,{
          
        })
        Zone_travail.hasMany(models.CodePostal,{
          
        })
    };
    };
   
  

    return Zone_travail;
}