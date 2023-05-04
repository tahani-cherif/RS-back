const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Etage_etablissement=sequelize.define("Etage_etablissement",
    {  
        bloc_etablissement_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            nom_etage_etablissement:{
            type :DataTypes.STRING,
            allowNull:false},
        
   
    }
    

    );
    
    Etage_etablissement.associate=models=>{
        Etage_etablissement.belongsTo(models.Bloc_etablissement,{
             onDelete:"cascade"
        })
        
    };
    Etage_etablissement.associate=models=>{
        Etage_etablissement.hasMany(models.Bloc_poubelle,{
             onDelete:"cascade"
        });
    };

    return Etage_etablissement;
}