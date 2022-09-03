const _ = require('lodash');
const Characters = require('../models/charactersModel');
const Locations = require('../models/locationModels');
const rick = require("../rick-and-morty.json");

const seedCharacters = async (req, res) => {
    try {
        const locations = await Locations.findAll();
        const characters = [];

        _.map(rick, e => {
            _.map(e.characters, l => {
                characters.push({
                    id: l.id,
                    name: l.name,
                    status: l.status,
                    species: l.species,
                    type: l.type,
                    gender: l.gender,
                    origin: l.origin,
                    locationId: _.find(locations, {name: l.location}).id
                });
            });
        });

        _.map(_.uniqBy(characters, 'id'), async character => await Characters.create(character));

        res.send({ message: 'jenna' });
    } catch (e) {
        console.log(e);
    }
};

const getCharacterList = async (req, res) => {
    try {
        const data = await Characters.findAll();
        const characters = [];

        _.map(data, (character) => characters.push(character.name));

        res.send({ characters: _.uniq(characters) });
    } catch (e) {
        console.log(e);
    }
};

const getSpeciesList = async (req, res) => {
    try {
        const characters = await Characters.findAll();
        const species = [];

        _.map(characters, character => species.push(character.species));

        res.send({ species: _.uniq(species) });
    } catch (e) {
        console.log(e);
    }
};

const getGenderList = async (req, res) => {
    try {
        const data = await Characters.findAll({ where: { gender: req.params.gender }});
        const characters = [];

        _.map(data, character => characters.push(character.name));

        res.send({ characters });
    } catch (e) {
        console.log(e);
    }
};

const getCharactersBySpecies = async (req, res) => {
    try {
        const data = await Characters.findAll({ where: { species: req.params.species }});
        const characters = [];

        _.map(data, character => characters.push(character.name));

        res.send({ characters });
    } catch (e) {
        console.log(e);
    }
};

const createCharacter = async (req, res) => {
    try {
        const { id, name, status, species, type, gender, origin, locationId } = req.body;

        await Characters.create({
            id,
            name,
            status,
            species,
            type,
            gender,
            origin,
            locationId
        });

        res.send({ message: 'jenna' });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    seedCharacters,
    getCharacterList,
    getSpeciesList,
    getGenderList,
    getCharactersBySpecies,
    createCharacter
};
