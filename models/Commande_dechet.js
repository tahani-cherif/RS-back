const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Commande_dechet=sequelize.define("Commande_dechet",
    {  
        
       
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
            type :DataTypes.STRING,
        allowNull:true},
        montant_total:{
            type :DataTypes.DOUBLE,
        allowNull:true},
        date_commande:{
            type :DataTypes.DATE,
        allowNull:true},
        date_livraison:{
            type :DataTypes.DATE,
        allowNull:true}
   , QRcode:{
    type :DataTypes.INTEGER,
    allowNull:false},
    }
    

    );
    
    
    Commande_dechet.associate=models=>{
        Commande_dechet.hasOne(models.Client_dechets,{
             onDelete:"cascade"
        });
    };

    return Commande_dechet;
}