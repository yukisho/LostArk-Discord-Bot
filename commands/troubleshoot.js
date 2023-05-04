const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `Please post all client related issues in <#507100658709692417> and check pinned messages in that channel for the most recent info. Common client issues and solutions are listed in this guide and is also pinned there: https://docs.google.com/document/d/1SJM4YTEo1h4a-fy6bxrJKS7tUyrCtzQgTf-aJrxbPTE/edit`;
const Content2 = ``;
const Content3 = ``;

module.exports.run = async(bot, message, args) => {

    let thisChannel = message.channel.name;
    var channelArray = botconfig.allowedCmdChannels;

    if(channelArray.indexOf(thisChannel) != -1)
    {
        var result = Content1.concat(newLine,Content2,newLine,Content3);
        return message.channel.send(result);
    }
}

module.exports.help = {
    name: 'troubleshoot',
    aliases: ["troubleshoot"]
}