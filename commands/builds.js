const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `For class builds, get your class role in <#414113429675048960> by reacting to the correct role emote and check the pinned messages in class discussion channels.`;
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
    name: 'builds',
    aliases: ["builds"]
}