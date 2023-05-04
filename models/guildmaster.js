const mongoose = require('mongoose');

const guildmasterSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    postedKR: Boolean,
    postedRU: Boolean

})

module.exports = mongoose.model("GuildMaster", guildmasterSchema);