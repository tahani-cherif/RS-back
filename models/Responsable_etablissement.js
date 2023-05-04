const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Responsable_commercial=sequelize.define("Responsable_commercial",
    {  
        etablissement_id:{
            type :DataTypes.INTEGER,
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
    
    Responsable_commercial.associate=models=>{
        Responsable_commercial.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
   

    return Responsable_commercial;
}