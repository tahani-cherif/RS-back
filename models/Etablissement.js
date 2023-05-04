const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Etablissement=sequelize.define("Etablissement",
    {  
        zone_travail_id:{
            type :DataTypes.INTEGER,
            allowNull:false},

            gouvernorat:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},

            delegation:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},

        localite:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},

        code_postal:{
            type :DataTypes.INTEGER,
        allowNull:false},

        camion_id:{
            type :DataTypes.INTEGER,
        allowNull:false},

        nom_etablissement:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},

        niveau_etablissement:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},

        type_etablissement:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},

        nbr_personnes:{
            type :DataTypes.INTEGER,
        allowNull:true},

        url_map:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},

        adresse:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},

        longitude:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        latitude:{
            type :DataTypes.DOUBLE,
        allowNull:false},

        quantite_dechets_plastique:{
            type :DataTypes.DOUBLE,
        allowNull:false},

        quantite_dechets_composte:{
            type :DataTypes.DOUBLE,
        allowNull:false}
        ,

        quantite_dechets_papier:{
            type :DataTypes.DOUBLE,
        allowNull:false},

        quantite_dechets_canette:{
            type :DataTypes.DOUBLE,
        allowNull:false},

        quantite_plastique_mensuel:{
            type :DataTypes.DOUBLE,
        allowNull:false},

        quantite_composte_mensuel:{
            type :DataTypes.DOUBLE,
        allowNull:false},

        quantite_papier_mensuel:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_canette_mensuel:{
            type :DataTypes.DOUBLE,
        allowNull:false}
   
    }
    

    );
    
    Etablissement.associate=models=>{
        Etablissement.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Etablissement.associate=models=>{
        Etablissement.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Etablissement;
}