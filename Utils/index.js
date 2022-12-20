var log = require("fancy-log");
const steamConfig = require("../Steam/Settings/steamConfig.json");

function checkPrefix(message) {
  if (!message.startsWith(steamConfig.prefix)) return false;
  return true;
}

function checkAdmin(steamid) {
  if (steamid === undefined) {
    throw new Error("Undefined steamid");
  }
  if (steamConfig.list_of_admins.indexOf(steamid) != -1) {
    true;
  }
  false;
}

function getArgs(message) {
  let args = message.split(" ");
  args.shift();
  return args;
}

function getCommand(message) {
  return message.split(" ")[0].toLowerCase();
}

module.exports = {
  log,
  checkAdmin,
  checkPrefix,
  getArgs,
  getCommand,
};
