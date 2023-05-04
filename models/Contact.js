const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Contact=sequelize.define("Contact",
    {  
        nom:{
            type :DataTypes.STRING,
            allowNull:false},
        prenom:{
            type :DataTypes.STRING,
        allowNull:false},
        email:{
            type :DataTypes.STRING,
        allowNull:false},
        numero_telephone:{
            type :DataTypes.STRING,
        allowNull:false},
        message:{
            type :DataTypes.STRING,
        allowNull:false},
   
    }
    

    );
    

    return Contact;
}