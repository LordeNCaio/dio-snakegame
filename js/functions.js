let canvas = /** @type {HTMLCanvasElement} */ document.getElementById('snakegame');
let context = /**@type {CanvasRenderingContext2D} */ canvas.getContext('2d');
let box = 16;

let papa = [];
papa[0] = {
    x: 20*box,
    y: 15*box,
}

let food = {
    x: Math.floor(Math.random() * 39 + 1) * box,
    y: Math.floor(Math.random() * 29 + 1) * box
}

var dir = 'up';

function CreateBackground(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 40*box, 30*box);
}

function CreatePapa(){
    const papaImg = new Image;
    papaImg.src = '../img/pe.png';
    const foodImg = new Image;
    foodImg.src = '../img/g.png';
    for(var i = 0; i < papa.length; i++){
        context.fillStyle = 'red';
        if(i == 0){
            context.drawImage(papaImg, papa[0].x, papa[0].y);
        }
        else{
            context.drawImage(foodImg, papa[i].x, papa[i].y);
        }        
    }
}

function DrawGhoul(){
    const foodImg = new Image;
    foodImg.src = '../img/g.png';
    context.drawImage(foodImg, food.x, food.y);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37){
        dir = 'left';
    }
    else if(event.keyCode == 38){
        dir = 'up';
    }
    else if(event.keyCode == 39){
        dir = 'right';
    }
    else if(event.keyCode == 40){
        dir = 'down';
    }

    console.log(dir);
}


function StartGame(){
    if(papa[0].x > 40*box && dir == 'right') papa[0].x = 0;
    if(papa[0].x < 0 && dir == 'left') papa[0].x = 40*box;
    if(papa[0].y > 30*box && dir == 'down') papa[0].y = 0;
    if(papa[0].y < 0 && dir == 'up') papa[0].y = 30*box;

    for(var i = 1; i<papa.length; i++){
        if(papa[0].x == papa[i].x && papa[0].y == papa[i].y){
            clearInterval(game);
            alert("Papa Emeritus doesn't approve")
        }
    }

    CreateBackground();
    CreatePapa();
    DrawGhoul();

    let papaX = papa[0].x;
    let papaY = papa[0].y;
    if(dir == 'up') papaY-=box;
    if(dir == 'down') papaY+=box;
    if(dir == 'left') papaX-=box;
    if(dir == 'right') papaX+=box;

    if(papaX != food.x || papaY != food.y){
        papa.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 39 + 1) * box;
        food.y = Math.floor(Math.random() * 29 + 1) * box;
    }

    let newHead ={
        x: papaX,
        y: papaY
    }

    papa.unshift(newHead);

}

let game = setInterval(StartGame, 100);
