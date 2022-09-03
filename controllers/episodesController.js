const _ = require('lodash');
const moment = require('moment');
const Episodes = require('../models/episodesModel');
const Characters = require('../models/charactersModel');
const Locations = require('../models/locationModels');
const rick = require('../rick-and-morty.json');

const seedEpisodes = async (req, res) => {
    try {
        const episodes = [];

        const cIds = (characters) => {
            const ids = [];
            _.map(characters, character => ids.push(character.id));

            return ids;
        }

        _.map(rick, episode => {
            episodes.push({
                name: episode.name,
                episode: episode.episode,
                airdate: episode.air_date,
                characterIds: cIds(episode.characters)
            })
        });

        _.map(episodes, async episode => await Episodes.create(episode));

        res.send({message: 'jenna'});
    } catch (e) {
        console.log(e);
    }
}

const getEpisodeList = async (req, res) => {
    try {
        const data = await Episodes.findAll();
        const characters = await Characters.findAll();
        const locations = await Locations.findAll();

        _.map(characters, character => character.locationId = _.find(locations, { id: character.locationId }).name)
        _.map(data, episode => episode.characterIds = _.map(episode.characterIds, c => _.find(characters, { id: c })))

        res.send({ data })
    } catch (e) {
        console.log(e);
    }
};

const getSeasonsList = async (req, res) => {
    try {
        const data = await Episodes.findAll();
        const seasons = [];

        _.map(data, episode => seasons.push(episode.episode.slice(0,3)));

        res.send({ seasons: _.uniq(seasons) });
    } catch (e) {
        console.log(e);
    }
};

const getDateList = async (req, res) => {
    try {
        const { x, y } = req.query;
        const data = await Episodes.findAll();
        const episodes = [];

        _.map(data, episode => {
            if (moment(episode.airdate).format() > moment(x).format() && moment(episode.airdate).format() < moment(y).format()) {
                episodes.push({
                    name: episode.name,
                    airdate: episode.airdate
                });
            }
        });

        res.send({ episodes });
    } catch (e) {
        console.log(e);
    }
};

const getEpisodeByCharacter = async (req, res) => {
    try {
        const data = await Episodes.findAll();
        const episodes = [];

        _.map(data, episode => {
            if (_.includes(episode.characterIds, _.parseInt(req.params.character))) {
                episodes.push(episode.name);
            }
        });

        res.send({ episodes })
    } catch (e) {
        console.log(e);
    }
};

const createEpisode = async (req, res) => {
    try {
        const { name, airdate, episode, characterIds } = req.body;

        await Episode.create({
            name,
            airdate,
            episode,
            characterIds
        });

        res.send({ message: 'jenna' });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    seedEpisodes,
    getEpisodeList,
    getSeasonsList,
    getDateList,
    getEpisodeByCharacter,
    createEpisode
}
