const botconfig = require("../botconfig.json");
const cmdResponses = require("../utils/cmdResponses.js");

module.exports.run = async(bot, message, args) => {
    
    let channelName = message.channel.name;
    var channelArray = botconfig.allowedCmdChannels;

    if(channelArray.indexOf(channelName) === -1)
    {
        message.channel.send(cmdResponses.faqru());
    }
}

module.exports.help = {
    name: 'faqru',
    aliases: ["faqru"]
}