const db = require('../db/index');
const { DataTypes } = require('sequelize');

const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calories: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        tableName: 'Product'
});

module.exports = Product;