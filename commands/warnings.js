const Discord = require("discord.js");
const cmdResponses = require("../utils/cmdResponses.js");
const mongoose = require('mongoose');

//Connect to Mongoose
mongoose.connect(cmdResponses.mongodbconnect(), {
  useNewUrlParser: true
});

const Warnslevel = require("../models/warns.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sender.send("You do not have those permissions.");
    var user = message.mentions.users.first();
    var User = message.guild.member(user) || message.guild.members.get(args[0]);
    var d = new Date();
    if(!User) return message.channel.send("Can't find user");

    Warnslevel.findOne({
    userID: User.id,
    serverID: message.guild.id
    }, (err, warns) => {
        if(err) console.log(err);
        if(warns)
        {
            return message.channel.send(`${user.tag} (ID: ${user.id}) has ${warns.warning} warnings.`);
        }
        else
        {
            return message.channel.send(`${user.tag} (ID: ${user.id}) has 0 warnings.`);
        }
    });

}

module.exports.help = {
  name: "warnings",
  aliases: ["warnings"]
}