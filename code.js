const kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid: kb.report });

// Modify this value to change the timeout for LEDs.
const TIMEOUT_SECONDS = 30;

// Set a consistent timeout in milliseconds.
const ledTimeout = TIMEOUT_SECONDS * 60 * 1000;
let isMuted = false;

// resetLEDs resets all three LEDs.
function resetLEDs() {
    LED1.reset();
    LED2.reset();
    LED3.reset();
}

// setMute toggles the status indication LEDs. 
// Green for unmuted, red for muted.
function setMute(muted) {
    isMuted = muted;
    resetLEDs();

    if (isMuted) {
        LED1.set();
        setTimeout("LED1.reset()", ledTimeout);
    }
    else {
        LED2.set();
        setTimeout("LED2.reset()", ledTimeout);
    }
}

// toggleMute sends CTRL + ALT + M, mapped to a script that toggles mute for all devices.
function toggleMute() {
    kb.tap(kb.KEY.M, kb.MODIFY.LEFT_CTRL | kb.MODIFY.LEFT_ALT, function () {
        setMute(!isMuted);
    });
}

// unmuteAll sends CTRL + ALT + A, mapped to a script that unmutes all devices.
function unmuteAll() {
    kb.tap(kb.KEY.A, kb.MODIFY.LEFT_CTRL | kb.MODIFY.LEFT_ALT, function () {
        setMute(false);
    });
}

// checkBattery notifies the user with a blue LED flash if the battery is less than or equal to 10%.
function checkBattery() {
    if (E.getBattery() <= 10) {
        resetLEDs();
        digitalWrite(LED3, 1, 200);
    }
}

// Watch for button presses.
setWatch(function () { toggleMute(); }, BTN, { edge: "rising", debounce: 10, repeat: true });

// Once connected, reset all LEDs, check the battery level, then unmute all devices.
resetLEDs();
checkBattery();
unmuteAll();