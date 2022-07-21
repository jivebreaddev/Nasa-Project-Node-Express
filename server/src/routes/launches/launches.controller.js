const {
    getAllLaunches,
    addNewLaunch
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    //for (value of launches.values()){...};
    return res.status(200).json(getAllLaunches());
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


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}
