const { DataTypes } = require('sequelize');
const database = require('.');

const modelName = 'Providers';

const attributes = {
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('food', 'toys'),
    allowNull: false
  },
};

const options = {
  freezeTableName: true,
  tableName: 'providers',
  timestamps: true,
  version: true,
};

module.exports = database.define(modelName, attributes, options);