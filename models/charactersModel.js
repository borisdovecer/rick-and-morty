const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Characters = db.define('characters', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255)
    },
    status: {
        type: DataTypes.STRING(255)
    },
    species: {
        type: DataTypes.STRING(255)
    },
    type: {
        type: DataTypes.STRING(255)
    },
    gender: {
        type: DataTypes.STRING(255)
    },
    origin: {
        type: DataTypes.STRING(255)
    },
    locationId: {
        type: DataTypes.INTEGER
    }
});

Characters.sync().then(() => {
    console.log('characters');
});

module.exports = Characters;
