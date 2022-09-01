const packageJSON = require("../package.json");
const { prefix, token, pinchannelid } = require('./config.json');
const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

let msgtime = new Date();

client.once('ready', () => {
    logger("Ready!");
    client.user.setActivity("to !pin", { type: "LISTENING" });

});

client.on('interactionCreate', interaction => {
    console.log(interaction);
});

client.on("messageCreate", message => {
    if (message.content.toLowerCase().startsWith(prefix)) {

        if (message.content === prefix + " help") {

            sendHelpMessage(message);

        } else if (message.content === prefix) {

            try {
                message.channel.messages.fetch(message.reference.messageId).then(msgtobepinned => {
    
                    if (msgtobepinned.content.length === 0) {
    
                        logger(message.author.tag + " tried to pin an empty message.");
                        message.reply("That message was empty. (Pictures that have been uploaded directly to the channel are not supported yet. ~sowwy )");
    
                    } else {
    
                        try {
    
                            client.channels.fetch(pinchannelid).then(channel=>channel.send(msgtobepinned.url + "\n" + msgtobepinned.content)).then(msg => {
        
                                logger(message.author.tag + " pinned " + msgtobepinned.content);
        
                                // client.channels.resolveId(pingchannelid).then(pingchannel => {
        
                                //     message.pingchannel.send("Pinned message: " + msgtobepinned.content);
                                // }),
        
        
                                message.reply("Message pinned!");
                                msgtime = new Date();

                                // inside a command, event listener, etc.
                                const exampleEmbed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Pinned Message')
                                .setURL('https://discord.js.org/')
                                .setAuthor(msgtobepinned.author.username, msgtobepinned.author.avatarURL(false), "https://discord.js.org")
                                .setDescription(msgtime.toDateString() + " " + msgtime.toLocaleTimeString("de-DE"))
                                .setThumbnail('https://jonasjones.me/uploads/pinboardbot/pinboardlogo-smaller.png')
                                .addFields(
                                    { name: ' :', value: msgtobepinned.content },
                                    { name: '\u200B', value: '\u200B' },
                                )
                                .addField('Original Message Link', msgtobepinned.url, true)
                                .setTimestamp()
                                .setFooter('A bot by Jonas_Jones @ https://github.com/J-onasJones/PinBoardBot/','https://cdn.discordapp.com/avatars/627930249811984441/5c5ce5730995ef801f163e3625928f35.webp');

                            message.channel.send({ embeds: [exampleEmbed] });

                            message.channel.send(msgtobepinned.author.displayAvatarURL()); 
                                
                            });
        
                        } catch (errormsg) {
                            logger(message.author.tag + " tried to pin but error occured: " + errormsg);
                            message.reply("An error occured. Please try again.");
                        }
    
                    }
    
                    
    
                }
                    
                ).catch(console.error);
    
            } catch (error) {
                message.reply("Reply to the message you want to pin!");
            }

        } else if (message.content === prefix + "") {}


        
        
}});

client.login(token);



function logger(message) {
    msgtime = new Date();
    console.log("[" + msgtime.toLocaleTimeString("de-DE") + "] " + message); //use german time format for 24h clock
}

function sendHelpMessage(message) {
    message.channel.send("The `!pin` command can do the following:\n\t > **!pin help** - sends this help message\n\t > **!pin ping** - checks if the bot is online\n\t > **!pin version** - gets the bot version\n\t > **!pin** - pins a message");
}