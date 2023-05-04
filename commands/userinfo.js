const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let user = message.guild.member(message.mentions.users.first());
    let user1 = message.mentions.users.first();
    let member = message.guild.member(user);

    if(member.nickname === null)return message.channelsend("Sorry, but I can't find that user.");

    let infoEmbed = new Discord.MessageEmbed()
    .setTitle(`User Info for ${member.nickname}`)
    .setColor("#00FF00")
    .addField("Account Created", user1.createdAt)
    .addField("User Joined", member.joinedAt)
    .addField("User ID", member.id)
    .setThumbnail(message.author.displayAvatarURL);

    message.channel.send(infoEmbed);
}

module.exports.help = {
    name: 'userinfo',
    aliases: ["userinfo"]
}