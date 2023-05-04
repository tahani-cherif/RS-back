const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Rating_dechet=sequelize.define("Rating_dechet",
    {  
        client_dechet_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            dechet_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            rating:{
            type :DataTypes.DOUBLE,
        allowNull:false},
       
   
    }
    

    );
    
    Rating_dechet.associate=models=>{
        Rating_dechet.belongsTo(models.Dechet,{
             onDelete:"cascade"
        })
        
    };
   

    return Rating_dechet;
}