const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({port : 8080});
let wslist = [];

let lasttime = new Date();
function sendState() {
    let sendData = [];
    for (let i = 0; i < wslist.length; i++) {
        sendData[i] = {
            id : wslist[i].id,
            state : wslist[i].state,
        }
    }
    sendData = JSON.stringify(sendData);
    // sendData = Buffer.from(sendData);
    for (let i = 0; i < wslist.length; i++) {
        wslist[i].ws.send(sendData);
    }
    now = new Date();
    console.log(parseInt(1 / (now - lasttime) * 1000));
    lasttime = now
    setTimeout(sendState, 30/1000);
    
}
sendState();



wss.on('connection', function connection(ws) {
    const id = wslist.length;
    let state = [0, 0];
    wslist.push({
        id : id,
        ws : ws,
        state : state
    });
    console.log(`new connect num : ${wslist.length}`)

    ws.on('message', function(message) {
        message = JSON.parse(message);
        if(message.function === "state") {
            state[0] = Number(message.x);
            state[1] = Number(message.y);
        }
    })
    ws.on('close', function() {
        for(let i = 0; i < wslist.length; i++) {
            if(wslist[i].id === id)  {
                wslist.splice(i, 1);
            }
        }
    })


})

