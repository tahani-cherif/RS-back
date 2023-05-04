const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Reparateur_poubelle=sequelize.define("Reparateur_poubelle",
    {  
        poubelle_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            reparateur_poubelle_id:{
            type :DataTypes.INTEGER,
            allowNull:false},
            image_panne_poubelle:{
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
            allowNull:false},
        
    }
    

    );
    
 
    
    Reparateur_poubelle.associate=models=>{
        Reparateur_poubelle.belongsTo(models.Poubelle,{
             onDelete:"cascade"
        });
    };

    return Reparateur_poubelle;
}