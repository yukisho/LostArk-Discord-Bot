const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `Please discuss accounts in <#509981863046283277> and check the pinned messages for more info.`;
const Content2 = `Lost Ark KR goes through reverification waves that will hit most players. These waves are random and unpredictable. To play on the KR server, you need an account from either a third party site (NGW, OBTG) or a trustworthy Korean player. Discussing these sites are fine, but we do not allow trades/purchases to happen in this discord.`;
const Content3 = `Registration for RU is free. There will be no reverification waves for RU. For the RU verions, see this registration guide: https://watchgin.com/how-to-play-lost-ark-ru/`;

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
    name: 'account',
    aliases: ["accounts"]
}