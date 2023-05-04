const Discord = require("discord.js");
const cmdResponses = require("../utils/cmdResponses.js");
const mongoose = require('mongoose');
const ms = require("ms");
var schedule = require('node-schedule');

//Connect to Mongoose
mongoose.connect(cmdResponses.mongodbconnect(), {
  useNewUrlParser: true
});

const Warns = require("../models/warns.js");

module.exports.run = async(bot, message, args) => {
    //.warn @Gravvy reason
    const sender = message.member.user;
    const user = message.mentions.users.first();
    const wMember = message.guild.member(user) || message.guild.members.get(args[0]);
    var d = new Date();
    if(!wMember) return message.channel.send("Can't find user");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.member.send("You do not have those permissions.");
    if(wMember.hasPermission("MANAGE_MESSAGES")) return message.member.send("This user cannot be warned.");
    let wReason = args.join(" ").slice(22);
    if(!wReason) return message.member.send(`You did not include a reason for user ${wMember}!`);
    let muteRole = message.guild.roles.find(r => r.name === "Cooldown");
    let normieRole = message.guild.roles.find(r => r.name === "Normie");

    function sendChannelEmbed(uWarns, wReason)
    {
        //
        let warnEmbed = new Discord.MessageEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.username)
        .setColor("#fc6400")
        .addField("Warned User", `${wMember} (${user.tag}) with ID: ${wMember.id}`)
        .addField("Warned By", `${message.author} with ID: ${message.author.id}`)
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", uWarns)
        .addField("Reason", wReason)
        .addField("Time Of Warning", message.createdAt);
        let warnChannel = message.guild.channels.find(c => c.name === "incidents");
        if(!warnChannel) return sender.send("Could not find the incidents channel.");
        warnChannel.send(warnEmbed);
    }

    function sendUserEmbed(uWarns, wReason, Message)
    {
        //
        let warnUserEmbed1 = new Discord.MessageEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.username)
        .setColor("#fc6400")
        .addField("Warned User", `${wMember} (${user.tag}) with ID: ${wMember.id}`)
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", uWarns)
        .addField("Reason", wReason)
        .addField("Time Of Warning", message.createdAt)
        .addField("Notice", Message);
        wMember.send(warnUserEmbed1).catch(() => message.reply("This user is not accepting DMs. The incident report could not be sent to the user. They were warned and it has been logged in #incidents"));
    }

    function muteUser()
    {
        wMember.roles.add(muteRole.id);
        wMember.removeRole(normieRole);
    }

    function unmuteUser(timetoMute) {
        var startTime = new Date(Date.now() + timetoMute);//the actual time when the scheduled job will begin
        var endTime = new Date(startTime.getTime() + (timetoMute + 1));//when the job ends or something, this does not matter as long as it is 1 second longer

        var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){//dont fuck with this
            message.channel.send(`${wMember} has been unmuted.`);
            wMember.roles.add(normieRole.id);
            wMember.removeRole(muteRole);
            j.cancel();//stops the job so it does not repeat itself
        });
    }

    Warns.findOne({
        userID: user.id,
        serverID: message.guild.id
    }, (err, warns) => {
        if(err) console.log(err);
        if(!warns)
        {
            var newWarnings = 1;
            const newWarns = new Warns({
                userID: user.id,
                serverID: message.guild.id,
                userTag: user.tag,
                warnedBy: sender.id,
                modTag: sender.tag,
                warning: newWarnings,
                reason: wReason,
                createdAt: d.toUTCString(),
                randomSeed: Math.floor((Math.random() * 100000) + 1)
            })
            
            var uWarns = newWarnings;
            var Message = "You have received a warning.";
            sendUserEmbed(uWarns, wReason, Message);
            sendChannelEmbed(uWarns, wReason);
            newWarns.save().catch(err => console.log(err));
        }
        else if(warns)
        {
            if(warns.warning === 1)//warning & 5 minute mute
            {
                //
                var uWarns = 2;
                var timetoMute = 299999;
                muteUser();
                unmuteUser(timetoMute);
                var Message = "You have received 2 warnings. You have been muted for 5 minutes.";
                sendUserEmbed(uWarns, wReason, Message);
                sendChannelEmbed(uWarns, wReason);
                warns.warning = 2;
                warns.save().catch(err => console.log(err));
            }
            else if(warns.warning === 2)//warning & 30 minute mute
            {
                //Reset warnings for GravvyTest account
                if(wMember.id === "505515796810825742")
                {
                    warns.warning = 0;
                    warns.save().catch(err => console.log(err));
                }
                else
                {
                    //
                    var uWarns = 3;
                    var timetoMute = 1799999;
                    muteUser();
                    unmuteUser(timetoMute);
                    var Message = "You have received 3 warnings. You have been muted for 30 minutes.";
                    sendUserEmbed(uWarns, wReason, Message);
                    sendChannelEmbed(uWarns, wReason);
                    warns.warning = 3;
                    warns.save().catch(err => console.log(err));
                }
            }
            else if(warns.warning === 3)//warning & kicked from server
            {
                //Reset warnings for GravvyTest account
                if(wMember.id === "505515796810825742")
                {
                    warns.warning = 0;
                    warns.save().catch(err => console.log(err));
                }
                else
                {
                    //
                    var uWarns = 4;
                    var Message = "You have received 4 warnings. You have been kicked from the server.";
                    var normieRole = message.guild.roles.find(r => r.name === "Normie");
                    sendUserEmbed(uWarns, wReason, Message);
                    sendChannelEmbed(uWarns, wReason);
                    wMember.removeRole(normieRole);
                    message.guild.member(wMember).kick(wReason);
                    message.channel.send(`${wMember.id} has been kicked from the server.`);
                    warns.warning = 4;
                    warns.save().catch(err => console.log(err));
                }
            }
            else if(warns.warning === 4)//warning & banned from server
            {
                //Reset warnings for GravvyTest account
                if(wMember.id === "505515796810825742")
                {
                    warns.warning = 0;
                    warns.save().catch(err => console.log(err));
                }
                else
                {
                    //
                    var uWarns = 5;
                    var Message = "You have received 5 warnings. You have been banned from the server.";
                    var normieRole = message.guild.roles.find(r => r.name === "Normie");
                    sendUserEmbed(uWarns, wReason, Message);
                    sendChannelEmbed(uWarns, wReason);
                    wMember.removeRole(normieRole);
                    message.guild.member(wMember).ban(wReason).catch(() => message.reply("This user is not accepting DMs. The incident report could not be sent to the user. They were warned and has been logged in #incidents"));
                    message.channel.send(`${wMember.id} has been banned from the server.`);
                    warns.warning = 5;
                    warns.save().catch(err => console.log(err));
                }
            }
        }
    });
}

module.exports.help = {
    name: "warn",
    aliases: ["warn"]
}