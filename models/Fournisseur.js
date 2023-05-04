const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Fournisseur=sequelize.define("Fournisseur",
    {  
        nom:{
            type :DataTypes.STRING,
            allowNull:false},
            prenom:{
            type :DataTypes.STRING,
            allowNull:false},
            CIN:{
            type :DataTypes.STRING,
        allowNull:false},
        photo:{
            type :DataTypes.STRING,
        allowNull:true},
        numero_telephone:{
            type :DataTypes.STRING,
        allowNull:false},
        email:{
            type :DataTypes.STRING,
        allowNull:false},
        adresse:{
            type :DataTypes.STRING,
        allowNull:false},
   
    }
    

    );
    
    Fournisseur.associate=models=>{
        Fournisseur.hasMany(models.Materiau_primaire,{
             onDelete:"cascade"
        })
        
    };
  

    return Fournisseur;
}