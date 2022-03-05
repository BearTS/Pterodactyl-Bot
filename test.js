const Nodeactyl = require('nodeactyl');
const panel = new Nodeactyl.NodeactylClient('https://panel.host-bot.xyz', 'VmO7YbqolvFec6xEQrEQKEBtRbWann6w6wBOPArcIG85MIOk');
async function test() {
    try {
        const data = await panel.getAllServers();
        data.data.forEach(servers => {
            // console.log(servers.attributes.name);// this is name
            console.log(servers.attributes)
        });
        // console.log(data.meta.pagination.total); // this is total servers
    } catch (error) {
        console.log(error);
    }
}
test();