const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    transports: ['polling'],
    cors: {
        cors: {
            origin: "http://localhost:3000"
        }
    }
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`);
    });
});

module.exports = { app, server, io };