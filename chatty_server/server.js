// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });




// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcast(wss.clients.size.toString());
  const colors = ['mediumvioletred', 'orangered', 'darkgreen', 'darkcyan', 'maroon', 'steelblue', 'palevioletred', 'salmon'];
  const randomNumber = Math.floor(Math.random()*colors.length);

  ws.on('message', function incoming(data) {
    const message = JSON.parse(data);

    var newMessage;
    if (message.type === 'message') {
      newMessage = {
        id: uuidv1(),
        username: message.username,
        color: colors[randomNumber],
        content: message.content,
        type: 'message'
      }
    } else if (message.type === 'notification') {
      var content = message.oldUserName + ' has changed name to '+message.newUserName;
      newMessage  = {
        id: uuidv1(),
        username: message.oldUserName,
        type:'notification',
        content: content
      }
    }

    wss.broadcast(JSON.stringify(newMessage));

  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(wss.clients.size.toString());
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};