const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Episodes = db.define('episodes', {
    name: {
        type: DataTypes.STRING(255)
    },
    airdate: {
        type: DataTypes.STRING(255)
    },
    episode: {
        type: DataTypes.STRING(255)
    },
    characterIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
});

Episodes.sync().then(() => {
    console.log('episodes');
});

module.exports = Episodes;
