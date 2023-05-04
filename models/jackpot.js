const mongoose = require('mongoose');

const jackpotSchema = mongoose.Schema({
    serverID: String,
    jackpot: Number

})

module.exports = mongoose.model("Jackpot", jackpotSchema);