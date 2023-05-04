const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("User",
    {
        username:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
    

        email:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
    
    
        password:{
            type :DataTypes.VARCHAR(255),
            allowNull:false}
        }
    

    );
    User.associate=models=>{
        User.hasMany(models.Product,{
             onDelete:"cascade"
        })
        
    };
    User.associate=models=>{
        User.hasOne(models.Profil,{
             onDelete:"cascade"
        })
        
    };
    return User;
}