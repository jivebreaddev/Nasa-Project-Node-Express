const express = require('express');


const getAllPlanets = require('./planets.controller');
const planetRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;