const newLine = "\n\n";
const Content1 = `For people to check gear and builds from the top players, https://loahae.com/ranking/ (Use google translate)`;
const Content2 = ``;
const Content3 = ``;
const botconfig = require("../botconfig.json");

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
    name: 'rankings',
    aliases: ["rankings"]
}