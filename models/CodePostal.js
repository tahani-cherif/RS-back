const { sequelize } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const CodePostal=sequelize.define("CodePostal",
    {  
      
            code_postal:{
            type :DataTypes.INTEGER,
            allowNull:false},

           
   
    }
    

    );
    
    
   
    CodePostal.associate=models=>{
            CodePostal.belongsTo(models.Zone_travail,{
                onDelete: 'SET NULL'
               
            })
            

        
    };
        
    

    return CodePostal;
}