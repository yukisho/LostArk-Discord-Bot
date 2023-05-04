const Discord = require("discord.js");
const cmdResponses = require("../utils/cmdResponses.js");
const mongoose = require('mongoose');
const Functions = require('../functions.js');
const ms = require("ms");
var schedule = require('node-schedule');

//Connect to Mongoose
mongoose.connect(cmdResponses.mongodbconnect(), {
  useNewUrlParser: true
});

const Mutes = require("../models/mutes.js");

module.exports.run = async(bot, message, args) => {
    //.mute @Gravvy time
    const sender = message.member.user;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sender.send("You do not have those permissions.");

    //if(channelName === modChannel)
    if(message.member.hasPermission("MANAGE_MESSAGES"))
    {
        if(args[0] === "help")
        {
            message.reply("Usage: .mute @NAME time(in minutes) REASON");
        }
        else
        {
            const user = message.mentions.users.first();
            const mUser = message.guild.member(user) || message.guild.members.get(args[0]);
            var d = new Date();
            if(!mUser) return sender.send("Counldn't find user.");
            if(mUser.hasPermission("MANAGE_MESSAGES")) return sender.send("Can't mute that user.");
            let muteRole = message.guild.roles.find(r => r.name === "Cooldown");
            let normieRole = message.guild.roles.find(r => r.name === "Normie");

            function muteUser(muteTime)
            {
                var startTime = new Date(Date.now() + muteTime);//the actual time when the scheduled job will begin
                var endTime = new Date(startTime.getTime() + (muteTime + 1));//when the job ends or something, this does not matter as long as it is 1 second longer

                var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){//dont fuck with this
                    mUser.roles.add(normieRole.id);
                    mUser.removeRole(muteRole);
                    j.cancel();//stops the job so it does not repeat itself
                });
            }

            var min = Functions.msToMinutes(args[1]);
            var mill = Functions.minToMS(min);
            let muteTime = mill;
            let mReason = args.slice(2).join(' ');
            if(!muteTime) return sender.send("You did not specify a time.");
            if(!mReason) return sender.send(`You did not specify a reason in your mute for user ${mUser}.`);

            //Add mute info to the database
            Mutes.findOne({
                userID: message.member.id,
                serverID: message.guild.id
            }, (err, mutes) => {
                if(err) console.log(err);
                const newMutes = new Mutes({
                    userID: message.member.id,
                    serverID: message.guild.id,
                    userTag: user.tag,
                    mutedBy: sender.id,
                    modTag: sender.tag,
                    reason: mReason,
                    createdAt: d.toUTCString(),
                    randomSeed: Math.floor((Math.random() * 100000) + 1)
                })
                newMutes.save().catch(err => console.log(err));
            });

            await(mUser.removeRoles(mUser.roles));
            await(mUser.roles.add(muteRole.id));
            muteUser(muteTime);

            let reportEmbed = new Discord.MessageEmbed()
            .setDescription("Mutes")
            .setColor("#8187ff")
            .addField("Muted User", `${mUser} (${user.tag}) with ID: ${mUser.id}`)
            .addField("Muted By", `${message.author} with ID: ${message.author.id}`)
            .addField("Mute Length", `${min} minute(s)`)
            .addField("Mute Reason", `${mReason}`)
            .addField("Time Of Mute", message.createdAt);

            let reportsChannel = message.guild.channels.find(`name`, "incidents");//"reports";
            if(!reportsChannel) return sender.send("Couldn't find reports channel.");

            reportsChannel.send(reportEmbed);
            mUser.send(reportEmbed).catch(() => message.reply("This user is not accepting DMs. The incident report could not be sent to the user. They were muted and logged in #incidents"));
        }
    }
}

module.exports.help = {
    name: "mute",
    aliases: ["mute"]
}