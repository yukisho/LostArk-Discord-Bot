const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `Check Your Ping On KR - https://cdn.discordapp.com/attachments/453163801475284993/510141222518652929/unknown.png`;
const Content2 = `Check Your ping On RU - https://i.imgur.com/iyg0Qrz.png`;
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
    name: 'ping',
    aliases: ["ping"]
}