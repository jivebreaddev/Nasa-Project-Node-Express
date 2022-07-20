const express = require('express');

const planetRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;