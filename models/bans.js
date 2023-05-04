const mongoose = require('mongoose');

const bansSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    userTag: String,
    bannedBy: String,
    modTag: String,
    reason: String,
    createdAt: String,
    randomSeed: Number

})

module.exports = mongoose.model("Bans", bansSchema);