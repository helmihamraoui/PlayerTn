import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Basic Socket.IO connection for testing
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('test_event', (data) => {
        console.log('Test event received:', data);
        socket.emit('test_response', { message: 'Test response from server' });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
