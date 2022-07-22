const {GetAllPlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, res){
    return res.status(200).json(await GetAllPlanets());
    // return with 200 status code and send back planet json file.
    // explicit with response code
}

module.exports = {
    httpGetAllPlanets
};
