const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Rating_service=sequelize.define("Rating_service",
    {  
        
        services:{
            type :DataTypes.STRING,
        allowNull:false},
            rating:{
            type :DataTypes.DOUBLE,
        allowNull:false},
       
   
    }
    

    );
    
    Rating_service.associate=models=>{
        Rating_service.belongsTo(models.Responsable_etablissement,{
             onDelete:"cascade"
        })
        
    };
    

    return Rating_service;
}