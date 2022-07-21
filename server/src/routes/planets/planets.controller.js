const {GetAllPlanets} = require('../../models/planets.model');

function httpGetAllPlanets(req, res){
    return res.status(200).json(GetAllPlanets());
    // return with 200 status code and send back planet json file.
    // explicit with response code
}

module.exports = {
    httpGetAllPlanets
};
