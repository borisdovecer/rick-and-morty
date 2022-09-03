const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Locations = db.define('locations', {
    name: {
        type: DataTypes.STRING(255)
    }
});

Locations.sync().then(() => {
    console.log('locations');
});

module.exports = Locations;
