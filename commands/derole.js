const Discord = require("discord.js");
const Roles = require("../models/roles.js");
const botconfig = require("../botconfig.json");

module.exports.run = async(bot, message, args) => {
    
    let sender = message.member.user;
    let channelName = message.channel.name;
    var channelArray = botconfig.allowedCmdChannels;

    if(args[0] === "help" || !args[0])
    {
        if(!args[1])
        {
            if (channelArray.indexOf(channelName) != -1)
            {
                message.reply("Usage: .derole <role name>");
                message.reply("Example for Soul Master: .derole Soul Master");
                return message.delete();
            }
        }
    }

    //Actually adding roles to users
    if (channelArray.indexOf(channelName) != -1)
    {
        ////Functions

        //Uppercase the first letter of each word
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        //Convert the entire string to lowercase
        function lowerCaseAllWords(string) {
            return string.replace(/\w\S*/g, function (word) {
                return word.charAt(0) + word.slice(1).toLowerCase();
            });
        }

        //let roleName = roleFile[msg].name;
        rawName = args.join(" ").slice(0);
        let lowName = lowerCaseAllWords(rawName);
        let tempName = toTitleCase(lowName);

        Roles.findOne({
            name: tempName
            }, (err, roles) => {
            if(err) console.log(err);
            if(!roles)
            {
                //Role was not found in the database
                message.delete();
                return sender.send(`${sender}, I wasn't able to find the role ${rawName}, that role may not exist. Please check your spelling try again.`);
            }
            else if(roles)
            {
                //
                let roleName = roles.rolename;
                let role = message.guild.roles.find(r => r.name === roleName);
                if(!roleName) return sender.send(`${sender}, I wasn't able to find the role ${roleName}, that role may not exist. Please try again.`);
                if(role === "Guild Master") return sender.send(`${sender}, You cannot remove that role from yourself.`);
                if(role === "Community Helpers") return sender.send(`${sender}, You cannot remove that role from yourself.`);
                if(role === "Content Creators") return sender.send(`${sender}, You cannot remove that role from yourself.`);
                if(!role) return sender.send(`${sender}, I wasn't able to find the role ${roleName}, roles are case-sensitive and must be in lower case.`);

                //If the channel the message was made in is not the roleChannel then DM the user and delete their message
                if(message.member.roles.has(role.id))
                {
                    message.member.removeRole(role.id).catch(console.error);
                    sender.send(`${sender}, the role ${roleName} has been removed. Magic.`)
                    return message.delete();
                }
            }
        });
    }
    else
    {
        sender.send(`${sender}, This is not the right place for that. Try <#414113429675048960> instead. I think you'll like that much much more.`);
        return message.delete();
    }
}

module.exports.help = {
    name: "derole",
    aliases: ["derole"]
}