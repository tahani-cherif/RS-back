const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Stock_poubelle=sequelize.define("Stock_poubelle",
    {  
        type_poubelle:{
            type :DataTypes.STRING,
            allowNull:false},
            quantite_disponible:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        description:{
            type :DataTypes.STRING,
        allowNull:true},
        photo:{
            type :DataTypes.STRING,
        allowNull:false}
      
   
    }
    

    );
    
    Stock_poubelle.associate=models=>{
        Stock_poubelle.belongsTo(models.Bloc_poubelle,{
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