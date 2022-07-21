const {
    launchesModel,
    addNewLaunch
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    //for (value of launches.values()){...};
    return res.status(200).json(launchesModel.getAllLaunches());
}
function httpAddNewLaunch(req, res) {
    //for (value of launches.values()){...};
    // moment module from NPM for dates
    // JSON from client process them in API
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);


    addNewLaunch(launch);
    return res.status(201).json(launch);
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}
