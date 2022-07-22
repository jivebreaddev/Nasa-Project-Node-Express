const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    kepler_name: {
        type: String,
        required: true,
    }

});
// connects lauches shcema with the lauches collection
module.exports = mongoose.model('Planet', planetSchema);