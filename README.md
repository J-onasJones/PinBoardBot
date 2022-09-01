# PinBoardBot
A discord bot that aims to replace the discord built-in pin function as it is limited to 50 pins per channel.


**Known issue:** attachments such as pictures that were originally uploaded by the user cannot be pinned. *I'm working on a fix*


## Setup
1. clone the repository:
   
```
git clone https://github.com/J-onasJones/PinBoardBot.git
```
2. cd into the repository folder
```
cd PinBoardBot
```
3. go to the [discord developer portal](https://discord.com/developers/) and create a new application and bot.
4. paste the bot token and channel id for your "pins" text channel in the `config.json` file.
5. Invite your newly created bot onto the server with the following link (replace `CLIENT_ID` with the client ID of your application):
```
https://discord.com/oauth2/authorize?client_id=CLIENT_IDscope=bot
```
6. install the required node modules with the following command:
```
npm install discord.js@13.1.0 dotenv
```
7. run the following command to start the bot (npm must be installed)
```
npm start
```