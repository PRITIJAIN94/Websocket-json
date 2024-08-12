const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

// Event listener for when a client connects
wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  // Event listener for when a client sends a message
  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);

    try {
      const data = JSON.parse(message);
      console.log('Parsed JSON:', data);

      // Process the received JSON data (you can add your custom logic here)
      if (data.type === 'echo') {
        // Echo the received message back to the client
        ws.send(JSON.stringify({ type: 'echo', message: data.message }));
      } else {
        // Handle other types of messages
        ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  // Event listener for when a client disconnects
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});