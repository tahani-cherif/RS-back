const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Stock_blocPoubelle=sequelize.define("Stock_blocPoubelle",
    {  
        reference:{
            type :DataTypes.STRING,
            allowNull:false},
        isAffect:{type :DataTypes.BOOLEAN,allowNull:false}
            
      
   
    }
    

    );
    
   
    Stock_blocPoubelle.associate=models=>{
        Stock_blocPoubelle.hasMany(models.Stock_poubelle,{
             onDelete:"cascade"
        });
        Stock_blocPoubelle.belongsTo(models.Etage_etablissement,{
            allowNull: true
       });
    };

    return Stock_blocPoubelle;
}