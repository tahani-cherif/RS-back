const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Vider_poubelle=sequelize.define("Vider_poubelle",
    {  
        poubelle_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            camion_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
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
    

    return Vider_poubelle;
}