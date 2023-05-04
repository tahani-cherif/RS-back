const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Contact=sequelize.define("Contact",
    {  
        nom:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        prenom:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        email:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        numero_telephone:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        message:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
   
    }
    

    );
    
    Contact.associate=models=>{
        Contact.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Contact.associate=models=>{
        Contact.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Contact;
}