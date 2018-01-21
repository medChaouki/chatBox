// make connection

var socket = io.connect("http://localhost:4000");

// interface variables

var message = document.getElementById('message'),
	handel = document.getElementById('handel'),
	button = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// usefull functions

function clearTextField(fieldId)
{
	document.getElementById(fieldId).value = '';
};


//Emit events

button.addEventListener('click',function(){
	socket.emit('chat',{
	message:message.value,
	handel:handel.value
	});
	message.value = '';
});


message.addEventListener('keypress',function(){
	socket.emit('typing',{
		handel:handel.value
	});
});


// Listen for events

socket.on('chat',function(data){

	output.innerHTML += '<p><strong>'+ data.handel +':</strong> '+data.message+'<p>';

});

socket.on('typing',function(data){
	output.innerHTML = '<p><em>'+data.handel+' is typing a message ... </em></p>';
});