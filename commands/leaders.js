const Discord = require("discord.js");
const Coins = require("../models/coins.js");
const Functions = require("../functions.js");

module.exports.run = async(bot, message, args) => {
    Coins.find({
        serverID: message.guild.id
    }).sort([
        ['coins', 'descending']
    ]).exec((err, res) => {
        //errors
        if(err) console.log(err);

        let embed = new Discord.MessageEmbed()
        .setTitle("Coins Leaderboard")

        let amount = args[0];

        if(!args[0]){amount = 5;}
        if(amount > 10){amount = 10;}
        else if(amount <= 0){amount = 5;}

        //check for no results
        if(res.length === 0)
        {
            //no results
            embed.setColor("RED");
            embed.setField("No data found", "Participate in chat to earn coins!");
        }
        else if(res.length < amount)
        {
            //less than 5 results
            embed.setColor("BLURPLE");
            for(i = 0; i < amount; i++)
            {
                let member = message.guild.members.get(res[i].userID) || "User Left";
                if(member === "User Left")
                {
                    Functions.userLeft(member.id);
                    embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
                }
                else
                {
                    //
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].coins}`);
                }
            }
        }
        else
        {
            //more than 5 results
            embed.setColor("BLURPLE");
            for(i = 0; i < amount; i++)
            {
                let member = message.guild.members.get(res[i].userID) || "User Left";
                if(member === "User Left")
                {
                    Functions.userLeft(member.id);
                    embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
                }
                else
                {
                    //
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].coins}`);
                }
            }
        }

        return message.channel.send(embed);
    });
}

module.exports.help = {
    name: 'leaders',
    aliases: ["leaderboard"]
}