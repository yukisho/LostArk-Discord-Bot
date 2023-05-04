const mongoose = require('mongoose');

const copperSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    copper: Number

})

module.exports = mongoose.model("Copper", copperSchema);