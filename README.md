# muteme

Press the button. `code.js` sends Ctrl + Alt + M.

Wireless button that toggles mute on and off. Built on Puck.js.
The program is `code.js`. Two Alfred workflows are in the repo root.

## What this is

`code.js` loads `ble_hid_keyboard` and passes `kb.report` into
`NRF.setServices` as `hid`. `NRF.setAdvertising` sets the name
`Mute Button` and the interval `600`.

`isMuted` starts as `true`. The comment says to assume we start muted.

## Setup

1. Use `code.js` as the Puck.js program.
2. The advertised name is `Mute Button`.
3. `Mic-PTT-Hotkey.alfredworkflow` is the Mic PTT Hotkey workflow.
4. `Mic-Unmute-Hotkey.alfredworkflow` is the Unmute All Hotkey workflow.

## Hotkeys

Both taps use `kb.MODIFY.LEFT_CTRL` and `kb.MODIFY.LEFT_ALT`.

1. At the top level, `code.js` taps `kb.KEY.X`, then calls `setMute(true)`
   in the tap callback. The comment says this mutes all devices once
   connected.
2. The button taps `kb.KEY.M`. The comment says pressing the button sends
   Ctrl + Alt + M, mapped to a script that toggles mute for all devices.

The button uses `setWatch` on `BTN` with edge `rising`, debounce `10`,
and repeat `true`. Each press resets `LED1` and `LED2`, then calls
`setMute(!isMuted)`.

## Lights

The `setMute` comment says green means unmuted and red means muted.

1. Muted calls `LED1.set()`.
2. Unmuted calls `LED2.set()`.
3. `setMute` then schedules `LED1.reset()` if muted, or `LED2.reset()` if
   unmuted, after `LED_TIMEOUT` (`600000`). The comment says 10 minutes.
4. A button press resets both LEDs before `setMute`.
5. On `disconnect`, both LEDs are reset.

## Alfred workflows

### Mic PTT Hotkey

File: `Mic-PTT-Hotkey.alfredworkflow`.

- Name: Mic PTT Hotkey. Bundle id `com.droxey.mic-ptt`. Version 1.0.0.
- Description: Toggle all microphones on and off.
- Hotkey string `M`, key code `46`, hotmod `786432`.
- The hotkey connects to the script. The script connects to a notification.
- The script reads `input volume of (get volume settings)`.
- If that volume is 0, it sets input volume to 80 and returns `UNMUTED`.
- Otherwise it sets input volume to 0 and returns `MUTED`.
- Notification title `Mic PTT`. Text `Mic input {query}`.
- Created by Dani Roxberry. Category Tools. Site [droxey.com][droxey].
- Workflow readme: Adapted from [togglemic][togglemic].
- Technique from [mute-mic].
- Code from [superuser-mute].

### Unmute All Hotkey

File: `Mic-Unmute-Hotkey.alfredworkflow`.

- Name: Unmute All Hotkey. Bundle id `com.droxey.mic-unmute`. Version 1.0.0.
- The script is `set volume input volume 80`.
- Hotkey string `A`, key code `0`, hotmod `786432`.
- The hotkey connects to the script. The script connects to a notification.
- Notification title `Mic Volume`. Text `Mic Volume: {query}`.
- Description: Gets the current volume of your microphone.
- Created by Dani Roxberry. Category Tools. Site [droxey.com][droxey].
- Workflow readme: Adapted from [togglemic][togglemic].

[droxey]: https://droxey.com
[togglemic]: https://github.com/pborenstein/togglemic
[mute-mic]: http://www.alfredforum.com/topic/2486-mute-mic/
[superuser-mute]: http://superuser.com/a/397770/40768
