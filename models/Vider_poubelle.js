const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Vider_poubelle=sequelize.define("Vider_poubelle",
    { 
            
            date_depot:{
            type :DataTypes.DATE,
        allowNull:false},
        etat:{
            type :DataTypes.DOUBLE,
        allowNull:false},
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
        type_poubelle:{
            type :DataTypes.STRING,
        allowNull:false},
        
    }
    

    );
    Vider_poubelle.associate=models=>{
        Vider_poubelle.belongsTo(models.Poubelle,{
             onDelete:"cascade"
        })
        
    };
    Vider_poubelle.associate=models=>{
        Vider_poubelle.belongsTo(models.Camion,{
             onDelete:"cascade"
        })
        
    };

    return Vider_poubelle;
}