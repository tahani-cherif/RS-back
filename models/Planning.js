const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Planning=sequelize.define("Planning",
    {  
        etablissement_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        jour:{
            type :DataTypes.DATE,
            allowNull:false},
        start:{
            type :DataTypes.DATE,
        allowNull:false},
        end:{
            type :DataTypes.DATE,
            allowNull:false},
        validation:{
            type :DataTypes.DOUBLE,
            allowNull:false},
        statut:{
            type :DataTypes.STRING,
            allowNull:false},
        date_collecte:{
            type :DataTypes.DATE,
            allowNull:false},
        type_poubelle:{
            type :DataTypes.STRING,
            allowNull:false},
        id_ouvrier:{
            type :DataTypes.INTEGER,
        allowNull:false},
        
   
    }
    

    );
    
    Planning.associate=models=>{
        Planning.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };
    

    return Planning;
}