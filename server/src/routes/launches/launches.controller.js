const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    //for (value of launches.values()){...};
    return res.status(200).json(await getAllLaunches());
}
function httpAddNewLaunch(req, res) {
    //for (value of launches.values()){...};
    // moment module from NPM for dates
    // JSON from client process them in API
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate){
        return res.status(400).json({
            error: "Missing required launch property",
        });
    }
    // adding validation for post ops

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}
function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);

    // if launch doesnt' exist
    if (!existsLaunchWithId(launchId)){
    return res.status(404).json({
        error: "Launch does not extist"
    });
    }
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);

}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}
