const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Revenu=sequelize.define("Revenu",
    {  
       
        
            date:{
            type :DataTypes.DATE,
            allowNull:false},
            quantite_plastique_menusel:{
            type :DataTypes.DOUBLE,
            allowNull:false},
            quantite_papier_menusel:{
            type :DataTypes.DOUBLE,
            allowNull:true},
       
            quantite_composte_menusel:{
            type :DataTypes.DOUBLE,
            allowNull:false},
            quantite_canette_menusel:{
            type :DataTypes.DOUBLE,
            allowNull:false},
            revenu_total:{
            type :DataTypes.DOUBLE,
            allowNull:false},
            revenu_gestionnaire:{
            type :DataTypes.DOUBLE,
            allowNull:false},
            revenu_responsable:{
                type :DataTypes.DOUBLE,
                allowNull:false},
       
        
   
    }
    

    );
    
    Revenu.associate=models=>{
        Revenu.belongsTo(models.Etablissement,{
             onDelete:"cascade"
        })
        
    };

    return Revenu;
}