const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Zone_travail=sequelize.define("Zone_travail",
    {  
        region:{
            type :DataTypes.STRING,
            allowNull:false},
        code_postal:{
            type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('code_postal').split(';')
        },
        set(val) {
           this.setDataValue('code_postal',val.join(';'));
        },},
            quantite_total_collecte_plastique:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_total_collecte_composte:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_total_collecte_papier:{
            type :DataTypes.DOUBLE,
        allowNull:false},
        quantite_total_collecte_canette:{
            type :DataTypes.DOUBLE,
        allowNull:false},
    }
    

    );
    
   
    Zone_travail.associate=models=>{
        Zone_travail.hasMany(models.Camion,{
             onDelete:"cascade"
        });
    };
    Zone_travail.associate=models=>{
        Zone_travail.hasMany(models.Etablissement,{
          
             onDelete:"cascade"
        })
        
    };
    Zone_travail.associate=models=>{
        Zone_travail.hasMany(models.Zone_depot,{
          
             
        })
        
    };

    return Zone_travail;
}