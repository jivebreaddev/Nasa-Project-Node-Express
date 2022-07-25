const express = requireE('express');

const planetsRouter = require('./planets/planets.router')
const launchesRouter = require('./launches/launches.router')

const api = express.Router();

app.use('/planets', planetsRouter);
app.use('/launch', launchesRouter);

module.exports = api;