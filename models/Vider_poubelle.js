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
        quantite_depose:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        
        type_poubelle:{
            type :DataTypes.STRING,
        allowNull:false},
        
    }
    

    );
    Vider_poubelle.associate=models=>{
        Vider_poubelle.belongsTo(models.Stock_poubelle,{
             onDelete:"cascade"
        }),
        Vider_poubelle.belongsTo(models.Camion,{
            onDelete:"cascade"
       })
       Vider_poubelle.belongsTo(models.Etablissement,{
        onDelete:"cascade"
   })
        
    };


    return Vider_poubelle;
}