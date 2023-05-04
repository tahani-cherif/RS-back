const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Forget_password=sequelize.define("Forget_password",
    {  
        email:{
            type :DataTypes.STRING,
            allowNull:false},
            user_type:{
            type :DataTypes.STRING,
            allowNull:false},
            code:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        date_expiration_code:{
            type :DataTypes.DATE,
        allowNull:false},
    }
    

    );
    
   

    return Forget_password;
}