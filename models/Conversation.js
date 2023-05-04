const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Conversation=sequelize.define("Conversation",
    {  
        user_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        second_user_id:{
            type :DataTypes.INTEGER,
        allowNull:false},
        auth_user:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        auth_second_user:{
            type :DataTypes.VARCHAR(255),
        allowNull:false}
      
   
    }
    

    );
    
    Conversation.associate=models=>{
        Conversation.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    Conversation.associate=models=>{
        Conversation.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Conversation;
}