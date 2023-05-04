const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const XP = require("../models/xp.js");

module.exports.run = async (bot, message, args) => {

  XP.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, xp) => {
    if(err) console.log(err);

    let embed = new Discord.MessageEmbed()
    .setTitle("Experience")
    .setColor("#d604cf")
    .setThumbnail(message.author.displayAvatarURL);

    if(!xp)
    {
      embed.addField("🕹️", "0", true);
      return message.member.send(embed).catch(err => console.log(err));
    }
    else
    {
      embed.addField("🕹️", xp.xp, true);
      return message.member.send(embed).catch(err => console.log(err));
    }
  })

  message.delete().catch(err => console.log());

}

module.exports.help = {
  name: "level",
  aliases: ["level", "lvl"]
}