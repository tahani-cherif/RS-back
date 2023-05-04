const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Camion=sequelize.define("Camion",
    {  
        matricule:{
            type :DataTypes.STRING,
            allowNull:false},
        heure_sortie:{
            type :DataTypes.DATE,
        allowNull:true},
        heure_entree:{
            type :DataTypes.DATE,
        allowNull:true},
        longitude:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        latitude:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        volume_maximale_camion:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        volume_actuelle_plastique:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        volume_actuelle_papier:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        volume_actuelle_composte:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        volume_actuelle_canette:{
            type :DataTypes.DOUBLE,
        allowNull:false}
   
    }
    

    );
    
    Camion.associate=models=>{
        Camion.belongsTo(models.Zone_travail,{
             onDelete:"cascade"
        })
        
    };
    Camion.associate=models=>{
        Camion.belongsTo(models.Ouvrier,{
             onDelete:"cascade"
        })
        
    };
    Camion.associate=models=>{
        Camion.belongsTo(models.Zone_depot,{
             onDelete:"cascade"
        })
        
    };
    Camion.associate=models=>{
        Camion.hasMany(models.Etablissement,{
             onDelete:"cascade"
        });
    };
    Camion.associate=models=>{
        Camion.hasMany(models.Depot,{
             onDelete:"cascade"
        });
    };

    return Camion;
}