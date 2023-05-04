const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Rating_poubelle=sequelize.define("Rating_poubelle",
    {  
        responsable_etablissement_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        stock_poubelle_id:{
            type :DataTypes.INTEGER,
        allowNull:false},
            rating:{
            type :DataTypes.DOUBLE,
        allowNull:false},
       
   
    }
    

    );
    
    Rating_poubelle.associate=models=>{
        Rating_poubelle.belongsTo(models.Stock_poubelle,{
             onDelete:"cascade"
        })
        
    };
  

    return Rating_poubelle;
}