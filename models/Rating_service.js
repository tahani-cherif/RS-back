const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Rating_service=sequelize.define("Rating_service",
    {  
        responsable_etablissement_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        services:{
            type :DataTypes.STRING,
        allowNull:false},
            rating:{
            type :DataTypes.DOUBLE,
        allowNull:false},
       
   
    }
    

    );
    
    Rating_service.associate=models=>{
        Rating_service.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Rating_service.associate=models=>{
        Rating_service.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Rating_service;
}