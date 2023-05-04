const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setTitle("Insufficient Permission")
        .setColor(botconfig.red)
        .addField("Permission needed", perm);

    return message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor(botconfig.red)
        .setTitle("Error")
        .addField(`${user} has perms`, perms);

    return message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("You cannot ban a bot.")
        .setColor(botconfig.red);

    return message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("Could not find that user.")
        .setColor(botconfig.red);

    return channel.send(embed);//.then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("Please supply a reason.")
        .setColor(botconfig.red);

    return channel.send(embed).then(m => m.delete(5000));
}
