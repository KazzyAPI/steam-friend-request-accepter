const {account_name, account_password, account_shared_secret, use_two_factor} = require('./steamConfig.json');
SteamTotp = require('steam-totp');

const LogOnOptions2Fa = {
	accountName: account_name,
	password: account_password,
	twoFactorCode: SteamTotp.generateAuthCode(account_shared_secret)
}

const LogOnOptions = {
	accountName: account_name,
	password: account_password,
}

module.exports = {
	LogOnOptions2Fa,
	LogOnOptions,
	use_two_factor
}