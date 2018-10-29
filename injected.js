// All messages will go tru if the length is <= 4194.
// *ONE* 4195 length message can be sent without issue.
// If a *SECOND* 4195 length message is sent, the port will stop working.
const MAX_STRING_LENGTH = 4195;

const port = browser.runtime.connect({ name: 'myPort' });

const makeLongString = n => {
    const s = 'Long message';
    return `${s}${new Array(n - s.length).fill('x').join('')}`;
};

function sendMessages() {
    // The repetition here is to highlight the fact that the issue does not
    // appears only after some sort of accumulation.
    // You can send any number of messages *as long as you never send two messages
    // exceeding MAX_STRING_LENGTH*. (One is fine tho).
    port.postMessage(makeLongString(MAX_STRING_LENGTH + 1)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // Sent
    port.postMessage('Short message'); // Sent
    port.postMessage('Short message'); // Sent

    // After executing the following line, the port is won't work anymore.
    // And any ports created on this tab for all future instances the content script,
    // while being registered by the background script (via `browser.runtime.onConnect`),
    // will all fail to send messages.
    port.postMessage(makeLongString(MAX_STRING_LENGTH + 1)); // NOT sent
    port.postMessage('Short message'); // NOT sent
    port.postMessage(makeLongString(MAX_STRING_LENGTH)); // NOT sent
    port.postMessage('Short message'); // NOT sent
}

sendMessages();

