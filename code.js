const kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid: kb.report });

// Configurable settings:
const LED_TIMEOUT = 600000;           // 10 minutes.
let isMuted = true;                   // Assume we start muted.

// Toggle the status indication LEDs. Green = unmuted, red = muted.
function setMute(muted) {
    isMuted = muted;
    if (isMuted) { LED1.set(); } else { LED2.set(); }
    setTimeout(isMuted ? "LED1.reset()" : "LED2.reset()", LED_TIMEOUT);
}

// Mute te all devices once connected.
kb.tap(kb.KEY.X, kb.MODIFY.LEFT_CTRL | kb.MODIFY.LEFT_ALT, function () {
    setMute(true);
});

// Pressing the button sends CTRL + ALT + M, mapped to a script that toggles mute for all devices.
setWatch(function () {
    kb.tap(kb.KEY.M, kb.MODIFY.LEFT_CTRL | kb.MODIFY.LEFT_ALT, function () {
        LED1.reset();
        LED2.reset();
        setMute(!isMuted);
    });
}, BTN, { edge: "rising", debounce: 10, repeat: true });

NRF.on('disconnect', function () {
    LED1.reset();
    LED2.reset();
});

NRF.setAdvertising({}, { name: "Mute Button", interval: 600 });
