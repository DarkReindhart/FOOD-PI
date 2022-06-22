const { DataTypes } = require('sequelize');
const imgRegEX = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', { 
    id: {
      type: DataTypes.STRING,
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
      // allowNull: false
    },
    score: {
      type: DataTypes.INTEGER
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    steps: {
      type: DataTypes.TEXT
    },
    dishType: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://theiriejerk.ca/wp-content/uploads/2018/03/no-image.jpg",
      validate: {
        isURL: true,
        isValidFormat(value){
          if(value.match(imgRegEX) === null){
            throw new Error(' El formato de imagen no es válido.')
          }
        }
      }
    }
   }, {timestamps: true});
};