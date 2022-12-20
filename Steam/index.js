var SteamUser;
const settings = require("./Settings/account_setup");
const {
  log,
} = require("../Utils/index");
const { menu } = require("./menu/menu_setup");

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
  settings.use_two_factor
    ? settings.LogOnDetailsNamePass
    : settings.LogOnOptions
);

client.on("loggedOn", (d) => {
  log.info("Succesfully logged in!");
  client.setPersona(SteamUser.EPersonaState.Away);
  client.gamesPlayed(settings.getGamesPlayed(), true);
});

client.on(
  "accountInfo",
  function (name, country, authedMachines, flags, fbID, fbName) {
    log.info("SteamName :", name);
    log.info("SteamDevs :", authedMachines);
  }
);

client.on("error", (err) => {
  log.error(err.message);
});

client.on("accountLimitations", (data) => {
  log.info("Steam limitations : ", data);
});

client.on("disconnected", (eresult, msg) => {
  log.info(msg);
  log.error("Client has disconnected! Reconnecting in 10 seconds . . .");
  setTimeout(() => {
    client.logOn(
      settings.use_two_factor ? settings.LogOnOptions2Fa : settings.LogOnOptions
    );
  }, 10000);
});

client.on("lobbyInvite", (steamid, lobbyId) => {
  log.info(`${steamid} has invited you to ${lobbyId}`);
});

client.on("friendRelationship", (steamid, relationship) => {
  switch (relationship) {
    case 0:
      log.info("None");
      break;
    case 1:
      log.info(`${steamid} has blocked you.`);
      break;
    case 2: // friend request
      handleFriendRequest(steamid);
      break;
    case 3:
      log.info(`${steamid} has accepted your friend request.`);
      break;
    case 4: // request sent
      log.info("You just sent a friend request to" + steamid);
      break;
    case 5: // ignored
      log.info("TODO ignored");
      break;
    case 6: // ignored friend
      log.info("Friend has been ignored");
      break;
    case 7: // suggested friend
      log.info("TODO Suggested friend");
      break;
  }
});

client.on("friendMessage", async (senderId, message) => {
  if (senderId == client.steamID) return;
  var args = message.split(" ");

  switch (args[0].toLowerCase()) {
    case "!help":
      client.chatMessage(senderId, menu);
      break;
    case "!tradeurl":
      let link = await client.getTradeURL();
      if (link) {
        client.chatMessage(senderId, `My trade link is ${link.url}`);
      }
      break;
    default:
      client.chatMessage(senderId, "Sorry i dont know this command!");
      break;
  }
});

function handleFriendRequest(steamid) {
  client.addFriend(steamid);
  client.chatMessage(steamid, settings.getMessage());
}
