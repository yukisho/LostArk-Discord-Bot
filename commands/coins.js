const Discord = require("discord.js");
const cmdResponses = require("../utils/cmdResponses.js");
const mongoose = require('mongoose');
const Coins = require("../models/coins.js");

module.exports.run = async (bot, message, args) => {
    //.coins

    let channelName = message.channel.name;
    var channelArray = ['role-assignment'];

    if(channelArray.indexOf(channelName) === -1)
    {
        let embed = new Discord.MessageEmbed()
        .setTitle("Coins")
        .setColor("#00FF00")
        .setThumbnail(message.author.displayAvatarURL);

        if(args[0])
        {
            if(message.member.hasPermission("MANAGE_MESSAGES"))
            {
                var user = message.mentions.users.first();
                var User = message.guild.member(user) || message.guild.members.get(args[0]);
                embed.addField("User", user.tag, true)
            }
            else
            {
                var User = message.member.user;
                embed.addField("User", User.tag, true)
            }
        }
        else
        {
            var User = message.member.user;
            embed.addField("User", User.tag, true)
        }

        Coins.findOne({
        userID: User.id,
        serverID: message.guild.id
        }, (err, coins) => {
        if(err) console.log(err);

        if(!coins)
        {
            embed.addField("💰", "0", true);
            return message.member.send(embed).catch(err => console.log(err));
        }
        else
        {
            embed.addField("💰", coins.coins, true);
            return message.member.send(embed).catch(err => console.log(err));
        }
        })

        return message.delete().catch(err => console.log());
    }
}

module.exports.help = {
  name: "coins",
  aliases: ["coins"]
}