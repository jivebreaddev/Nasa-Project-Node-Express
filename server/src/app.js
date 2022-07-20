const express = require('express');

const app = express();

app.use(express.json()); // parse any json data

module.exports = app;