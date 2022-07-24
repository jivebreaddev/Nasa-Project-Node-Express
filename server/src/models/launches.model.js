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
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};
saveLaunch(launch);
// get the highest flight number
async function getLatestFlightNumber() {
    const latestLaunch = await launches
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launches.find({}, { '_id': 0, '__v': 0 });
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        kepler_name: launch.target,
    });
    // how do we signal error from data access layer???
    if (!planet) {
        throw new Error('No matching planet is found');
    }
    // when used update one it will return h $setOnInsert when upsert op is done.
    await launches.findOneandUpdate({
        flightNumber: launch.flightNumber,
    }, launch, { // here launch object will be updated with $setOnInsert when upsert op is done.
        upsert: true,
    })
}// filter using first arg, second insert and thirt upsert args

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Master',],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch);
}



async function existsLaunchWithId(launchId) {
    return await launches.findOne({
        flightNumber: launchId,
    });
}

async function abortLaunchById(launchId) {

    const aborted = await launches.updateOne({
        flightNumber: launchId,
    },
        {
            upcoming: false,
            success: false,
        })

    return aborted.modifiedCount === 1;
}
module.exports = {
    getAllLaunches,
    existsLaunchWithId,
    scheduleNewLaunch,
    abortLaunchById
}; 

