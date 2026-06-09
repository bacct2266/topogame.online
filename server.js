const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// SERVE FRONTEND STATIC ASSETS FROM THE PUBLIC STORAGE BUFFER
app.use(express.static(path.join(__dirname, 'public')));

// COMPREHENSIVE ROOM ISOLATION REGISTRIES (NO MIXING BOTS ALLOWED)
const MATCH_ROOMS = {
    GLOBAL_MULTIPLAYER: new Map(),
    ENCRYPTED_PRIVATE: new Map()
};

function RETRIEVE_OPEN_MULTIPLAYER_LOBBY() {
    for (const [roomId, roomMetadata] of MATCH_ROOMS.GLOBAL_MULTIPLAYER.entries()) {
        if (roomMetadata.connectedClients.size < 50) {
            return roomId;
        }
    }
    const uniqueId = `GLOBAL_MATCH_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    MATCH_ROOMS.GLOBAL_MULTIPLAYER.set(uniqueId, { connectedClients: new Map() });
    return uniqueId;
}

io.on('connection', (socket) => {
    // BROADCAST UPDATED ACCOUNT PERIMETERS GLOBALLY ON NEW CONNECTIONS
    io.emit('global_metric_sync', { totalOnline: io.engine.clientsCount });

    // ROUTE ACTION A: MATCHMAKING ACCESS PIPELINES
    socket.on('join_multiplayer', () => {
        const assignedRoomId = RETRIEVE_OPEN_MULTIPLAYER_LOBBY();
        socket.join(assignedRoomId);
        
        MATCH_ROOMS.GLOBAL_MULTIPLAYER.get(assignedRoomId).connectedClients.set(socket.id, {
            size: 20, score: 0
        });
        
        socket.emit('match_joined', { type: 'MULTIPLAYER', roomId: assignedRoomId });
    });

    // ROUTE ACTION B: PRIVATE INVITE ONLY ACCESS EXTENTS
    socket.on('join_private', (accessCode) => {
        const normalizedCode = accessCode.trim().toUpperCase();
        if (!MATCH_ROOMS.ENCRYPTED_PRIVATE.has(normalizedCode)) {
            MATCH_ROOMS.ENCRYPTED_PRIVATE.set(normalizedCode, { connectedClients: new Map() });
        }
        
        socket.join(normalizedCode);
        MATCH_ROOMS.ENCRYPTED_PRIVATE.get(normalizedCode).connectedClients.set(socket.id, {
            size: 20, score: 0
        });
        
        socket.emit('match_joined', { type: 'PRIVATE', roomId: normalizedCode });
    });

    // ROUTE ACTION C: SYSTEM BROADCAST INTERCEPTORS FOR GRAPHICAL BURSTS
    socket.on('player_eliminated', (payload) => {
        if(payload.roomId) {
            io.to(payload.roomId).emit('play_elimination_effect', {
                x: payload.x, y: payload.y, color: payload.color
            });
        }
    });

    socket.on('disconnect', () => {
        // AUTOMATED MEMORY STORAGE RESETS ON CLIENT EXIT
        MATCH_ROOMS.GLOBAL_MULTIPLAYER.forEach((room, id) => {
            if (room.connectedClients.has(socket.id)) room.connectedClients.delete(socket.id);
            if (room.connectedClients.size === 0) MATCH_ROOMS.GLOBAL_MULTIPLAYER.delete(id);
        });
        
        io.emit('global_metric_sync', { totalOnline: io.engine.clientsCount });
    });
});

const TARGET_PORT = process.env.PORT || 3000;
server.listen(TARGET_PORT, () => {
    console.log(`==================================================`);
    console.log(` TOPO GAME STEAM ENGINE MASTER LISTENING ON: ${TARGET_PORT}`);
    console.log(`==================================================`);
});
