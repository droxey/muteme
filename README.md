# 🎙  muteme

Wireless button that toggles mute on and off. Built on Puck.js.

## Load the button

1. Open the Espruino Web IDE and connect to your Puck.js over Bluetooth.
2. Paste [code.js](code.js) into the editor and use **Send to Espruino** to
   upload it.

## Button behavior

The Puck.js acts as a Bluetooth keyboard named `Mute Button`:

- Pressing the button sends **Ctrl+Alt+M** to toggle microphone mute through a
  matching hotkey on the computer.
- On connect, it sends **Ctrl+Alt+X**, intended to mute, and assumes a muted state.
  Neither included workflow binds this shortcut.
- Green means the button considers the microphone unmuted; red means muted.
  This tracks the button's own state, without reading the computer's microphone
  state. Each LED indication times out after 10 minutes; disconnecting clears
  both LEDs.

## Alfred workflows

The included workflows control macOS microphone input volume:

- [Mic-PTT-Hotkey.alfredworkflow](Mic-PTT-Hotkey.alfredworkflow) binds
  **Ctrl+Alt+M** to toggle input volume between 0 (muted) and 80 (unmuted).
  It shows a notification. Despite the PTT name, it toggles rather than requiring
  a held button.
- [Mic-Unmute-Hotkey.alfredworkflow](Mic-Unmute-Hotkey.alfredworkflow) binds
  **Ctrl+Alt+A** to set input volume to 80 (unmuted), with a notification.
