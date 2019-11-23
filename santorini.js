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


var player = [];
player[0] = {x: -1, y: -1};
player[1] = {x: -1, y: -1};
player[2] = {x: -1, y: -1};
player[3] = {x: -1, y: -1};
console.log(player.length);
//floors=[floorImg0,floorImg1,floorImg2,floorImg3,floorImg4];
floors=["#AAAAAA","#CCCCCC","#EEEEEE","#BBBBFF"];

function pickChar(mx,my) {
    for(let i = 0; i < 4; i++) {
		if(player[i].x == mx && player[i].y == my) {
            //checks if its the right color for the player
            console.log("STEP 3")
            moveChar = false;
            placeBlock = true;
            return i;
            if((turn+1) / 2 > 1.25) {
                console.log("STEP 4")
                moveChar = false;
                placeBlock = true;
                return i;
            }
		} 
	}
}

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
            //ctx.drawImage(image,0,0,100,100,tile*j,tile*i,100,100);
        }
    }

    //draw the two players
    for(var h = 0; h < player.length; h++) {
        let k = 0;
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
    if(placeBlock && !moving) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 255, 0.2)";
        ctx.rect((player[mp].x-1)*tile, (player[mp].y-1)*tile, (player[mp].x+1)*tile, (player[mp].y+1)*tile);
        ctx.stroke();
        //ctx.fillStyle = ctx.fillRect(player[mp].x*tile, player[mp].y*tile, player[mp].x*tile+tile, player[mp].y*tile+tile); 
    }  

}


//creates the 5x5 array for each game cell
let arr = [];
for(let i = 0; i < 5; i++) {
    arr.push([]);
    for(let j = 0; j < 5; j++) {

        arr[i][j] = 0;

    }
}

let np = 0;

//click event inside the board
c.addEventListener('click', function(event) {

    //decides what cell you've clicked
    var mx = Math.floor((event.clientX - c.offsetLeft) / tile);
    var my = Math.floor((event.clientY - c.offsetTop) / tile);
    mp = [pickChar(mx,my)]; 
    //place the char and time to place building
    if(!isVacant(player,mx,my)) {
        console.log("placed char")
        mp = [pickChar(mx,my)]; 
        moving = false;
        placeBlock = true;
        player[mp].x = mx;
        player[mp].y = my;

    }
    
    /*//checks if the clicked cell is vacant
    let isVacant = true;
    for(let i of player) {
        if(i.x == mx && i.y == my) {
            isVacant = false;
            break;
        }
    }*/

    //allows for building on a cell
    if(arr[my][mx] < 4 && placeBlock && !moving) {
 
        
        if(placeHere(mx,my) && isVacant(player,mx,my)) {
            arr[my][mx] += 1;
            placeBlock = false;
            moveChar = true;
            turntot += 1;
            turn = turntot % 2;
        }
    }   
    //pick up a char
    if(moveChar && allPlaced) {
        console.log("STEP 1")
        if(pickChar(mx,my)) {
            console.log("STEP 2")
            mp = [pickChar(mx,my)];
            console.log(mp)
            player[mp].x = -1;
            moving = true;
            console.log("time to move char")
        }

    }


    //places a new character for the first time
    if(!allPlaced && player[np].x == -1 && isVacant) {
        //console.log(isVacant);
        player[np].x = mx;
        player[np].y = my;
        //console.log(np);
        //console.log(player[np]);
        if(np < 3) np += 1;
        else {
            //placeBlock = true;
            allPlaced = true;
            moveChar = true;
        }
    }

    
    //console.log(arr);
    update()
});

//listener for mouse movement on canvas
c.addEventListener('mousemove', function yo(u) {
    update()
    var mx = Math.floor((event.clientX - c.offsetLeft) / tile);
    var my = Math.floor((event.clientY - c.offsetTop) / tile);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillStyle = ctx.fillRect(mx*tile, my*tile, mx+tile, my+tile); 
    if(placeBlock) {
        ctx.beginPath()
        ctx.rect(mx*tile, my*tile, mx+tile, my+tile);
        ctx.stroke(); 
    }

    //character in hand
    if(player[np].x == -1) {
        ctx.beginPath();
        ctx.arc(mx*tile+tile/2, my*tile+tile/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

    console.log(moving);
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

/*function moveOnBuild(mx,my) {
    if(arr[my][mx])
}*/
///////////////////////////////////////////////////////// IsVacant breaks the game atm
//checks if the clicked cell is vacant
/*
function isVacant(mx,my) {
    console.log("runs shit")
    for(let i of player) {
        if(i.x == mx && i.y == my) {
            console.log("notvacant")
            return false;
        } else {
            console.log("isvacant")
            return true;
        }
    }
}*/

const isVacant=(players,mx,my) => players.some(p=>p.x==mx &&p.y==my)


update()        


//var image = new Image();
//image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjhNuIkFLnbGFuqsqawP9iYPer5t_NYlo1rsyXZSZHhNDgKk7iUg";
//ctx.drawImage(image,0,0,100,100,c.width,c.height, -50,100,100);



//console.log(arr);

/* idk assssss

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = "images/floorImg0";
    img.width = 64;
    img.height = 64;
    img.alt = "kys";

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}

show_image("images/floorImg0",64,64,"kys")*/
