const mongoose = require('mongoose');

const ExperienceSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    xp: Number

})

module.exports = mongoose.model("XP", ExperienceSchema);