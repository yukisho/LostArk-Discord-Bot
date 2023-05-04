const Discord = require("discord.js");
const cmdResponses = require("../utils/cmdResponses.js");
const mongoose = require('mongoose');

//Connect to Mongoose
mongoose.connect(cmdResponses.mongodbconnect(), {
  useNewUrlParser: true
});

const Bans = require("../models/bans.js");

module.exports.run = async(bot, message, args) => {
    //.ban @Gravvy reason

    const sender = message.member.user;
    const user = message.mentions.users.first();
    const bUser = message.guild.member(user) || message.guild.members.get(args[0]);
    var d = new Date();
    if(!bUser) return message.member.send("Can't find that user");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.member.send("You do not have those permissions.");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.member.send("That user cannot be Banned.");
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.member.send(`You did not include a reason in your ban for user ${bUser}!`);

    if(message.member.hasPermission("MANAGE_MESSAGES"))
    {
        //Add ban info to the database
        Bans.findOne({
            userID: message.member.id,
            serverID: message.guild.id
        }, (err, bans) => {
            if(err) console.log(err);
            const newBans = new Bans({
                userID: message.member.id,
                serverID: message.guild.id,
                userTag: user.tag,
                bannedBy: sender.id,
                modTag: sender.tag,
                reason: bReason,
                createdAt: d.toUTCString(),
                randomSeed: Math.floor((Math.random() * 100000) + 1)
            })
            newBans.save().catch(err => console.log(err));
        });

        //Embed message sent to the #incidents channel
        let banEmbed = new Discord.MessageEmbed()
        .setDescription("~Ban~")
        .setColor("#A00004")
        .addField("Banned User", `${bUser} (${user.tag}) with ID ${bUser.id}`)
        .addField("Banned By", `${message.author} with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Reason", bReason)
        .addField("Time Of Ban", message.createdAt);

        let incidentsChannel = message.guild.channels.find(c => c.name === "incidents");
        if(!incidentsChannel) return sender.send("Couldn't find incidents channel.");

        bUser.send(banEmbed);
        incidentsChannel.send(banEmbed);
        message.guild.member(bUser).ban(bReason).catch(() => message.reply("This user is not accepting DMs right now but they were banned."));
    }
}

module.exports.help = {
    name: "ban",
    aliases: ["ban"]
}