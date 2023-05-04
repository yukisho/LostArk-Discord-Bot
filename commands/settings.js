const newLine = "\n\n";
const Content1 = `All Settings UI Translated - https://drive.google.com/file/d/1BjD373VEuMsjfAmVwRHXXX5GaW2yUnDa/view`;
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
    name: 'settings',
    aliases: ["settings"]
}