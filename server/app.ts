import * as express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { Employee } from './classes/Slave';
import { KeyStroke } from './classes/KeyStroke';
import { XYCoordinates } from './classes/XYCoordinates';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    },
    pingInterval: 1000,
    pingTimeout: 2500
});

io.listen(server);

const players: {[id: number]: Employee} = {};
const playerPositions: {[id: number]: XYCoordinates} = {};

function movePlayer(player: Employee, newKeyStroke) {
    player.keyStroke.w = newKeyStroke.w;
    player.keyStroke.a = newKeyStroke.a;
    player.keyStroke.s = newKeyStroke.s;
    player.keyStroke.d = newKeyStroke.d;

    if (player.keyStroke.keyDown) return;
    player.keyStroke.keyDown = true;

    player.intervalId = setInterval(function(){
        if(!player.keyStroke.keyDown 
        || !player.keyStroke.isKeyPressed()){
            clearInterval(player.intervalId);    
            player.keyStroke.keyDown = false;
            // console.log("keyStrokeUp");
        }

        if (player.keyStroke.s) {
            player.position.y += 5;
        }
        if (player.keyStroke.w) {
            player.position.y -= 5;
        }
        if (player.keyStroke.a) {
            player.position.x -= 5;
        }
        if (player.keyStroke.d) {
            player.position.x += 5;
        }
    }, 1);

    console.log("Player Moved!");
}

io.on('connection', (socket) => {
    let player = new Employee();
    player.position.id = player.id;
    players[player.id] = player
    playerPositions[player.id] = player.position;

    console.log(playerPositions);

    socket.emit("initPlayer", player.id, players);
    io.emit('playerJoined', player.id);

    console.log('a user connected');

    socket.on('disconnect', () => {
        delete players[player.id];
        delete playerPositions[player.id];

        io.emit('playerLeft', player.id);

        console.log('user disconnected');
    });
    socket.on('movePlayer', (newKeyStroke) => {
        movePlayer(player, newKeyStroke);

        //console.log("A player has moved!");
    });
});

let intervalID = setInterval(function() {
    io.emit('updatePlayerPositions', playerPositions);
}, 16);

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});