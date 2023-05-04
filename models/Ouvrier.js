const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Ouvrier=sequelize.define("Ouvrier",
    {  
        camion_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        poste:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
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
    
    Ouvrier.associate=models=>{
        Ouvrier.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Ouvrier.associate=models=>{
        Ouvrier.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Ouvrier;
}