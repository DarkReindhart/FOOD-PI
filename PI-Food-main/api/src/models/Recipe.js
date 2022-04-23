const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', { 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER
    },
    healtScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.TEXT // o ARRAY? ver que es mejor. 
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isURL: true,
        isValidFormat(value){
          let validate1 = value.split(".")
          let finalValidator = validate1[validate1.length - 1]
          const imageTypes = ["jpg", "jpeg", "gif", "png"]

          if(!imageTypes.includes(finalValidator)){
            throw new Error(' El formato de imagen no es válido.')
          }
        }
      }
    }
   }, {timestamps: true});
};