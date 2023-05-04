const mongoose = require('mongoose');

const kicksSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    userTag: String,
    kickedBy: String,
    modTag: String,
    reason: String,
    createdAt: String,
    randomSeed: Number

})

module.exports = mongoose.model("Kicks", kicksSchema);