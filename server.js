const players = {};

// לוגיקת החיבורים של המשחק
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    players[socket.id] = { roomId: null, x: 0, y: 0, radius: 20, color: '#ff0066' };

    socket.on('join_multiplayer', () => {
        const roomId = 'GLOBAL_ROOM';
        if (players[socket.id].roomId) socket.leave(players[socket.id].roomId);
        
        socket.join(roomId);
        players[socket.id].roomId = roomId; 
        socket.emit('match_joined', { roomId: roomId });
    });

    socket.on('join_private', (code) => {
        const roomId = 'PRIVATE_' + code;
        if (players[socket.id].roomId) socket.leave(players[socket.id].roomId);

        socket.join(roomId);
        players[socket.id].roomId = roomId; 
        socket.emit('match_joined', { roomId: roomId });
    });

    // עדכון מיקום וצבע מהלקוח
    socket.on('player_update', (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            players[socket.id].radius = data.radius;
            if (data.color) players[socket.id].color = data.color;
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        console.log('User disconnected:', socket.id);
    });
});

// שליחת עדכונים מופרדים לפי חדרים ב-30FPS
setInterval(() => {
    const roomsData = {};
    
    for (const [id, player] of Object.entries(players)) {
        if (!player.roomId) continue; 
        
        if (!roomsData[player.roomId]) {
            roomsData[player.roomId] = [];
        }
        
        roomsData[player.roomId].push({
            id: id,
            x: player.x,
            y: player.y,
            radius: player.radius,
            color: player.color
        });
    }

    for (const roomId in roomsData) {
        io.to(roomId).emit('world_state_update', { players: roomsData[roomId] });
    }
}, 33);
