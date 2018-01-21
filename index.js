var express = require('express')
var socket = require('socket.io')
// the app

var app = express();
var server = app.listen(4000,function(){
console.log("listening for reqs from port 4000 !");
});

//static files

app.use(express.static('public'));

//socket.io

var io = socket(server);

io.on('connection',function(socket){

	console.log("made socket connection ! ",socket.id);

    // Handle chat event
    socket.on('chat', function(data){
    	console.log(data);
    	io.sockets.emit('chat', data);
    });

    // handel typing event
    socket.on('typing',function(data){
    	console.log( data.handel + ' is typing a message');
    	socket.broadcast.emit('typing',data);
    });

});