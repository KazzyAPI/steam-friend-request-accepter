const {client} = require('../index');
const {log} = require('../../Utils/index')
client.on('loggedOn', async (steamId) => {
    log.info(`Logged in as ${steamId.details}`);
})