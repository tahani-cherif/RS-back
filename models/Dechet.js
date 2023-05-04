const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Dechet=sequelize.define("Dechet",
    {  
        type_dechet:{
            type :DataTypes.STRING,
            allowNull:false},
        prix_unitaire:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        photo:{
            type :DataTypes.STRING,
        allowNull:true},
        pourcentage_remise:{
            type :DataTypes.DOUBLE,
        allowNull:false}
      
   
    }
    

    );
    
    
    Dechet.associate=models=>{
        Dechet.hasMany(models.Depot,{
             onDelete:"cascade"
        });
    };
    Dechet.associate=models=>{
        Dechet.hasOne(models.Rating_dechet,{
             onDelete:"cascade"
        });
    };

    return Dechet;
}