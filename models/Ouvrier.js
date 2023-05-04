const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Ouvrier=sequelize.define("Ouvrier",
    {  
       
        poste:{
            type :DataTypes.STRING,
            allowNull:false},
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
        adresse:{
            type :DataTypes.STRING,
            allowNull:true},
        numero_telephone:{
            type :DataTypes.STRING,
            allowNull:false},
        email:{
            type :DataTypes.STRING,
            allowNull:false},
        mot_de_passe:{
            type :DataTypes.STRING,
            allowNull:false},
        QRcode:{
            type :DataTypes.STRING,
            allowNull:false},
       
        
   
    }
    

    );
    

    Ouvrier.associate=models=>{
        Ouvrier.hasOne(models.Camion,{
             onDelete:"cascade"
        });
    };

    return Ouvrier;
}