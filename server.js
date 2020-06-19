const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var ws;
server.listen(8080);

app.get('/on', (req, res) => {
  console.log('sending switch ON data');
  if(ws != undefined) {
    ws.emit('switch',{switch:'1'});
    res.send('Switch ON signal sent.');
  }
  else {
    console.log('websocket is unavailable, switch ON');
    res.send('websocket is unavailable, switch ON');
  }

});

app.get('/off', (req, res) => {
  
  console.log('sending switch OFF data');
  if(ws != undefined) {
    ws.emit('switch',{switch:'0'});
    res.send('Switch OFF signal sent.');
  }
  else {
    console.log('websocket is unavailable, switch OFF');
    res.send('websocket is unavailable, switch OFF');
  }
});

io.on('connection', (socket) => {
  ws = socket;
  console.log('client connected...');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
