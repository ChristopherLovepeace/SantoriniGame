let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
const tile = 128;

let turn = 0;
let moveChar = true;

var player = [];
player[0] = {x: -1, y: -1};
player[1] = {x: -1, y: -1};
player[2] = {x: -1, y: -1};
player[3] = {x: -1, y: -1};
console.log(player.length);
//floors=[floorImg0,floorImg1,floorImg2,floorImg3,floorImg4];
floors=["#AAAAAA","#CCCCCC","#EEEEEE","#0000FF"];

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
        ctx.beginPath();
        ctx.arc(player[h].x*tile+tile/2, player[h].y*tile+tile/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

/*
for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
        k += 1;
        if(k % 2 == 0) ctx.fillStyle = "#00DD00";
        else ctx.fillStyle = "#55FF55";
        ctx.fillRect(tile*i, tile*j, tile*i+tile, tile*j+tile);
    }
}*/

let arr = [];

for(let i = 0; i < 5; i++) {
    arr.push([]);
    for(let j = 0; j < 5; j++) {

        arr[i][j] = 0;

    }
}

let np = 0;



c.addEventListener('click', function(event) {


    //var rect = c.getBoundingClientRect();
    var mx = Math.floor((event.clientX - c.offsetLeft) / tile);
    var my = Math.floor((event.clientY - c.offsetTop) / tile);
    //console.log(mx);
    //console.log(my);
    /*
    for(var i = 0; i < player.length; i++) {
        if(player[i].x == -1) {
            np = i;
            player[np].x = mx;
            player[np].y = my;
            console.log(player[np]);
        }
    }*/
    if(np < player.length) {
        if(player[np].x == -1) {
            moveChar = true;
            player[np].x = mx;
            player[np].y = my;
            console.log(player[np]);
            if(np < 3) np += 1;
        }

    }

    if(arr[my][mx] < 4) arr[my][mx] += 1;
    
    //console.log(arr);
    update()

    
    //console.log(event.clientX);
    //console.log(event.clientY);
});

c.addEventListener('mousemove', function yo(u) {
    update()
    var mx = Math.floor((event.clientX - c.offsetLeft) / tile);
    var my = Math.floor((event.clientY - c.offsetTop) / tile);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillStyle = ctx.fillRect(mx*tile, my*tile, mx+tile, my+tile); 

    if(player[np].x == -1) {
        ctx.beginPath();
        ctx.arc(mx*tile+tile/2, my*tile+tile/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }
});

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
