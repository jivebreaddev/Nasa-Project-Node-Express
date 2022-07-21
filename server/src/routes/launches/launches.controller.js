const launchesModel = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    //for (value of launches.values()){...};
    return res.status(200).json(launchesModel.getAllLaunches());
}

module.exports = {
    httpGetAllLaunches
}
