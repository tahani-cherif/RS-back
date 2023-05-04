const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Poubelle=sequelize.define("Poubelle",
    {
        nom:{
            type :DataTypes.STRING,
        allowNull:false},
        QRcode:{
            type :DataTypes.STRING,
            allowNull:false},
        type:{
                type :DataTypes.STRING,
                allowNull:false},
    

        etat:{
            type :DataTypes.DOUBLE,
            allowNull:false},
    
    }
    

    );
    Poubelle.associate=models=>{
        Poubelle.belongsTo(models.Bloc_poubelle,{
             onDelete:"cascade"
        })
        
    };
   

    return Poubelle;
}