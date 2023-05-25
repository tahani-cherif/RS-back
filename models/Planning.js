const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Planning=sequelize.define("Planning",
    {  
        
        Subject:{
            type :DataTypes.STRING,
            allowNull:false},
            StartTime:{
            type :DataTypes.DATE,
        allowNull:false},
        EndTime:{
            type :DataTypes.DATE,
            allowNull:false},
        validation:{
            type :DataTypes.DOUBLE,
            allowNull:false},
        statut:{
            type :DataTypes.STRING,
            allowNull:false},
      
        type_poubelle:{
            type :DataTypes.STRING,
            allowNull:false},
        
    }
    

    );
    
    Planning.associate=models=>{
        Planning.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        Planning.belongsTo(models.Camion,{
            onDelete:"cascade"
       })
        
    };
    

    return Planning;
}