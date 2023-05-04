const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Product=sequelize.define("Product",
    {
        name:{
            type :DataTypes.VARCHAR(255),
        allowNull:false}
    ,
        price:{
            type :DataTypes.VARCHAR(255),
            allowNull:false}
    ,
        description:{
            type :DataTypes.VARCHAR(255),
            allowNull:false}
    },

    );
    Product.associate=models=>{
        Product.belongsTo(models.User,{
             onDelete:"cascade"
        })
        
    };

        
    return Product;
}