const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Stock=sequelize.define("Stock",
    {
        type_poubelle:{
            type :DataTypes.VARCHAR(255),
        allowNull:false},
    

        quantite:{
            type :DataTypes.INTEGER,
            allowNull:false},
    
    }
    

    );

    return Stock;
}