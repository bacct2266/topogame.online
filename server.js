const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// זה החלק הכי חשוב למניעת 404:
app.use(express.static(path.join(__dirname, 'public')));

// שאר הקוד...
// ------------------

// ניתוב הבית - יטען את ה-index.html אוטומטית מתוך ה-public
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// לוגיקת החיבורים של המשחק
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('join_multiplayer', () => {
        const GLOBAL_ROOM = 'GLOBAL_GAME_ROOM';
        socket.join(GLOBAL_ROOM); 
        socket.emit('match_joined', { roomId: GLOBAL_ROOM });
        console.log(`Player ${socket.id} joined ${GLOBAL_ROOM}`);
    });
    
    // כאן תוכל להוסיף עוד מאזינים כמו join_private בעתיד
});    

    socket.on('join_multiplayer', () => {
        socket.emit('match_joined', { roomId: 'GLOBAL_ROOM' });
    });

    socket.on('join_private', (code) => {
        socket.emit('match_joined', { roomId: 'PRIVATE_' + code });
    });
});

// הפעלת השרת
http.listen(3000, () => {
    console.log('Server is running on http://localhost:6767');
});
