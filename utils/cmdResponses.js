const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.mongodbconnect = (message) => {
    return "mongodb://yukisho:QDQB4Bb6XQOFgnaa@cluster0-shard-00-00-aarno.mongodb.net:27017,cluster0-shard-00-01-aarno.mongodb.net:27017,cluster0-shard-00-02-aarno.mongodb.net:27017/lostarkbot?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
}

module.exports.mongodbconnect2 = (message) => {
    return "mongodb://ubuntu@ec2-54-200-191-17.us-west-2.compute.amazonaws.com:27017/lostarkbot?ssl=true&retryWrites=true";
}

/*module.exports.faq = (message) => {
    return "Hello everyone.This is [CM] Chimie here to answer some of your basic questions.1. Is the OBT open to NA/EU?ㄴNo it isn't, it's only available in KR right now.2. So we can't play?ㄴYou can play, but it's a process.3. What do I need to do to play?ㄴOne would need to acquire an account from a 'Korean Friend'.4. Why is that?ㄴAccounts need to be verified with a Korean Cellphone because the game is rated Mature.5. Where can I find a Korean friend.ㄴWe can’t tell you that, use some googlefu.6. OK I’ve got an account, how do I install the game?ㄴThe game is region locked to KR, so you’ll need to VPN into Korea to install/play the game.7. VPN? Which should I use.ㄴThe popular VPNs are Exitlag, Mudfish, Nord. You can ask in general about which ones people like best.8. Ok, I have my VPN set up, I have my account. What now?ㄴYou can install the game via the STOVE Client. Instructions are pinned in #lost-ark-discussion.9. Ok, I’m all ready to go. What now?ㄴCheck the User list below ㄴPlease add your name to the list. As you can see, the vast majority of players are on 이그하람 server, which is currently 3rd on the server list.10. Where can I find translations, guides, or anything else of importance for playing the game?ㄴPlease check the pinned messages in #general #lost-ark-discussion and #troubleshooting11. Where can I find a guild?ㄴYou can check the #guild-recruitment channel, or check on the OBT Players list for people who have added a guild and see if they match your server.12. Is there an English Patch?ㄴIn CBT2 there was an English patch (but it was... mixed.) You shouldn't really need English patch to play, as most things are pretty straight forward.ㄴ You can check #obt-info dump pinned messages for more info about screen translators.13. How do I invite someone here?ㄴThere is an invite link below.https://discord.gg/lostark https://docs.google.com/spreadsheets/d/12c5-upBa8CgdEZR_S0CKt-E9771nK9ggTcsZyhsZffs/edit?usp=sharing";
}*/

module.exports.faqru = (message) => {
    return "You don't need a phone number to register to mail.ru if you click this option.\n\n**Is Lost Ark RU region locked?**\nYes, you will need a Russia VPN to play.  But there won't be any reverification issues ccording to the RU CM.\n\n**What is the RU demo?**\nThe demo lets you test class skills in trision gate, play through the first area and eventually PVP.\n\n**When does the demo end?**\nMay 30th - June th, 019\n\n**When does PVP start?**\nArena opens on June 2nd and the tournament begins on June 4th.  See <#583784472277811210> for discussion.\n\n**How do I download the demo?**\nUse the ``.demo`` command in <#510240567981113344>\n\n**When does the actual RU server launch/CBT/OBT?**\nIt's unknown, but you can purchase a founder packs for access on their site: https://la.mail.ru/ https://cdn.discordapp.com/attachments/583783228339519504/583828212727939072/BtEHGTTLEN.png";
}

module.exports.beta = (message) => {
    return "**RU Beta Dates** \n\n Character Precreation: October 21, 2019 13:00 MSK \n Early Access: October 24, 2019 15:00 MSK \n OBT: October 27, 2019 15:00 MSK";
}