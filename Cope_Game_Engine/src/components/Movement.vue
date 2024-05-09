<script setup lang="ts">
    
    import { ref } from 'vue';
    import { KeyStroke } from "../classes/KeyStroke"
    import { Employee } from "../classes/Slave"
    import { XYCoordinates } from "../classes/XYCoordinates"

    import { io } from 'socket.io-client';

    const socketIO = io("/");

    const newKeyStroke = new KeyStroke();

    var players: {[id: number]: Employee | undefined} = {};
    var playerPositions: {[id: number]: XYCoordinates} = {};
    const playersRef = ref(players);
    const playerPositionsRef = ref(playerPositions);

    const player = ref(new Employee());

    function addPlayer(id: number, name?: string, keyStroke?: KeyStroke): Employee | undefined {
        var newPlayer = new Employee("", new XYCoordinates(0, 0));
        newPlayer.id = id;
        newPlayer.name = name ?? "Default";

        playersRef.value[id] = newPlayer;
        players[id] = newPlayer;

        console.log("new player", name, playersRef.value[id]);

        //console.log("Player " + id + " added: ", players[id]);

        return playersRef.value[id];
    }
    function removePlayer(id: number): void {
        if (playersRef.value[id]! == undefined
        || playersRef.value[id]!.keyStroke == undefined)
        {
            return;
        }

        playersRef.value[id]!.keyStroke.keyDown = false;

        delete playersRef.value[id];
        delete players[id];
    }
    function movePlayer(id: number, keyStroke: KeyStroke): void {
        //console.log("Player " + id + " moved to " + value._position._x);
        //console.log("movePlayer", playersRef.value[id]);

        playersRef.value[id]!.keyStroke.w = keyStroke.w;
        playersRef.value[id]!.keyStroke.a = keyStroke.a;
        playersRef.value[id]!.keyStroke.s = keyStroke.s;
        playersRef.value[id]!.keyStroke.d = keyStroke.d;

        if (playersRef.value[id]!.keyStroke.keyDown) return;

        playersRef.value[id]!.keyStroke.keyDown = true;

        playersRef.value[id]!.intervalId = setInterval(function(){
            if(!playersRef.value[id]!.keyStroke.keyDown 
            || !playersRef.value[id]!.keyStroke.isKeyPressed()){
                clearInterval(playersRef.value[id]!.intervalId);    
                playersRef.value[id]!.keyStroke.keyDown = false;
                // console.log("keyStrokeUp");
            }

            if (playersRef.value[id]!.keyStroke.s) {
                playersRef.value[id]!.position.x += 5;
            }
            if (playersRef.value[id]!.keyStroke.w) {
                playersRef.value[id]!.position.x -= 5;
            }
            if (playersRef.value[id]!.keyStroke.a) {
                playersRef.value[id]!.position.y -= 5;
            }
            if (playersRef.value[id]!.keyStroke.d) {
                playersRef.value[id]!.position.y += 5;
            }

            
            console.log("Key Held Down!");
        }, 1);

        console.log("Opponent Moved!");
    }

    newKeyStroke.listenKeyPush("keyStrokeDown", () => {
        
        socketIO.emit("movePlayer", newKeyStroke);
        console.log("keyStrokeDown");

        if (newKeyStroke.keyDown) return;

        newKeyStroke.keyDown = true;

        player.value.intervalId = setInterval(function(){
            if(!newKeyStroke.keyDown){
                clearInterval(player.value.intervalId);    

                // console.log("keyStrokeUp");
            }

            if (newKeyStroke.s) {
                topPos.value += 5;
                player.value.position.y = topPos.value;
                playersRef.value[player.value.id]!.position.y = topPos.value;
            }
            if (newKeyStroke.w) {
                topPos.value -= 5;
                player.value.position.y = topPos.value;
                playersRef.value[player.value.id]!.position.y = topPos.value;
            }
            if (newKeyStroke.a) {
                leftPos.value -= 5;
                player.value.position.x = leftPos.value;
                playersRef.value[player.value.id]!.position.x = leftPos.value;
            }
            if (newKeyStroke.d) {
                leftPos.value += 5;
                player.value.position.x = leftPos.value;
                playersRef.value[player.value.id]!.position.x = leftPos.value;
            }
            
            console.log("Key Held Down!");
        }, 1);
    });

    newKeyStroke.listenKeyPush("keyStrokeUp", () => {
        socketIO.emit("movePlayer", newKeyStroke);
    });

    const block = ref(null);
    const topPos = ref(0);
    const leftPos = ref(0);

    addEventListener("keydown", (event) => {
        newKeyStroke.pressKey(event.key);
    });

    addEventListener("keyup", (event) => {
        newKeyStroke.releaseKey(event.key);
    });
    
    socketIO.on('connect', () => {
        console.log('connected');
    });

    socketIO.on("initPlayer", (id: number, playersInit: {[id: number]: Employee}) => {
        player.value = addPlayer(id, "Player", newKeyStroke)!;

        for (const [key, plr] of Object.entries(playersInit)) {
            if (plr._id == player.value.id) {
                continue;
            }
            addPlayer(plr._id, "Player2");
            console.log(key, plr);
        }

        console.log("Initiated Player", playersInit);
        //console.log(playersRef.value[id], playersRef.value);
    })

    socketIO.on('playerJoined', (id: number) => {
        if (playersRef.value[id] !== undefined) 
            return;

        addPlayer(id);

        console.log("Player Joined", id, playersRef.value[id]);
    });

    socketIO.on("playerLeft", (id: number) => {
        removePlayer(id);

        console.log(id);
    });

    socketIO.on('movePlayer', (id, keyStrokes: KeyStroke) => {
        //console.log("Socket movePlayer",value2);
        if (id == player.value.id) {
            //console.log(value2._id, player.value.id);
            return;
        }

        movePlayer(id, keyStrokes);

        //console.log(id, keyStrokes);
    });

    socketIO.on("updatePlayerPositions", (plrPositions: {[id: number]: XYCoordinates}) => {
        playerPositionsRef.value = plrPositions;
        playerPositions = plrPositions;

        //console.log("Updated Player Positions", playerPositionsRef.value);
    })

</script>

<template>
    <div>
        <h1>Home</h1>
        <div v-for="(plr, key) in playersRef" :key="key">
            Hello
            <div v-if="playersRef[plr!.id] != undefined" ref="block" 
            :style="{ 
                left: (playerPositionsRef[plr!.id] != null ? playerPositionsRef[plr!.id]._x+'px': 500+'px'),  
                top: (playerPositionsRef[plr!.id] != null ? playerPositionsRef[plr!.id]._y+'px': 500+'px'),
                }" class="absolute my-red size-20">
                {{ plr!.id }}
                {{ plr!.name }}
                {{ playerPositionsRef[plr!.id] }}
            </div>
        </div>
        <div> {{ playersRef }} </div>
        <div> {{ playerPositionsRef }} </div>
        <!--
        <div v-for="(item, key) in playersRef" ref="block" :style="{}" class="absolute my-red size-20">
            {{ playersRef }}
        </div>
        -->
    </div>
</template>