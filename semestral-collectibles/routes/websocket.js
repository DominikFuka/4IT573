import { Server } from 'ws';

const websocketServer = (server) => {
  const wss = new Server({ server });

  wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
};

export default websocketServer;
