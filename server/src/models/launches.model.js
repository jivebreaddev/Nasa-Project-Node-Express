const launches = new Map(); // this will need to stay in db.

let latestFlightNumber = 100;
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

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
    return Array.from(launches.values());
}
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

