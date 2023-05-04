const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Rating_poubelle=sequelize.define("Rating_poubelle",
    {  
       
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
    Rating_poubelle.associate=models=>{
        Rating_poubelle.belongsTo(models.Responsable_etablissement,{
             onDelete:"cascade"
        })
        
    };
  

    return Rating_poubelle;
}