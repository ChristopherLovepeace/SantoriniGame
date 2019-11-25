let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
const tile = 128;



var turn = 0;
var turntot = 0;
let moveChar = true;
let placeBlock = false;
var nm = 0;
var allPlaced = false;
var moving = false;

// all 4 characters x and y position set to out of bounds
var player = [];
player[0] = {x: -1, y: -1};
player[1] = {x: -1, y: -1};
player[2] = {x: -1, y: -1};
player[3] = {x: -1, y: -1};

//creates the 5x5 array for each game cell
let gameState = "042230412340230432042100324"
let s = 0;
let arr = [];
for(let i = 0; i < 5; i++) {
    arr.push([]);
    for(let j = 0; j < 5; j++) {
        arr[i][j] = gameState.charAt(s);
        s += 1;
    }
}



let np = 0;
var mp = 0;

//colors for all 4 building states
floors=["#AAAAAA","#CCCCCC","#EEEEEE","#BBBBFF"];


function update() {

    //draw the grass and buildings
    let k = 0;
    for(var i = 0; i < 5; i++) {
        for(var j = 0; j < 5; j++) {
            k += 1;
            if(arr[i][j] > 0) ctx.fillStyle = floors[(arr[i][j])-1];
            else if(k % 2 == 0) ctx.fillStyle = "#00DD00";
            else ctx.fillStyle = "#55FF55";
            ctx.fillRect(tile*j, tile*i, tile*j+tile, tile*i+tile);
        }
    }

    //draw all 4 characters, 2 blue and 2 red for each player
    for(var h = 0; h < player.length; h++) {
        ctx.beginPath();
        ctx.arc(player[h].x*tile+tile/2, player[h].y*tile+tile/2, 50, 0, 2 * Math.PI);
        if(h > 1) ctx.fillStyle = "blue"
        else ctx.fillStyle = 'red';
        ctx.fill();
        //ctx.stroke();
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        //ctx.fillText(h,player[h].x,player[h].y);
        //let s = [];
        //ctx.fillText(s[h],player[0].x,player[0].y);   
        ctx.fillText(h,player[h].x*tile+tile/2,player[h].y*tile+tile/2);
    }

    //draw rectangle for where you are building
    if(placeBlock && !moving) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 255, 0.2)";
        ctx.rect((player[mp].x-1)*tile, (player[mp].y-1)*tile, (player[mp].x+1)*tile, (player[mp].y+1)*tile);
        ctx.stroke();
        //ctx.fillStyle = ctx.fillRect(player[mp].x*tile, player[mp].y*tile, player[mp].x*tile+tile, player[mp].y*tile+tile); 
    }  


}


//click event inside the board
c.addEventListener('click', function(event) {

    //decides what cell you've clicked 0-4 x,y
    var mx = Math.floor((event.clientX - c.offsetLeft) / tile);
    var my = Math.floor((event.clientY - c.offsetTop) / tile);

    //places the held character
    if(moving && !charHere(mx,my) && placeHere(mx,my)) {
        player[mp].x = mx;
        player[mp].y = my;
    }

    //allows for picking up a character
    if(allPlaced && moveChar && charHere(mx,my)) {


        if(pickChar(mx,my) != -1) {
            mp = [pickChar(mx,my)]
            moving = true;
            moveChar = false;
        }
        //console.log("picked up char");
    }


    //place all chars for the first time
    if(!charHere(mx,my) && !allPlaced) {
        
        player[mp].x = mx;
        player[mp].y = my;
        mp += 1;
        //all placed
        if(mp > 4) {
            allPlaced = true;
            moveChar = true
        }


    }


    //allows for building on a cell
    if(arr[my][mx] < 4 && placeBlock && !moving) {
 
        
        if(placeHere(mx,my) && !charHere(mx,my)) {
            arr[my][mx] += 1;
            placeBlock = false;
            moveChar = true;
            turntot += 1;
            turn = turntot % 2;
        }
    }   


    update()
});

//listener for mouse movement on canvas
c.addEventListener('mousemove', function yo(u) {
    update()

    //decides what cell you're hovering over
    var mx = Math.floor((event.clientX - c.offsetLeft) / tile);
    var my = Math.floor((event.clientY - c.offsetTop) / tile);

    //draw rectangle for what cell you're hovering over
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillStyle = ctx.fillRect(mx*tile, my*tile, mx+tile, my+tile); 
    if(placeBlock) {
        ctx.beginPath()
        ctx.rect(mx*tile, my*tile, mx+tile, my+tile);
        ctx.stroke(); 
    }

    //character in hand
    if(moving && player[mp].x == -1) {
        ctx.beginPath();
        ctx.arc(mx*tile+tile/2, my*tile+tile/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

    if(moving && player[mp].x == -1 && allPlaced) {
        ctx.beginPath();
        ctx.arc(mx*tile+tile/2, my*tile+tile/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
});

function placeHere(mx,my){

    if(mx == player[mp].x-1 || mx == player[mp].x+1 && my == player[mp].y-1 || my == player[mp].y+1) {
        return 1;
    }
}


function moveOnBuild(mx,my) {
    if((arr[my][mx] - arr[player[mp].y][player[mp].x]) < 2) {
        player[mp].x = mx;
        player[mp].y = my;
    }
}



function charHere(mx,my) {
    for(let i of player) {
        if(i.x == mx && i.y == my) {
            return true;
        }
    }
}

function pickChar(mx,my) {
    for(let i of player) {
		if(i.x == mx && i.y == my) {
            //checks if its the right color for the player
            if((turn+1) / 2 > 1.25) {

                moveChar = false;
                placeBlock = true;
                return i;
            }
		} else return -1;
	}
}


update()