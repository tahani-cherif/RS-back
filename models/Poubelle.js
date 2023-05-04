const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Poubelle=sequelize.define("Poubelle",
    {
        nom:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        QRcode:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        type:{
                type :DataTypes.VARCHAR(255),
                allowNull:false},
    

        etat:{
            type :DataTypes.DOUBLE,
            allowNull:false},
    
    }
    

    );
    Poubelle.associate=models=>{
        Poubelle.belongsTo(models.Bloc_etablissement,{
             onDelete:"cascade"
        })
        
    };
   

    return Poubelle;
}