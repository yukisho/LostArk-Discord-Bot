Locales = require("../utils/locales.js");

module.exports.run = async(bot, message, args) => {
    message.member.send(Locales.Responses.rolesCmdDoesntExist);
    return message.delete();
}

module.exports.help = {
    name: 'role',
    aliases: ["role", "roles", "derole"]
}