const Functions = require("../functions.js");

module.exports.run = async(bot, message, args) => {
    var cc = new Date("02/13/2030 12:00 AM");
    var c = new Date();
    var time = Functions.timeDifference(cc, c);
    message.channel.send(`Time Until Lost Ark Western Release - ${time}`);
}

module.exports.help = {
    name: 'western',
    aliases: ["western"]
}