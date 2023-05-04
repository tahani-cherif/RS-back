const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Fournisseur=sequelize.define("Fournisseur",
    {  
        nom:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
            prenom:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
            CIN:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        photo:{
            type :DataTypes.VARCHAR(255),
        allowNull:true},
        numero_telephone:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        email:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        adresse:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
   
    }
    

    );
    
    Fournisseur.associate=models=>{
        Fournisseur.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Fournisseur.associate=models=>{
        Fournisseur.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Fournisseur;
}