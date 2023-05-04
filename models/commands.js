const mongoose = require('mongoose');

const commandsSchema = mongoose.Schema({
    name: String,
    content1: String,
    content2: String,
    content3: String
})

module.exports = mongoose.model("Commands", commandsSchema);