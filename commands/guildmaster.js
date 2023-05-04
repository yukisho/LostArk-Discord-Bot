const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const Locales = require("../utils/locales.js");
const Functions = require("../functions.js");
const botconfig = require("../botconfig.json");

module.exports.run = async(bot, message, args) => {
    //
    //.guildmaster @andrew#1234
    
    let channelName = message.channel.name;
    let sender = message.member.user;
    let gServerID = message.guild.id;

    var channelArray = botconfig.allowedCmdChannels;

    if(channelArray.indexOf(channelName) != -1)
    {
        let guildRole = "Guild Master";
        let modRole = "Moderators";
        let adminRole = "Administrators";
        let gRole = message.guild.roles.find(r => r.name === guildRole);
        let mRole = message.guild.roles.find(r => r.name === modRole);
        let aRole = message.guild.roles.find(r => r.name === adminRole);

        if(!message.member.hasPermission('MANAGE_ROLES'))
        {
            //
            if(args[0] === "help")
            {
                message.reply("Usage: .guildmaster addme");
                return message.delete();
            }
            
            if(args[0] === "addme" || !args[0])
            {
                //
                sender.send(Locales.Responses.guildmasterRequest);
    
                let gmEmbed = new Discord.MessageEmbed()
                .setDescription("Guild Master Request")
                .setAuthor(message.author.username)
                .setColor("#fc6400")
                .addField("Requested By", sender.tag)
                .addField("Notice", `${sender} is requesting the Guild Master role. Contact them via ${Locales.ChannelIDS.modhelping} and give them the role Processing.`);
    
                let modChannel = message.guild.channels.find(c => c.name === "moderators");
                modChannel.send(Locales.RoleIDS.moderators);
                modChannel.send(gmEmbed);
                await(message.delete());
                return;
            }
            else
            {
                return message.delete();
            }
        }

        if(message.member.hasPermission('MANAGE_ROLES'))
        {
            let rMember = message.guild.member(message.mentions.users.first());
            if (!rMember) return errors.cantfindUser(message.channel);
            var userG = message.mentions.users.first();
            var UserG = message.guild.member(userG) || message.guild.members.get(args[0]);

            if(args[0] === "help" || !args[0])
            {
                return message.reply("Usage: .guildmaster @NAME");
            }

            if(!rMember.roles.has(gRole.id))
            {
                rMember.roles.add(gRole.id).catch(err => console.log(err));
                Functions.addGuildMaster(UserG.id, gServerID);
                rMember.send(`You have been assigned the role Guild Master. This will allow you to post in ${Locales.ChannelIDS.krguildrecruit} and ${Locales.ChannelIDS.ruguildrecruit} on behalf of your guild. Please take a minute to check the pins in that channel as there are some rules you need to follow.`);
                await(message.delete());
                return;
            }
            else
            {
                //
                return sender.send(`${rMember} already has that role.`);
            }
        }
    }
    else
    {
        return message.delete();
    }
}

module.exports.help = {
    name: "guildmaster",
    aliases: ["guildmaster"]
}