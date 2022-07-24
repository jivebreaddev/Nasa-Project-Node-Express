const {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    //for (value of launches.values()){...};
    return res.status(200).json(await getAllLaunches());
}
async function httpAddNewLaunch(req, res) {
    //for (value of launches.values()){...};
    // moment module from NPM for dates
    // JSON from client process them in API
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
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

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}
async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    const exist = await existsLaunchWithId(launchId)
    // if launch doesnt' exist
    if (!exist) {
        return res.status(404).json({
            error: "Launch does not extist"
        });
    }
    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        });
    }
    return res.status(200).json(
        {
            ok: true
        }
    );

}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}
