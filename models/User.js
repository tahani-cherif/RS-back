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
            },
            qrCode:{
                type :DataTypes.STRING,
                allowNull:true
            }
        },
        
        { 
            sequelize, 
            modelName: 'User',
            hooks: {
              beforeCreate: async (user, options) => {
                const hashedPassword = await bcrypt.hash(user.password, 12);
                user.password = hashedPassword;
                

              },
              afterCreate: async (user, options) => {
                const hashedId = await bcrypt.hash(user.id.toString(), 12);
                user.qrCode = hashedId;
                

              },
              
              
             
              
            }
    },
        
    

    );

    User.associate=models=>{
        User.belongsTo(models.Camion,{
            allowNull:true
        })
        User.belongsTo(models.Etablissement,{
            allowNull:true
        })
      
       
        
    };
    
    return User;
}