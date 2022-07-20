const express = require('express');

const planetsRouter = require('./routes/planets/planets.router')
const app = express();

app.use(express.json()); // parse any json data
app.use(planetsRouter);

module.exports = app;