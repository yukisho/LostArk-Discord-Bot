const mongoose = require('mongoose');

const jackpotSchema = mongoose.Schema({
    serverID: String,
    entry: String

})

module.exports = mongoose.model("Entries", jackpotSchema);