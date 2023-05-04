const mongoose = require('mongoose');

const mutesSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    userTag: String,
    mutedBy: String,
    modTag: String,
    reason: String,
    time: Number,
    createdAt: String,
    randomSeed: Number

})

module.exports = mongoose.model("Mutes", mutesSchema);