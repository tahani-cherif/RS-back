const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Bloc_etablissement=sequelize.define("Bloc_etablissement",
    {  
       
        nom_bloc_etablissment:{
            type :DataTypes.STRING,
        allowNull:false},
   
    }
    

    );
    
    Bloc_etablissement.associate=models=>{
        Bloc_etablissement.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        Bloc_etablissement.hasMany(models.Etage_etablissement,{
            onDelete:"cascade"
       });
        
    };
  

    return Bloc_etablissement;
}