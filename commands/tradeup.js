const Discord = require("discord.js");
const cmdResponses = require("../utils/cmdResponses.js");
const Copper = require("../models/copper.js");
const Coins = require("../models/coins.js");

module.exports.run = async(bot, message, args) => {

    function getCopper()
    {
        Copper.findOne({
            userID: message.author.id,
            serverID: message.guild.id
            }, (err, copper) => {
            if(err) console.log(err);
                if(copper)
                {
                    memberCopper = copper.copper;
                }
                else
                {
                    const newCopper = new Copper({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        copper: 0
                    })
            
                    newCopper.save().catch(err => console.log(err));
                    return message.member.send("You don't have any copper!");
                }
            })
    }

    function addToCoins()
    {
        //
        Coins.findOne({
        userID: message.author.id,
        serverID: message.guild.id
        }, (err, coins) => {
        if(err) console.log(err);
            if(coins)
            {
                var coinstoadd = 100;
                coins.coins = coins.coins + coinstoadd;
                coins.save().catch(err => console.log(err));
            }
            else
            {
                const newCoins = new Coins({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: 0
                })
        
                newCoins.save().catch(err => console.log(err));
                return message.member.send("You don't have any coins!");
            }
        })
    }

    function subtractCopper()
    {
        //
        Copper.findOne({
        userID: message.author.id,
        serverID: message.guild.id
        }, (err, copper) => {
        if(err) console.log(err);
            if(copper)
            {
                var coppertosubtract = 1000;
                copper.copper = copper.copper - coppertosubtract;
                copper.save().catch(err => console.log(err));
            }
        })
    }

    var memberCopper = 0;

    if(memberCopper === 0)
    {
        getCopper();
    }

    if(memberCopper >= 1000)
    {
        //
        subtractCopper();
        addToCoins();

        let embed = new Discord.MessageEmbed()
        .setTitle("Copper 💱 Coins")
        .setColor("#00FF00")
        .setThumbnail(message.author.displayAvatarURL)
        .addField("User", user.tag, true)
        .addField("💰", copper.copper, true)
        .addField("💰", coins.coins, true);
        message.member.send(embed).catch(err => console.log(err));
        message.delete();
    }

}

module.exports.help = {
    name: 'tradeup',
    aliases: ["tradeup"]
}