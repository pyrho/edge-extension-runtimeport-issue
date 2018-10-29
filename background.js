const counter = 0;
var listen = function(port) {
    console.log('Port created!');

    port.onMessage.addListener(function(msg) {
        console.log(`Got message from JS (${msg.substring(0, 12)}(${msg.length}))`);
    })

    port.onDisconnect.addListener((e) => {
        console.log('onDisconnect')
        console.log(e);
    });
}

browser.runtime.onConnect.addListener(listen);

