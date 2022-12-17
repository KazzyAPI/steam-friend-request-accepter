let SteamUser;

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
  settings.use_two_factor ? settings.LogOnOptions2Fa : settings.LogOnOptions
);

module.exports = client;


