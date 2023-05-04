const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `The main international community server for the KR version is *실리안-Sillian*.`;
const Content2 = `The main community server for the RU version is *сирион-Sirion*.`;
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
    name: 'server',
    aliases: ["server"]
}