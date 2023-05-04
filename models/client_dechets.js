const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Client_dechets=sequelize.define("Client_dechets",
    {  
        nom_entreprise:{
            type :DataTypes.STRING,
            allowNull:false},
        matricule_fiscale:{
            type :DataTypes.STRING,
        allowNull:false},
        nom:{
            type :DataTypes.STRING,
        allowNull:false},
        prenom:{
            type :DataTypes.STRING,
        allowNull:true},
        numero_fixe:{
            type :DataTypes.STRING,
        allowNull:true},
        adresse:{
            type :DataTypes.STRING,
        allowNull:true},
        numero_telephone:{
            type :DataTypes.STRING,
        allowNull:false},
        mot_de_passe:{
            type :DataTypes.STRING,
        allowNull:false},
        email:{
            type :DataTypes.STRING,
        allowNull:false},
        QRcode:{
            type :DataTypes.STRING,
        allowNull:true}
   
    }
    

    );
    
    Client_dechets.associate=models=>{
        Client_dechets.belongsTo(models.Commande_dechet,{
             onDelete:"cascade"
        })
        
    };
   

    return Client_dechets;
}