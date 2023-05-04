const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Dechet=sequelize.define("Dechet",
    {  
        type_dechet:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        prix_unitaire:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        photo:{
            type :DataTypes.VARCHAR(255),
        allowNull:true},
        pourcentage_remise:{
            type :DataTypes.DOUBLE,
        allowNull:false}
      
   
    }
    

    );
    
    Dechet.associate=models=>{
        Dechet.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Dechet.associate=models=>{
        Dechet.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Dechet;
}