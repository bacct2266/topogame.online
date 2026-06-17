// לוגיקת החיבורים של המשחק
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // שינוי: הוספנו את המאפיין roomId כדי שהשרת יזכור איפה השחקן
    players[socket.id] = { roomId: null, x: 0, y: 0, radius: 20, color: '#ff0066' };

    socket.on('join_multiplayer', () => {
        const roomId = 'GLOBAL_ROOM';
        socket.join(roomId);
        players[socket.id].roomId = roomId; // שמירת החדר לשחקן
        socket.emit('match_joined', { roomId: roomId });
    });

    socket.on('join_private', (code) => {
        const roomId = 'PRIVATE_' + code;
        socket.join(roomId);
        players[socket.id].roomId = roomId; // שמירת החדר לשחקן
        socket.emit('match_joined', { roomId: roomId });
    });

    // עדכון מיקום מהלקוח
    socket.on('player_update', (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            players[socket.id].radius = data.radius;
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        console.log('User disconnected:', socket.id);
    });
});

// שינוי קריטי: שליחת עדכונים מופרדים לפי חדרים!
setInterval(() => {
    // 1. נארגן את כל השחקנים לפי החדרים שלהם
    const roomsData = {};
    
    for (const [id, player] of Object.entries(players)) {
        if (!player.roomId) continue; // שחקן שעדיין לא נכנס לחדר לא ישלח
        
        if (!roomsData[player.roomId]) {
            roomsData[player.roomId] = [];
        }
        
        // מוסיפים את השחקן לרשימה של החדר שלו
        roomsData[player.roomId].push({
            id: id,
            x: player.x,
            y: player.y,
            radius: player.radius,
            color: player.color
        });
    }

    // 2. נשלח לכל חדר רק את רשימת השחקנים שלו
    for (const roomId in roomsData) {
        // io.to(roomId) שולח אך ורק לשחקנים שנמצאים בחדר הספציפי
        io.to(roomId).emit('world_state_update', { players: roomsData[roomId] });
    }
}, 33);
