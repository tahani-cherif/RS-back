const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Depot=sequelize.define("Depot",
    {  
        zone_depot_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            camion_id:{
            type :DataTypes.INTEGER,
        allowNull:false},
        date_depot:{
            type :DataTypes.DATETIME,
        allowNull:true},
        quantite_depose_plastique:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depose_papier:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depose_composte:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_depose_canette:{
            type :DataTypes.DOUBLE,
        allowNull:false},
   
    }
    

    );
    
    Depot.associate=models=>{
        Depot.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Depot.associate=models=>{
        Depot.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Depot;
}