const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000; // cross-env for all platforms
const { loadPlanetsData } = require('./src/models/planets.model');

async function startServer(){
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();
// .....