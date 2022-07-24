const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const api = require('./routes/api');
const app = express();

app.use(cors({
    origin: 'http://localhost:8000'
}));
app.use(morgan('combined'));

app.use(express.json()); // parse any json data
app.use(express.static(path.join(__dirname, 'public')));


app.use('./v1',api);

//matches any endpoint to index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app;