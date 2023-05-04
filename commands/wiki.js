const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `Lost Ark Wiki - https://lostark.gamepedia.com/`;
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
    name: 'wiki',
    aliases: ["wiki"]
}