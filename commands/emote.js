const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `The quest you are stuck on requires you to use an emote in front of the NPC. Please see this guide as a cheat sheet - https://watchgin.com/lost-ark-main-quest-emote-cheat-sheet/`;
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
    name: 'emote',
    aliases: ["emote"]
}