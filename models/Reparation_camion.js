const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Reparation_camion=sequelize.define("Reparation_camion",
    {  
        camion_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
        mecanicien_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            image_panne_camion:{
            type :DataTypes.STRING,
            allowNull:false},
            description_panne:{
            type :DataTypes.STRING,
            allowNull:true},
            cout:{
            type :DataTypes.DOUBLE,
            allowNull:true},
            date_debut_reparation:{
            type :DataTypes.DATE,
            allowNull:false},
            date_fin_reparation:{
            type :DataTypes.DATE,
            allowNull:false}
       
        
   
    }
    

    );
    
    Reparation_camion.associate=models=>{
        Reparation_camion.belongsTo(models.Reparation_poubelle,{
             onDelete:"cascade"
        })
        
    };
    Reparation_camion.associate=models=>{
        Reparation_camion.hasOne(models.Camion,{
             onDelete:"cascade"
        });
    };

    return Reparation_camion;
}