const botconfig = require("../botconfig.json");
const newLine = "\n\n";
const Content1 = `Lost Ark KR requires a verified account and a VPN. Accounts need to be verified by a Korea phone number and identity. There are reverification waves that lock you out of your account if you don't have access to the phone number. Lost Ark KR is worth playing if you have a reliable account and want to play the newest and latest content or classes (lance master, assassin, etc).`;
const Content2 = `Lost Ark RU registration is free and only requires a VPN. You can signup for a mail.ru account and play the game with a VPN. There will be no reverification waves for RU.`;
const Content3 = `RU will start on an earlier patch content-wise than KR and won't have the newer classes and content until later. Balance-wise it's on the same patch.`;

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
    name: 'krru',
    aliases: ["krru"]
}