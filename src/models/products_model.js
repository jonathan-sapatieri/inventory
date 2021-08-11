const { DataTypes } = require('sequelize');
const database = require('.');

const modelName = 'Products';

const attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  provider: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: require('./providers_model'),
      key: 'id',
    },
  },
};

const options = {
  freezeTableName: true,
  tableName: 'products',
  timeStamps: true,
  version: true,
};

module.exports = database.define(modelName, attributes, options);
