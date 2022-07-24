const http = require('http');

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000; // cross-env for all platforms
const { loadPlanetsData } = require('./src/models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();
// .....