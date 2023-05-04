const mongoose = require('mongoose');

const streamersSchema = mongoose.Schema({
    streamerName: String,
    streamerGame: String,
    islive: Boolean
})

module.exports = mongoose.model("Streamers", streamersSchema);