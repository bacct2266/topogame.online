const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// --- כאן התיקון ---
// השרת יחפש את כל הקבצים (js, css, html) בתוך תיקיית public
app.use(express.static(path.join(__dirname, 'public')));
// ------------------

// ניתוב הבית - יטען את ה-index.html אוטומטית מתוך ה-public
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// לוגיקת החיבורים של המשחק
io.on('connection', (socket) => {
    console.log('User connected');

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
