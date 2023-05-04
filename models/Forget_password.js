const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Forget_password=sequelize.define("Forget_password",
    {  
        email:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
            user_type:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
            code:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        date_expiration_code:{
            type :DataTypes.DATETIME,
        allowNull:false},
    }
    

    );
    
   

    return Forget_password;
}