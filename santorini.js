let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
const tile = 128;



let turn = 0;
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
floors=["#AAAAAA","#CCCCCC","#EEEEEE","#0000FF"];

function pickChar(mx,my) {
    for(let i = 0; i < 3; i++) {
		if(player[i].x == mx && player[i].y == my) {
            moveChar = false;
            placeBlock = true;
			return i;
		} else {
            return -1;
        }	
	}
}

function update() {


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

    //checks if the clicked cell is vacant
    let isVacant = false;
    for(let i of player) {
        if(i.x == mx && i.y == my) {
            isVacant = false;
            break;
        }else{
            isVacant = true;
        }
    }

    //allows for building on a cell
    if(arr[my][mx] < 4 && placeBlock) arr[my][mx] += 1;

    //when its time to move a char
    if(moveChar && allPlaced) {
        mp = [pickChar(mx,my)];
        player[mp].x = -1;
        moving = true;
        console.log("kms")
    }

    //places a new character,0
    if(player[np].x == -1 && isVacant) {
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
    update();
    var mx = Math.floor((event.clientX - c.offsetLeft) / tile);
    var my = Math.floor((event.clientY - c.offsetTop) / tile);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillStyle = ctx.fillRect(mx*tile, my*tile, mx+tile, my+tile); 

    //character in hand
    if(player[np].x == -1) {
        ctx.beginPath();
        ctx.arc(mx*tile+tile/2, my*tile+tile/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

    console.log(moving);
    if(moving && player[pickChar(mx,my)].x == -1 && allPlaced) {
        ctx.beginPath();
        ctx.arc(mx*tile+tile/2, my*tile+tile/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
});

update()
