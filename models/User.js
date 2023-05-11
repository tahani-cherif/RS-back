const { sequelize } = require("sequelize");
const bcrypt = require('bcryptjs');
module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("User",
    {
        name:{
            type :DataTypes.STRING,
        allowNull:false},
    

        email:{
            type :DataTypes.STRING,
            allowNull:false},
    
    
        password:{
            type :DataTypes.STRING,
            allowNull:false,
        },
        passwordChangedAt:{
            type :DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        profileImg:{
            type :DataTypes.STRING,
            allowNull:true,
        },
        phone:{
            type :DataTypes.STRING,
            allowNull:true,
        },
        role:{
                type :DataTypes.STRING,
                allowNull:true
            }
        },  { 
            sequelize, 
            modelName: 'User',
            hooks: {
              beforeCreate: async (user, options) => {
                const hashedPassword = await bcrypt.hash(user.password, 12);
                user.password = hashedPassword;
              }
            }
    },
        
    

    );
    
    return User;
}