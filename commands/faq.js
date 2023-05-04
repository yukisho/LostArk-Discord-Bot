const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `https://reddit.com/r/lostarkgame/comments/a2jnn7/please_read_faq_and_getting_started/`;
const Content2 = ``;
const Content3 = ``;

module.exports.run = async(bot, message, args) => {

    let thisChannel = message.channel.name;
    var channelArray = botconfig.allowedCmdChannels;

    if(channelArray.indexOf(thisChannel) != -1)
    {
        var result = Content1.concat(newLine,Content2,newLine,Content3);
        return message.channel.send(result);
    }
}

module.exports.help = {
    name: 'faq',
    aliases: ["faq"]
}