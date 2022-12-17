const {account_user, account_password, account_shared_secret, use_two_factor} = require('./steamConfig.json');
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

module.exports = {
	LogOnDetailsNamePass,
	LogOnOptions,
	use_two_factor
}