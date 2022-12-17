var SteamUser ;
const settings = require("./Settings/account_setup");
const { log } = require("../Utils/index");

try {
  SteamUser = require("steam-user");

  log.info("Modules are installed . . .");
  log.info("Proceeding to sign in . . .");
} catch (e) {
  log.error(`Modules are not correctly installed => Error => ${e.message}`);
  process.exit(1);
}

const client = new SteamUser();
client.logOn(
  settings.use_two_factor ? settings.LogOnDetailsNamePass : settings.LogOnOptions
);

client.on("loggedOn", (d) => {
    log.info('Succesfully logged in!')
    client.setPersona(SteamUser.EPersonaState.Away)
    client.gamesPlayed(settings.getGamesPlayed(), true)
});

client.on('accountInfo', function(name, country, authedMachines, flags, fbID, fbName) {

    log.info('SteamName :', name);
    log.info('SteamDevs :', authedMachines);
  });
  
client.on('error', err => {
    log.error(err.message);
})

client.on('accountLimitations', (data) => {
    log.info("Steam limitations : ", data);
})

client.on('disconnected', (eresult, msg) => {
    log.info(msg);
    log.error('Client has disconnected! Reconnecting in 10 seconds . . .')
    setTimeout(() => {
        client.logOn(
            settings.use_two_factor ? settings.LogOnOptions2Fa : settings.LogOnOptions
          );
    }, 10000);
})

client.on('lobbyInvite', (steamid, lobbyId) => {
    log.info(`${steamid} has invited you to ${lobbyId}`)
})

client.on('friendRelationship', (steamid, relationship) => {
    switch(relationship) {
        case 0:
        log.info('None')
        break;
        case 1: 
        log.info(`${steamid} has blocked you.`);
        break;
        case 2:
            client.addFriend(steamid);
            client.chatMessage(steamid, settings.getMessage());
        break;
        case 3: 
        log.info("Some has happened with a friend");
        break;
        case 4:
        log.info("TODO Request init");
        break;
        case 5:
        log.info("TODO ignored");
        break;
        case 6:
        log.info("Friend has been ignored");
        break;
        case 7:
        log.info("TODO Suggested friend");
    }
})

client.on('friendMessage', (senderId , message) => {

    log.info('Messaged received!')

})



