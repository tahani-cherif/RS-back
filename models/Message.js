const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Message=sequelize.define("Message",
    {  
        user_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            conversation_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            body:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
        read:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
    }
    

    );
    
    Message.associate=models=>{
        Message.belongsTo(models.Conversation,{
             onDelete:"cascade"
        })
        
    };
 

    return Message;
}