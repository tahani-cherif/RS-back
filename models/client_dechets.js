const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Client_dechets=sequelize.define("Client_dechets",
    {  
        nom_entreprise:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        matricule_fiscale:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        nom:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        prenom:{
            type :DataTypes.VARCHAR(255),
        allowNull:true},
        numero_fixe:{
            type :DataTypes.VARCHAR(255),
        allowNull:true},
        adresse:{
            type :DataTypes.VARCHAR(255),
        allowNull:true},
        numero_telephone:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        mot_de_passe:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        email:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        QRcode:{
            type :DataTypes.VARCHAR(255),
        allowNull:true}
   
    }
    

    );
    
    Client_dechets.associate=models=>{
        Client_dechets.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Client_dechets.associate=models=>{
        Client_dechets.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Client_dechets;
}