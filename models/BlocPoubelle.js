const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Bloc_poubelle=sequelize.define("Bloc_poubelle",
    {  
       
        nom_bloc_poubelle:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
   
    }
    

    );
    
    Bloc_poubelle.associate=models=>{
        Bloc_poubelle.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Bloc_poubelle.associate=models=>{
        Bloc_poubelle.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Bloc_poubelle;
}