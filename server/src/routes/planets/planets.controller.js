const planets = require('../../models/planets.model');

function getAllPlanets(req, res){
    return res.status(200).json(planets);
    // return with 200 status code and send back planet json file.
    // explicit with response code
}

modules.exports = {
    getAllPlanets
};
