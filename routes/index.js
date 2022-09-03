const express = require('express');
const router = express.Router();

const { seedEpisodes, getEpisodeList, getSeasonsList, getDateList, getEpisodeByCharacter, createEpisode } = require('../controllers/episodesController');
const { seedCharacters, getCharacterList, getSpeciesList, getGenderList, getCharactersBySpecies, createCharacter } = require('../controllers/charactersController');
const { seedLocations, getLocationList } = require('../controllers/locationsController');

// episodes
router.get('/seed-episodes', seedEpisodes);
router.get('/episodes', getEpisodeList);
router.get('/seasons', getSeasonsList);
router.get('/episodes/:character', getEpisodeByCharacter);
router.get('/dates', getDateList);
router.post('/create-episode', createEpisode);

// characters
router.get('/seed-characters', seedCharacters);
router.get('/characters', getCharacterList);
router.get('/species', getSpeciesList);
router.get('/characters/:gender', getGenderList);
router.get('/characters-by-species/:species', getCharactersBySpecies);
router.post('/create-character', createCharacter);

// locations
router.get('/seed-locations', seedLocations);
router.get('/locations', getLocationList);

module.exports = router;
