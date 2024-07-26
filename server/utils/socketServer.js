const { Server } = require('socket.io');

let io;

const socketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
        },
        path: '/socket/'
    });

    // Socket.io stuff // socket or client
    io.on('connection', (socket) => {
        console.log("User Connected", socket.id);
        socket.on('disconnect', () => {
            console.log('User Disconnected');
        })
    });
};

module.exports = { socketServer, io };