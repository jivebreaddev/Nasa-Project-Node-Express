const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const planetsRouter = require('./src/routes/planets/planets.router')
const launchesRouter = require('./src/routes/launches/launches.router')
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));

app.use(express.json()); // parse any json data
app.use(express.static(path.join(__dirname,'public')));
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

//matches any endpoint to index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))
})

module.exports = app;