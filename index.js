// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

//Socket.IO
// Chatroom
var robotName = "Smag";
var socketId;
var username;
var numUsers = 0;
var appState = {};
var messages = ["Essai de déplacer la sphère ( toi ) dans le rôle ( le cercle ).",
                "Pour commencer, 'TOI' tu es la SPHERE ROUGE, et pour prendre part à cette aventure, "
                + "tu dois prendre un 'ROLE' représenté par le CERCLE VIOLET.",
								"Salut, je m'appelle '"+robotName+"', et ceci est un nouveau jeu.",
						/*		"Maintenant que tu as donné un nom à ce 'ROLE', il va falloir lui donner sa 'RAISON D\'ETRE', c'est à dire .."*/
                "Bien, maintenant passons aux BOX, il y a deux boîtes, une verte et une bleue, laquelle choisis-tu ?"
                + "Glisse maintenant le 'ROLE' que tu viens de créer jusqu'à l'une de ces deux BOX.",
								"Une BOX représente une 'TENSION'. Une 'TENSION' est un écart entre ce qui est et ce qui devrait être.  "];

io.on('connection', function (socket) {

  var addedUser = false;

	// when the client emits 'add user', this listens and executes
	socket.on('add user', function (username) {
		if (addedUser) return;

		// we store the username in the socket session for this client
		socket.username = username;
		userId = socket.id;
		++numUsers;
		addedUser = true;
				console.log("user :" +username+" "+numUsers );
		socket.emit('login', {
			numUsers: numUsers
		});
		//envoi des trois premiers messages
		for (i=0;i<3;i++){
		socket.emit('new Robot message', {
			username: robotName,
			message: messages[i],
			level: 0
		});}
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsers: numUsers
		});
	});







  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('add role', function (role) {
		console.log("role :" +role);
	});



  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;
			console.log("deconnect "+ socket.username+" "+ numUsers);
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
