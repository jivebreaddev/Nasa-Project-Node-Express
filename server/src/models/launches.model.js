const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
// const launches = new Map(); // this will need to stay in db.

const DEFAULT_FLIGHT_NUMBER = 100;
// How to keep referential Integrity when the values are not right
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('Decemeber 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM','NASA'],
    upcoming: true,
    success: true,
};
saveLaunch(launch);
// get the highest flight number
async function getLatestFlightNumber(){
    const latestLaunch = await launches
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches(){
    return await launches.find({}, {'_id': 0, '__v': 0});
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        kepler_name: launch.target,
    });
    // how do we signal error from data access layer???
    if (!planet){
        throw new Error('No matching planet is found');
    }
    await launches.updateOne({
        flightNumber: launch.flightNumber,
    }, launch,{
        upsert: true,
    })
}// filter using first arg, second insert and thirt upsert args
function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            customers: ['Zero to Matery', 'NASA'],
            upcoming: true,
            success: true,
            flightNumber: latestFlightNumber,

    }));
}

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);

    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
};

