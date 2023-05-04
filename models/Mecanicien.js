const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Mecanicien=sequelize.define("Mecanicien",
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
        adresse:{
            type :DataTypes.VARCHAR(255),
            allowNull:true},
        numero_telephone:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        email:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        mot_de_passe:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        QRcode:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
       
        
   
    }
    

    );
    
    Mecanicien.associate=models=>{
        Mecanicien.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Mecanicien.associate=models=>{
        Mecanicien.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Mecanicien;
}