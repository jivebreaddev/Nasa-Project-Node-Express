const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
// const launches = new Map(); // this will need to stay in db.
const axios = require('axios');
const DEFAULT_FLIGHT_NUMBER = 100;
// How to keep referential Integrity when the values are not right
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

async function getAllLaunches(skip, limit) {
    return await launches.find({}, { '_id': 0, '__v': 0 })
    .sort({flightNumber: 1 })
    .skip(skip)
    .limit(limit);
    // Pagination implementing
}

async function saveLaunch(launch) {

    // when used update one it will return h $setOnInsert when upsert op is done.
    await launches.findOneandUpdate({
        flightNumber: launch.flightNumber,
    }, launch, { // here launch object will be updated with $setOnInsert when upsert op is done.
        upsert: true,
    })
}// filter using first arg, second insert and thirt upsert args

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        kepler_name: launch.target,
    });
    // how do we signal error from data access layer???
    if (!planet) {
        throw new Error('No matching planet is found');
    }
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

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches(){
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });

    if (response.status !== 200){
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        //flatMap() -> flat the array and call callback function and flat the results again
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission : launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers
        }
    }

    console.log(`${launch.flightNumber}`)

    //TODO
    await saveLaunch(launch);

}
async function loadLaunchesData(){
    await findLaunch({
        flightNumber: 1,
    })
    if (firstLaunch){
        console.log('Launch data already loaded');
        return;
    } else{
        populateLaunches();
    }
}

async function findLaunch(filter) {
    return await launches.findOne(filter);
}
async function abortLaunchById(launchId) {

    const aborted = await findLaunch({
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
    abortLaunchById,
    loadLaunchesData
}; 

/*
mapping corresponding spaceAPI values to 
database values
SPACE API     | 
flight_number | flightNumber
success       | success
mission       | name
rocket.name   | rocket
date_local    | launchDate
upcoming      | upcoming
payload.customers | customers
*/

