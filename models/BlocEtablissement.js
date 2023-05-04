const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Bloc_etablissement=sequelize.define("Bloc_etablissement",
    {  
       
        nom_bloc_etablissment:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
   
    }
    

    );
    
    Bloc_etablissement.associate=models=>{
        Bloc_etablissement.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Bloc_etablissement.associate=models=>{
        Bloc_etablissement.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Bloc_etablissement;
}