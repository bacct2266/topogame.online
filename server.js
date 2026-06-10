const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const PORT = 3000;

// הגדרה קריטית: אומרת לשרת להנגיש את כל הקבצים שבתוך תיקיית public
app.use(express.static(path.join(__dirname, 'public')));

// ניתוב ברירת מחדל שמציג את קובץ ה-HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ניהול חיבורי שחקנים (Socket.io)
let onlinePlayers = 0;

io.on('connection', (socket) => {
    onlinePlayers++;
    
    // שליחת כמות המחוברים לכולם
    io.emit('global_metric_sync', { totalOnline: onlinePlayers });

    socket.on('join_multiplayer', () => {
        socket.emit('match_joined', { roomId: 'GLOBAL_ROOM' });
    });

    socket.on('disconnect', () => {
        onlinePlayers = Math.max(0, onlinePlayers - 1);
        io.emit('global_metric_sync', { totalOnline: onlinePlayers });
    });
});

http.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
