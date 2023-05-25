const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Dechet=sequelize.define("Dechet",
    {  
        type_dechet:{
            type :DataTypes.STRING,
            allowNull:false,
            unique: true},
        prix_unitaire:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        
        prixApresPromotion:{
            type :DataTypes.DOUBLE,
        allowNull:false}
    }
    );
    
    
    // Dechet.associate=models=>{
    //     Dechet.hasMany(models.Depot,{
    //          onDelete:"cascade"
    //     });
    // };
    // Dechet.associate=models=>{
    //     Dechet.hasOne(models.Rating_dechet,{
    //          onDelete:"cascade"
    //     });
    // };

    return Dechet;
}