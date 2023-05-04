const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `Left is to do prologue for bunny ears. Right is to skip to class advancement to level 10. https://cdn.discordapp.com/attachments/453172243829096458/510627004832546816/path.JPG`;
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
    name: 'prologue',
    aliases: ["prologue"]
}