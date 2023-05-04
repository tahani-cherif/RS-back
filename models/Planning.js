const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Planning=sequelize.define("Planning",
    {  
        etablissement_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        jour:{
            type :DataTypes.DATETIME,
            allowNull:false},
        start:{
            type :DataTypes.DATETIME,
        allowNull:false},
        end:{
            type :DataTypes.DATETIME,
            allowNull:false},
        validation:{
            type :DataTypes.DOUBLE,
            allowNull:false},
        statut:{
            type :DataTypes.VARCHAR(255),
            allowNull:false},
        date_collecte:{
            type :DataTypes.DATETIME,
            allowNull:false},
        type_poubelle:{
            type :DataTypes.VARCHAR(255),
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
    Planning.associate=models=>{
        Planning.hasMany(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Planning;
}