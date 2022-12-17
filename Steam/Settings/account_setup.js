const {account_user, account_password, account_shared_secret, use_two_factor, gamesPlayed} = require('./steamConfig.json');
const {message} = require('./steamMessage.json')
const SteamTotp = require('steam-totp');


const LogOnDetailsNamePass = {
	accountName: account_user,
	password: account_password,
	twoFactorCode: SteamTotp.getAuthCode(account_shared_secret)
}

const LogOnOptions = {
	accountName: account_user,
	password: account_password,
}

const getGamesPlayed = () => {return gamesPlayed}
const getMessage = () => {
	if(message.length > 4_796) throw log.info('Message must be smaller');
	return message;
}

module.exports = {
	LogOnDetailsNamePass,
	LogOnOptions,
	use_two_factor,
	getGamesPlayed,
	getMessage
}