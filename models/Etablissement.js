const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Etablissement=sequelize.define("Etablissement",
    {  
      
            gouvernorat:{
            type :DataTypes.STRING,
            allowNull:false},

            delegation:{
            type :DataTypes.STRING,
        allowNull:false},

        localite:{
            type :DataTypes.STRING,
        allowNull:false},
        
        code_postal:{
            type :DataTypes.INTEGER,
        allowNull:false},


        nom_etablissement:{
            type :DataTypes.STRING,
        allowNull:false},

        niveau_etablissement:{
            type :DataTypes.STRING,
        allowNull:false},

        type_etablissement:{
            type :DataTypes.STRING,
        allowNull:false},

        nbr_personnes:{
            type :DataTypes.INTEGER,
        allowNull:true},

      

        adresse:{
            type :DataTypes.STRING,
        allowNull:false},

        longitude:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        latitude:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        etablissementImg:{
            type :DataTypes.STRING,
            allowNull:true,
        },

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
        allowNull:false},
       
   
    }
    

    );
    
    
   
    Etablissement.associate=models=>{
            Etablissement.belongsTo(models.Zone_travail,{
               
            })
            
            Etablissement.belongsTo(models.Camion,{
            })
            
            Etablissement.hasMany(models.Revenu,{
                onDelete:"cascade"
           });
       
            Etablissement.hasMany(models.Bloc_etablissement,{
                onDelete: 'SET NULL'
            });
        
        Etablissement.hasMany(models.Planning,{
             onDelete:"cascade"
        });
        Etablissement.hasMany(models.Vider_poubelle,{
            onDelete:"cascade"
       });

        
    };
        
    

    return Etablissement;
}