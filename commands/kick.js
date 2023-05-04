const Discord = require("discord.js");
const cmdResponses = require("../utils/cmdResponses.js");
const mongoose = require('mongoose');

//Connect to Mongoose
mongoose.connect(cmdResponses.mongodbconnect(), {
  useNewUrlParser: true
});

const Kicks = require("../models/kicks.js");

module.exports.run = async(bot, message, args) => {
    //.kick @Gravvy reason

    const sender = message.member.user;
    const user = message.mentions.users.first();
    const kUser = message.guild.member(user) || message.guild.members.get(args[0]);
    var d = new Date();
    if(!kUser) return message.channel.send("Can't find that user");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.member.send("You do not have those permissions.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.member.send("That user cannot be kicked.");
    let kReason = args.join(" ").slice(22);
    if(!kReason) return message.member.send(`You did not include a reason in your kick for user ${kUser}!`);

    if(message.member.hasPermission("MANAGE_MESSAGES"))
    {
        //Add kick info to the database
        Kicks.findOne({
            userID: message.member.id,
            serverID: message.guild.id
        }, (err, kicks) => {
            if(err) console.log(err);
            const newKicks = new Kicks({
                userID: message.member.id,
                serverID: message.guild.id,
                userTag: user.tag,
                kickedBy: sender.id,
                modTag: sender.tag,
                reason: kReason,
                createdAt: d.toUTCString(),
                randomSeed: Math.floor((Math.random() * 100000) + 1)
            })
            newKicks.save().catch(err => console.log(err));
        });

        //Embed message sent to the #incidents channel
        let kickEmbed = new Discord.MessageEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} (${user.tag}) with ID ${kUser.id}`)
        .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Reason", kReason)
        .addField("Time Of Kick", message.createdAt);

        let incidentsChannel = message.guild.channels.find(c => c.name === "incidents");
        if(!incidentsChannel) return sender.send("Couldn't find incidents channel.");

        kUser.send(kickEmbed);
        incidentsChannel.send(kickEmbed);
        message.guild.member(kUser).kick(kReason).catch(() => message.reply("This user is not accepting DMs right now but they were kicked."));
    }
}

module.exports.help = {
    name: "kick",
    aliases: ["kick"]
}