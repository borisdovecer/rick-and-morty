const _ = require('lodash');
const Locations = require('../models/locationModels');
const rick = require("../rick-and-morty.json");

const seedLocations = async (req, res) => {
    try {
        const locations = [];

        _.map(rick, episode => {
            _.map(episode.characters, character => locations.push(character.location));
        });

        _.map(_.uniq(locations), async location => await Locations.create({name: location}));

        res.send({message: 'jenna'});
    } catch (e) {
        console.log(e);
    }
};

const getLocationList = async (req, res) => {
    try {
        const data = await Locations.findAll();
        res.send({ data });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    seedLocations,
    getLocationList
};
