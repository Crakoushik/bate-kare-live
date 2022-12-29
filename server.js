const express = require('express');
const app = express();
const http = require('http').createServer(app);

http.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port " + (process.env.PORT || 3000));
})



//vercel 


app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// if (process.env.NODE_ENV == 'production') {
//     app.use(express.static(__dirname + '/public'));
//     app.get('/', (req, res) => {
//         res.sendFile(__dirname + '/index.html');
//     })
// } else {
//     app.use(express.static(__dirname + '/public'));
//     app.get('/', (req, res) => {
//         res.sendFile(__dirname + '/index.html');
//     })
// }

//-socket setUp in server.js-//
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('Connected')

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    });
}); 