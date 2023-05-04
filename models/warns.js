const mongoose = require('mongoose');

const warnsSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    userTag: String,
    warnedBy: String,
    modTag: String,
    warning: Number,
    reason: String,
    createdAt: String,
    randomSeed: Number

})

module.exports = mongoose.model("Warns", warnsSchema);