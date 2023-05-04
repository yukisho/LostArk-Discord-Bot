const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    //.report @Gravvy reason

    let sender = message.member.user;
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sender.send("You do not have those permissions.");
    let modChannel = "moderators";//message.guild.channels.find(c => c.name === "role-assignment");
    let channelName = message.channel.name;

    if(channelName === modChannel)
    {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Counldn't find user.");
        let reason = args.join(" ").slice(22);
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user cannot be Banned.");

        if(message.member.hasPermission("MANAGE_MEMBERS"))
        {
            let reportEmbed = new Discord.MessageEmbed()
            .setDescription("Reports")
            .setColor("#15f153")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", reason);

            let reportschannel = message.guild.channels.find(`name`, "reports");
            if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

            message.delete().catch(O_o=>{});
            reportschannel.send(reportEmbed);
        }
    }
}

module.exports.help = {
    name: "report",
    aliases: ["report"]
}