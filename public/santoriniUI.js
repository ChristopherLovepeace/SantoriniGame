let floors = ["#AAAAAA","#CCCCCC","#EEEEEE","#0000FF"];
let ground = ["#55FF55", "#00DD00"];
let arr = [];
const tileSize = 80;
let turn = 0;
let moveChar = true;
let placeBlock = false;
let allPlaced = false;
let moving = false;
let np = 0;
let nm = 0;
let player = [];
player[0] = {x: -1, y: -1};
player[1] = {x: -1, y: -1};
player[2] = {x: -1, y: -1};
player[3] = {x: -1, y: -1};



async function runGame(gameid){
    

    let data = await getGameByGameID(gameid);
    console.log(data.result);
    let canvas = document.querySelector("#gameCanvas");
    let ctx = canvas.getContext("2d");
    writeTilesArray(data.result.game_state);
    function writeTilesArray(gamestate){
        
            for(let i = 0; i < 5; i++) {
                arr.push([]);
                for(let j = 0; j < 5; j++) {
                    arr[i][j] = 0;
                }
            }
        
    }
    pickTheme(data.result.game_theme);
    function pickTheme(theme){
        if(theme==2){
            floors=["#AAAAAA","#CCCCCC","#EEEEEE","#0303b2"];
            ground=["#005100", "#008c00"];
        }
    }
    drawTiles();
    function drawTiles(){
        let k = 0;
        for(var i = 0; i < 5; i++) {
            for(var j = 0; j < 5; j++) {
                k += 1;
                if(arr[i][j] > 0) ctx.fillStyle = floors[(arr[i][j])-1];
                else if(k % 2 == 0) ctx.fillStyle = ground[0];
                else ctx.fillStyle = ground[1];
                ctx.fillRect(tileSize*j, tileSize*i, tileSize*j+tileSize, tileSize*i+tileSize);
            }
        }
    }
    function update() {
        drawTiles();
        for(var h = 0; h < player.length; h++) {
            let k = 0;
            ctx.beginPath();
            ctx.arc(player[h].x*tileSize+tileSize/2, player[h].y*tileSize+tileSize/2, 50, 0, 2 * Math.PI);
            if(h > 1) ctx.fillStyle = "blue"
            else ctx.fillStyle = 'red';
            ctx.fill();
            //ctx.stroke();
            ctx.font = "30px Arial";
            ctx.fillStyle = "black";
            //ctx.fillText(h,player[h].x,player[h].y);
            //let s = [];
            //ctx.fillText(s[h],player[0].x,player[0].y);   
            ctx.fillText(h,player[h].x*tileSize+tileSize/2,player[h].y*tileSize+tileSize/2);
        }
    }
    canvas.addEventListener('mousemove', function yo(u) {
        update();
        var mx = Math.floor((event.clientX - canvas.offsetLeft) / tileSize);
        var my = Math.floor((event.clientY - canvas.offsetTop) / tileSize);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillStyle = ctx.fillRect(mx*tileSize, my*tileSize, mx+tileSize, my+tileSize); 
    
        if(player[np].x == -1) {
            ctx.beginPath();
            ctx.arc(mx*tileSize+tileSize/2, my*tileSize+tileSize/2, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }
        console.log(moving);
        if(moving && player[pickChar(mx,my)].x == -1 && allPlaced) {
            ctx.beginPath();
            ctx.arc(mx*tileSize+tileSize/2, my*tileSize+tileSize/2, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }
    });
    canvas.addEventListener('click', function(event) {
        var mx = Math.floor((event.clientX - canvas.offsetLeft) / tileSize);
        var my = Math.floor((event.clientY - canvas.offsetTop) / tileSize);

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
        
        update();
    
    });
    update();
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
    
}

function runGame2(){

    
    ctx.font = "100px Arial";
    
    
    async function getGameInfo(){
        //get game state
        //get game theme
        
        //get game rounds
        
    }
    function drawPoints() {        
        ctx.fillStyle = "green";
        ctx.beginPath();        
        ctx.fillText(rounds, 270, 220);
        ctx.fill();
    }
    async function awaitUsers(){
        //get game users
        //if(data.result.gameusers.length != 2){awaitUsers()}
        //txtout waiting
        //else{}
        //
    }
    function refresh() {

        ctx.clearRect(0, 0, 600, 400);

        //draw()
        if (playing) {
            drawBall();
        }        

        requestAnimationFrame(refresh);
    }


}