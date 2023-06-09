const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Depot=sequelize.define("Depot",
    {  
        date_depot:{
            type :DataTypes.DATE,
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
        Depot.belongsTo(models.Zone_depot,{
             onDelete:"cascade"
        })
        
    };
    Depot.associate=models=>{
        Depot.belongsTo(models.Camion,{
             onDelete:"cascade"
        });
    };

    return Depot;
}