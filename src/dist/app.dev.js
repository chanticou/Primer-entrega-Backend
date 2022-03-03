"use strict";

var express = require('express');

var app = express();

var foodRoutes = require('./routes/Foods');

var cartRoutes = require('./routes/Cart');

var _require = require('socket.io'),
    Server = _require.Server;

var PORT = process.env.PORT || 8040;
var server = app.listen(PORT, function () {
  console.log("Listening on port ".concat(PORT));
});
var io = new Server(server); //Midleware

app.use(express["static"](__dirname + '/public')); //Midleware

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); //Para pdoer utilizar mis midleware 
//Cuando accedas a la ruta food, quiero que ejecutes mi router de foods 

app.use('/food', foodRoutes);
app.use('/api/cart', cartRoutes);
var log = [];
io.on('connection', function (socket) {
  console.log('Socket connected');
  socket.on('message', function (data) {
    log.push(data);
    socket.emit('history', log);
  });
}); // io.on('connection',(socket)=>{
//     socket.on('message', data=>{
//         console.log(data)
//     })
// })