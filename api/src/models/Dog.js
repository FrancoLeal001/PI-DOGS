const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      //UUID: crea un id unico con letras y numeros que no se va a repetir
type:DataTypes.UUID,
defaultValue: DataTypes.UUIDV4,
//allownull: puede estar vacio (false: no puede estar vacio)
allowNull: false, 
primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
type: DataTypes.STRING,

    },
    altura_minima:{
      type: DataTypes.STRING,
      
    },
    altura_maxima:{
      type: DataTypes.STRING,
      
    },
    peso_minimo:{
      type: DataTypes.STRING,
     
    },
    peso_maximo:{
      type: DataTypes.STRING,
      
    },
    Años_de_Vida:{
      type: DataTypes.STRING,
     
    },
 createdInDb:{
  type:DataTypes.BOOLEAN,
  allowNull:false,
  defaultValue:true
 }

  });
};
