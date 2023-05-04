const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const Locales = require("../utils/locales.js");

module.exports.run = async(bot, message, args) => {
    var thisChannel = message.channel.name;
    var channelArray = botconfig.allowedCmdChannels;
    var Cmds = botconfig.availableCommands;

    //Check if the channel the command is run in is in the array of allowed channels
    if(channelArray.indexOf(thisChannel) != -1)
    {
        var list = "";

        //Populate a list of all commands
        for(var cmd of Cmds)
        {
            list += `.${cmd}\n`;
        }

        //Create the embed with the list of commands
        var embed = new Discord.MessageEmbed()
            .setColor(botconfig.green)
            .setTitle("Commands")
            .addField("Usable", list)
            .setFooter(Locales.Responses.commandsChangeOften);

        message.delete();
        return message.channel.send({embed});
    }
    else
    {
        return message.delete();
    }
}

module.exports.help = {
    name: 'commands',
    aliases: ["commands","cmds"]
}