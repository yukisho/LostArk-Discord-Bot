const Commands = require("../models/commands.js");
const botconfig = require("../botconfig.json");

module.exports.run = async(bot, message, args) => {

    let channelName = message.channel.name;
    var channelArray = botconfig.allowedCmdChannels;

    if(channelArray.indexOf(channelName) === -1)
    {
        let input = message.content;
        input =  input.substr(1);

        Commands.findOne({
            name: input
            }, (err, commands) => {
            if(err) console.log(err);

            if(!commands)
            {
                return results = message.channel.send("Error #1500 - Could not find that command.");
            }
            else
            {
                results = commands.content1;
                return message.channel.send(results);
            }
        });
    }
}

module.exports.help = {
    name: 'demo',
    aliases: ["demo"]
}