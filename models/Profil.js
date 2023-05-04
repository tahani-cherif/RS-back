const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Profil=sequelize.define("Profil",
    {
        firstname:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        lastname:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
            country:{
                type :DataTypes.VARCHAR(255),
                allowNull:false}
    },


    );
    Profil.associate=models=>{
        Profil.belongsTo(models.User,{
             onDelete:"cascade"
        })
        
    };
 
    return Profil;
}