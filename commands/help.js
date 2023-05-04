const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if(message.author.bot)return;
    let sender = message.author.username;
    let channelName = message.channel.name;
    var helpChannel = "request-a-mod-test";

    if(channelName === helpChannel)
    {
        message.guild.createChannel(`${sender}-ticket`, "text")
            .then((chan) => {
                if(typeof chan === 'undefined' || typeof chan === undefined)return console.log("Channel is undefined");

                var parent = message.guild.channels.find(c => c.name === "DISCORD SUPPORT");
                var topic = args;

                if(topic === "" || topic === null || topic === undefined)topic = "No question provided.";

                chan.setParent(parent.id)
                    .then(updated => console.log(`Set the category of ${updated.name} to ${updated.parent.name}`))
                    .catch(console.error);

                chan.setTopic(`${sender}: ${topic}`)
                    .then(updated => console.log(`Channel's new topic is ${updated.topic}`))
                    .catch(console.error);

                chan.overwritePermissions(message.guild.id, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false,
                    READ_MESSAGE_HISTORY: false,
                    MENTION_EVERYONE: false,
                    EXTERNAL_EMOJIS: false,
                    USE_EXTERNAL_EMOJIS: false,
                    CHANGE_NICKNAME: false,
                    MANAGE_MESSAGES: false,
                    EMBED_LINKS: false,
                    ATTACH_FILES: false,
                    ADD_REACTIONS: false
                });
            
                chan.overwritePermissions(message.author.id, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true,
                    MENTION_EVERYONE: false,
                    EXTERNAL_EMOJIS: false,
                    USE_EXTERNAL_EMOJIS: false,
                    CHANGE_NICKNAME: false,
                    MANAGE_MESSAGES: false,
                    EMBED_LINKS: false,
                    ATTACH_FILES: true,
                    ADD_REACTIONS: false
                });

                chan.send(`${sender}, a staff member will be with you shortly.`);
        }).catch(console.error);

        return message.delete();
    }
    else
    {
        return message.delete();
    }
}

module.exports.help = {
    name: 'help',
    aliases: ["request", "requestmod", "requestamod", "support", "ticket"]
}