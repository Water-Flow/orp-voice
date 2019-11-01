import alt from 'alt';
import native from 'natives';

alt.initVoice();
alt.setMicGain(4);

alt.on('update', () => {
    if (native.isControlJustPressed(0, 249)) {
        alt.enableVoiceInput();
    } else if (native.isControlJustReleased(0, 249)) {
        alt.disableVoiceInput();
    }
});