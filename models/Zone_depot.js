const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Zone_depot=sequelize.define("Zone_depot",
    {  
       
        adresse:{
            type :DataTypes.STRING,
            allowNull:false},
        longitude:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        latitude:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depot_maximale:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depot_actuelle_plastique:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depot_actuelle_papier:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depot_actuelle_composte:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depot_actuelle_canette:{
            type :DataTypes.DOUBLE,
        allowNull:false}
   
    }
    

    );
    
    Zone_depot.associate=models=>{
        Zone_depot.belongsTo(models.Camion,{
             onDelete:"cascade"
        })
        
    };
    Zone_depot.associate=models=>{
        Zone_depot.hasMany(models.Depot,{
             onDelete:"cascade"
        });
    };

    return Zone_depot;
}