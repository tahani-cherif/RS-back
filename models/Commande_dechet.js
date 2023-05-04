const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Commande_dechet=sequelize.define("Commande_dechet",
    {  
        client_dechet_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        QRcode:{
            type :DataTypes.INTEGER,
            allowNull:false},
        quantite_plastique:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_papier:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_composte:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        quantite_canette:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        prix_plastique:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        prix_papier:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        prix_composte:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        prix_canette:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        montant_total:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        type_paiment:{
            type :DataTypes.VARCHAR(255),
        allowNull:true},
        montant_total:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        date_commande:{
            type :DataTypes.DATETIME,
        allowNull:true},
        date_livraison:{
            type :DataTypes.DATETIME,
        allowNull:true}
   
    }
    

    );
    
    Commande_dechet.associate=models=>{
        Commande_dechet.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Commande_dechet.associate=models=>{
        Commande_dechet.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Commande_dechet;
}