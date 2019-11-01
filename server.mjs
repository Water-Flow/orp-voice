import alt from 'alt';

const globalVoice = alt.createVoiceChannel(true, 50);
const monoVoice = alt.createVoiceChannel(false, 0);

const channels = [
    globalVoice,
    monoVoice
];

alt.on('playerConnect', (player) => {
    globalVoice.addPlayer(player);
});

alt.on('orp:Ready', () => {
    alt.emit('orp:RegisterCmd', 'channel', 'changeVoiceChannel');
});

alt.on('changeVoiceChannel', (player, args) => {
    if (args.length == 0) {
        alt.emit(`orp:PlayerFunc`, player, 'send', 'Usage: /channel (number)');
        return;
    }

    const channelId = parseInt(args[0]);
    if (Number.isNaN(channelId)) {
        alt.emit(`orp:PlayerFunc`, player, 'send', `{FF0000}Voice channel must be a number`);
        return;
    }

    if (channelId >= channels.length) {
        alt.emit(`orp:PlayerFunc`, player, 'send', `{FF0000}Voice channel id must be from 0 to ${channels.length - 1}`);
        return;
    }

    for (let c in channels) {
        if (channels[c].isPlayerInChannel(player)) {
            alt.log(`Player found in channel ${c}`)
            channels[c].removePlayer(player);
            alt.log(`Removing player from channel ${c}`);
            if (channels[c].isPlayerInChannel(player)) {
                alt.log(`Can't remove player from channel ${c}`)
            }
        }
    }
    channels[channelId].addPlayer(player);
    alt.emit(`orp:PlayerFunc`, player, 'send', `{00FF00}Your voice channel switched to ${channelId}`);
});