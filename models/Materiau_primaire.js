const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Materiau_primaire=sequelize.define("Materiau_primaire",
    {  
        fournisseur_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        nom_materiel:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        prix_unitaire:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        prix_total:{
            type :DataTypes.DOUBLE,
        allowNull:false},
       
    }
    

    );
    
    Materiau_primaire.associate=models=>{
        Materiau_primaire.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Materiau_primaire.associate=models=>{
        Materiau_primaire.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Materiau_primaire;
}