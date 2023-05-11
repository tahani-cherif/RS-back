const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Stock_poubelle=sequelize.define("Stock_poubelle",
    {  
           nom_poubelle:{
            type :DataTypes.STRING,
            allowNull:true},
            reference:{
            type :DataTypes.STRING,
            allowNull:false},
            type_poubelle:{
            type :DataTypes.STRING,
            allowNull:false},
            
        isAffect:{type :DataTypes.BOOLEAN,allowNull:false}
      
   
    }
    

    );
    

    Stock_poubelle.associate=models=>{
        Stock_poubelle.belongsTo(models.Stock_blocPoubelle,{
             onDelete:"cascade"
        })
        
    };
    Stock_poubelle.associate=models=>{
        Stock_poubelle.hasOne(models.Rating_poubelle,{
             onDelete:"cascade"
        });
    };

    return Stock_poubelle;
}