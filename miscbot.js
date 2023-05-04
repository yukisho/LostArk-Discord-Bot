//Modules
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const cmdResponses = require("./utils/cmdResponses.js");
const Locales = require("./utils/locales.js");
const mongoose = require('mongoose');
const Functions = require("./functions.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
const coinsEnabled = botconfig.coinsOn;
const xpEnabled = botconfig.xpOn;

//Set up Mongoose
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

//Connect to Mongoose
mongoose.connect(cmdResponses.mongodbconnect(), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
    useCreateIndex: true
}).then(() => console.log(Locales.Responses.databaseConnectedSuccess))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});

//Load all commands
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let commandsLoaded = 0;
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        return console.log(Locales.Responses.nouserfound);
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        //console.log(`${f} loaded!`);
        commandsLoaded += 1;
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });

    console.log(`${commandsLoaded} Commands Loaded.`);
});

//Log bot status and time - Set bot discord status message
bot.on("ready", async () => {
    //Check Mongoose connection every 30 minutes
    setTimeout(function(){
        Functions.checkMongoose();
        var dayMillseconds = 1000 * 60 * 30;
            setInterval(function(){ // repeat this every 30 minutes
                Functions.checkMongoose();
            }, dayMillseconds)
        }, Functions.leftToEight())

    var DATE = Functions.convertUTCDateToLocalDate(new Date(Date.now()));
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    console.log(`Time: ${DATE}`);
    bot.user.setActivity("Lost Ark NA", {type: "PLAYING"});
});

//User joins the server
bot.on('guildMemberAdd', member => {
    //Give new user the 'pleb' role
    var roleNameCooldown = "Cooldown";
    let roleCooldown = member.guild.roles.find(r => r.name === roleNameCooldown);

    if(!member.roles.has(roleCooldown.id))
    {
        var rolenameVerify = "pleb";
        let rolePleb = member.guild.roles.find(r => r.name === rolenameVerify);
        member.roles.add(rolePleb).catch(err => console.log(err));
    }

    //Log new user
    var d = new Date();
    let channelName = Locales.ChannelNames.serverlogs;
    let chan = member.guild.channels.find(c => c.name === channelName);
    chan.send(member.user + ' has joined the server on ' + d.toUTCString());
});

//User leaves the server
bot.on('guildMemberRemove', member => {
    //Log user leaving
    var d = new Date();
    let channelName = Locales.ChannelNames.serverlogs;
    let chan = member.guild.channels.find(c => c.name === channelName);
    chan.send(member.user + ' has left the server on ' + d.toUTCString());
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let thisChannel = message.channel.name;
    let roleName = "Guild Master";
    let gRole = message.guild.roles.find(r => r.name === roleName);
    let gUser = message.guild.member(message.author.id);
    let foundBannedWord = false;
    let marketBanned = message.guild.roles.find(r => r.name === "Market Banned");

    if(thisChannel === Locales.ChannelNames.bussingChannel)
    {
        if(message.member.roles.has(marketBanned.id))
        {
            return message.delete();
        }
    }

    //Function to check if guild master has posted in KR channel
    if(thisChannel === botconfig.guildRecruitKR)
    {
        let guildChannel = botconfig.guildRecruitKR;
        Functions.checkGuildMaster(guildChannel, message, gUser, gRole);
    }

    //Function to check if guild master has posted in RU channel
    if(thisChannel === botconfig.guildRecruitRU)
    {
        let guildChannel = botconfig.guildRecruitRU;
        Functions.checkGuildMaster(guildChannel, message, gUser, gRole);
    }

    //Banned words
    var bannedWords = botconfig.bannedWords;
    bannedWords.forEach(function(value)
    {
        if(message.content.toLowerCase().includes(value)) var foundBannedWord = true;
    });

    if(foundBannedWord){message.delete();}

    //Command manager
    let prefix1 = botconfig.prefix;
    let prefix2 = botconfig.prefix2;
    let prefix3 = botconfig.prefix3;
    let prefix = botconfig.prefixArray;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(message.content.startsWith(prefix1))
    {
        if(Functions.restrictedChannels(thisChannel) === true)return message.delete();
        let commandFile = bot.commands.get(cmd.slice(prefix1.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix1.length)));
        if(commandFile) commandFile.run(bot,message,args);
    }
    else if(message.content.startsWith(prefix2))
    {
        if(Functions.restrictedChannels(thisChannel) === true)return message.delete();
        let commandFile = bot.commands.get(cmd.slice(prefix2.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix2.length)));
        if(commandFile) commandFile.run(bot,message,args);
    }
    else if(message.content.startsWith(prefix3))
    {
        if(Functions.restrictedChannels(thisChannel) === true)return message.delete();
        let commandFile = bot.commands.get(cmd.slice(prefix3.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix3.length)));
        if(commandFile) commandFile.run(bot,message,args);
    }
    else//Coins and XP
    {
        var userIDF = message.author.id;
        var serverIDF = message.guild.id;

        if(coinsEnabled)
        {
            let coinstoadd = Math.ceil(Math.random() * 1);
            Functions.addCoins(userIDF, serverIDF, coinstoadd);
        }

        if(xpEnabled)
        {
            let xptoadd = Math.ceil(Math.random() * 2);
            Functions.addXP(userIDF, serverIDF, xptoadd);
        }
    }
});

bot.login(botconfig.token);