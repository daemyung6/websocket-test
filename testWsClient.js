const WebSocketServer = require("ws");
let count = 0;
function connecting() {
    ++count;
    if(count > 1000) { console.log("done"); return; }
    const ws = new WebSocketServer('ws:localhost:8080');
    ws.on('open', function open() {
        let x = 0;
        let y = 0;
        function sendmsg() {
            x += (Math.random() < 0.5 ? 1 : -1);
            y += (Math.random() < 0.5 ? 1 : -1);
            ws.send(JSON.stringify({
                function : "state",
                x : x,
                y : y
            }))
            setTimeout(() => {
                sendmsg()
            }, 60/1000);
        }
        sendmsg()
    });
    setTimeout(() => {
        connecting()
    }, 5);
}
connecting()