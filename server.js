const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var ws;
server.listen(8080);

app.get('/', (req, res) => {
  ws.emit('switch',{hello:'HELLLO'});
  console.log('sending switch data');
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  ws = socket;
  console.log('client connected...');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
