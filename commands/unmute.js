const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {
    //.mute @Gravvy time

    let sender = message.member.user;
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sender.send("You do not have those permissions.");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return sender.send("Can't unmute that user.");
    if(!mUser) return message.reply("Counldn't find user.");
    let muteRole = message.guild.roles.find(r => r.name === "Cooldown");
    let normieRole = message.guild.roles.find(r => r.name === "Normie");

    if(!mUser.roles.find(role => role.name === "Cooldown")) return message.channel.send(`${mUser} is not muted.`)

    if(mUser.roles.find(role => role.name === "Cooldown"))
    {
        mUser.removeRole(muteRole.id);
        mUser.roles.add(normieRole);
        message.channel.send(`${mUser} has been unmuted.`);
    }
}

module.exports.help = {
    name: "unmute",
    aliases: ["unmute"]
}