"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var node_http_1 = require("node:http");
var socket_io_1 = require("socket.io");
var Slave_1 = require("./classes/Slave");
var app = express();
var server = (0, node_http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    },
    pingInterval: 1000,
    pingTimeout: 2500
});
io.listen(server);
var players = {};
var playerPositions = {};
function movePlayer(player, newKeyStroke) {
    player.keyStroke.w = newKeyStroke.w;
    player.keyStroke.a = newKeyStroke.a;
    player.keyStroke.s = newKeyStroke.s;
    player.keyStroke.d = newKeyStroke.d;
    if (player.keyStroke.keyDown)
        return;
    player.keyStroke.keyDown = true;
    player.intervalId = setInterval(function () {
        if (!player.keyStroke.keyDown
            || !player.keyStroke.isKeyPressed()) {
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
io.on('connection', function (socket) {
    var player = new Slave_1.Employee();
    player.position.id = player.id;
    players[player.id] = player;
    playerPositions[player.id] = player.position;
    console.log(playerPositions);
    socket.emit("initPlayer", player.id, players);
    io.emit('playerJoined', player.id);
    console.log('a user connected');
    socket.on('disconnect', function () {
        delete players[player.id];
        delete playerPositions[player.id];
        io.emit('playerLeft', player.id);
        console.log('user disconnected');
    });
    socket.on('movePlayer', function (newKeyStroke) {
        movePlayer(player, newKeyStroke);
        //console.log("A player has moved!");
    });
});
var intervalID = setInterval(function () {
    io.emit('updatePlayerPositions', playerPositions);
}, 16);
server.listen(3000, function () {
    console.log('server running at http://localhost:3000');
});
