const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
    name: String,
    rolename: String,
    selfAssign: Boolean,
    alias: Array

})

module.exports = mongoose.model("Roles", rolesSchema);