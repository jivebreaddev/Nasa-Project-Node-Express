const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000; // cross-env for all platforms
const { loadPlanetsData } = require('./src/models/planets.model');

mongoose.connection.on('open', () => {
    console.log('MONGO DB CONNECTION READY');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});
async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();
// .....