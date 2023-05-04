const mongoose = require('mongoose');
const Locales = require("./utils/locales.js");
const cmdResponses = require("./utils/cmdResponses.js");
const GuildMaster = require("./models/guildmaster.js");
const Coins = require("./models/coins.js");
const XP = require("./models/xp.js");
const botconfig = require("./botconfig.json");

module.exports = {
    template: () => {
        //
    },

    connectMongoose: () => {
        mongoose.connect(cmdResponses.mongodbconnect(), {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepAlive: true,
            useCreateIndex: true
        }).then(() => console.log(Locales.Responses.databaseConnectedSuccess))
        .catch(err => {
            console.log(`DB Connection Error: ${err.message}`);
        });
    },

    checkMongoose: () => {
        var state = mongoose.connection.readyState;
        var date = new Date(Date.now());
        var DATE = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        DATE.setHours(hours - offset);

        switch(state)
        {
            case 0: console.log(`${Locales.Responses.databaseDisconnected} ${DATE}`); connectMongoose(); break;//disconnected
            case 1: /*console.log(`${Locales.Responses.databaseConnected} ${DATE}`);*/ break;//connected
            case 2: /*console.log(`${Locales.Responses.databaseConnecting} ${DATE}`);*/ break;//connecting
            case 3: console.log(`${Locales.Responses.databaseDisconnecting} ${DATE}`); connectMongoose(); break;//disconnecting
        }
    },

    leftToEight: () => {
        var d = new Date();
        return (-d + d.setHours(8,0,0,0));
    },

    restrictedChannels: (thisChannel) => {
        //
        var commandChannels = botconfig.allowedCmdChannels;

        if(commandChannels.indexOf(thisChannel) != -1)
        {
            return false;
        }else{
            return true;
        }
    },

    convertUTCDateToLocalDate: (date) => {
        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    },

    userLeft: (memberID) => {
        Coins.deleteOne({userID: memberID}, {multi: true},
            function(err, result){
                if(err) console.log(err);
            });
    },

    msToMinutes: (ms) => {
        minutes = ms % 60000;
        return minutes;
    },

    minToMS: (min) => {
        var minutes = min % 60000;
        var milliseconds = minutes * 60000;
        return milliseconds;
    },

    timeDifference: (d, dd) => {
        var hour = 60 * 60 * 1000,
            day = hour * 24,
            month = day * 30,
            year = month * 12,
            ms = Math.abs(d - dd);

        var years = parseInt(ms / year, 10);
            ms -= years * year;
        var months = parseInt(ms / month, 10);
            ms -= months * month;
        var days = parseInt(ms / day, 10);
            ms -= days * day;
        var hours = parseInt(ms / hour, 10);
            ms -= hours * hour;
        
        return [
            years + " years",
            months + " months",
            days + " days",
            hours + " hours"
        ].join(", ");
    },

    toTitleCase: (str) => {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    lowerCaseAllWords: (string) => {
        return string.replace(/\w\S*/g, function (word) {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    },

    addGuildMaster: (gUserID, gServerID) => {
        GuildMaster.findOne({
            userID: gUserID,
            serverID: gServerID
            }, (err, guildmaster) => {
            if(err) console.log(err);
            if(!guildmaster)
            {
                const newGuildMaster = new GuildMaster({
                    userID: gUserID,
                    serverID: gServerID,
                    postedKR: false,
                    postedRU: false
                })

                return newGuildMaster.save().catch(err => console.log(err));
            }
            else
            {
                return;
            }
        });
    },

    addCoins: (userIDF, serverIDF, coinstoadd) => {
        Coins.findOne({
            userID: userIDF,
            serverID: serverIDF
        }, (err, coins) => {
            if(err) console.log(err);
            if(!coins)
            {
                const newCoins = new Coins({
                    userID: userIDF,
                    serverID: serverIDF,
                    coins: coinstoadd
                });

                return newCoins.save().catch(err => console.log(err));
            }
            else
            {
                coins.coins = coins.coins + coinstoadd;
                return coins.save().catch(err => console.log(err));
            }
        })
    },

    addXP: (userIDF, serverIDF, xptoadd) => {
        XP.findOne({
            userID: userIDF,
            serverID: serverIDF
        }, (err, xp) => {
            if(err) console.log(err);
            if(!xp)
            {
                const newXP = new XP({
                    userID: userIDF,
                    serverID: serverIDF,
                    xp: xptoadd
                });

                return newXP.save().catch(err => console.log(err));
            }
            else
            {
                xp.xp = xp.xp + xptoadd;
                return xp.save().catch(err => console.log(err));
            }
        })
    },

    checkGuildMaster: (guildChannel, message, gUser, gRole) => {
        var sId = message.guild.id;
        var gUserID = gUser;
        var gServerID = sId;
        var gChannel = guildChannel;
        var guildRole = gRole;
    
        GuildMaster.findOne({
            userID: gUserID,
            serverID: gServerID
            }, (err, guildmaster) => {
            if(err) console.log(err);
            if(!guildmaster)
            {
                if(gChannel === Locales.ChannelNames.guildRecruitKR)
                {
                    if(message.member.roles.has(guildRole.id))
                    {
                        const newGuildMaster = new GuildMaster({
                            userID: gUserID,
                            serverID: gServerID,
                            postedKR: true,
                            postedRU: false
                        })
                        return newGuildMaster.save().catch(err => console.log(err));
                    }
                    else
                    {
                        message.delete();
                        return message.member.send(`${Locales.Responses.noPermissionInChannel}`);
                    }
                }
                
                if(gChannel === Locales.ChannelNames.guildRecruitRU)
                {
                    if(message.member.roles.has(guildRole.id))
                    {
                        const newGuildMaster = new GuildMaster({
                            userID: gUserID,
                            serverID: gServerID,
                            postedKR: false,
                            postedRU: true
                        })
                        return newGuildMaster.save().catch(err => console.log(err));
                    }
                    else
                    {
                        message.delete();
                        return message.member.send(`${Locales.Responses.noPermissionInChannel}`);
                    }
                }
            }
            else
            {
                if(guildmaster.userID)
                {
                    var resKR = guildmaster.postedKR;
                    var resRU = guildmaster.postedRU;

                    if(gChannel === Locales.ChannelNames.guildRecruitKR)
                    {
                        if(resKR)
                        {
                            message.delete();
                            return message.member.send(`${Locales.Responses.alreadyGuildPosted}`);
                        }
                        else
                        {
                            var res2 = true;
                            guildmaster.postedKR = res2;
                            return guildmaster.save().catch(err => console.log(err));
                        }
                    }
                    
                    if(gChannel === Locales.ChannelNames.guildRecruitRU)
                    {
                        if(resRU)
                        {
                            message.delete();
                            return message.member.send(`${Locales.Responses.alreadyGuildPosted}`);
                        }
                        else
                        {
                            var res2 = true;
                            guildmaster.postedRU = res2;
                            return guildmaster.save().catch(err => console.log(err));
                        }
                    }
                }
            }
        });
    },

    checkForPleb: (message, gUser) => {
        var roleName1 = "pleb";
        var roleName2 = "Normie";
        var plebRole = message.guild.roles.find(r => r.name === roleName1);
        var normieRole = message.guild.roles.find(r => r.name === roleName2);

        if(gUser.roles.has(plebRole.id))
        {
            if(gUser.roles.has(normieRole.id))
            {
                return gUser.removeRole(plebRole.id);
            }
        }
    }
};