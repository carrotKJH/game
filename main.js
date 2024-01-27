var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var draw_base_y = 200
var darw_max_y = 50
var gameoverText = document.getElementById('gameover');
var scoreText = document.getElementById('score');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight -300;


var dainoImage = new Image();
dainoImage.src = 'sonic.png';

var dino = {
    x: 10,
    y: draw_base_y,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dainoImage, this.x, this.y, this.width, this.height );
    }
}


var catusImage = new Image();
catusImage.src = 'ddong.png';

class Cactus {
    constructor() {
        this.x = 800;
        this.y = draw_base_y;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(catusImage, this.x, this.y, this.width, this.height);
    }
}


var dainoMovingStep = 3;
var cactusMovingStep = 2;
var timer = 0;
var cactus여러개 = [];
var rand = Math.floor(Math.random() * 150) + 50;
console.log(rand);
var 점프timer = 0
var animation; 
var gameOver = false;
var score = 0;
var cactusTimer = 0;
function 프레임마다실행할것() {
    animation = requestAnimationFrame(프레임마다실행할것);
    timer ++;
    cactusTimer ++;
    if (timer % 120 === 0) {
        scoreText.innerHTML = score;    
        score ++;
    }
    
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if (cactusTimer % rand === 0) {
        //console.log(rand)
        var cactus = new Cactus();
        cactus여러개.push(cactus);
        rand = Math.floor(Math.random() * 150) + 50;
        cactusTimer = 0;
    }
    
    cactus여러개.forEach((a,i,o) => {
        if (a.x < 0) {
            o.splice(i, 1)
        }

        //a.x--;
        catusMovingLocation = a.x - cactusMovingStep;
        a.x = catusMovingLocation;
        충돌하냐(dino, a);
        a.draw();
    }) 
    if (점프중 == true) {
        //dino.y--;
        //dino.y = dino.y-dainoMovingStep;
        var currntLocation = dino.y-dainoMovingStep;
        if (currntLocation < darw_max_y){
            currntLocation = darw_max_y;
            점프중 = false;
        }
        dino.y = currntLocation;       
        점프timer++;
    }

    if (점프중 == false) {
        if (dino.y < draw_base_y) {
            var downLocation = dino.y + dainoMovingStep;
            if (downLocation > draw_base_y) {
                downLocation = draw_base_y;
            }
            //dino.y++;
            //dino.y = Math.max(dino.y + dainoMovingStep, draw_base_y);
            dino.y = downLocation;
        }
    }
    if (점프timer > 100) {
        점프중  = false;
        점프timer = 0;
    }
    dino.draw();
}

프레임마다실행할것();

// 충돌확인
function 충돌하냐(dino, cactus) {
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < -2 && y축차이 < -2) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        gameOver = true;
        gameoverText.style.visibility = "visible";
    }
}

var 점프중 = false;
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (gameOver) {
            gameOver = false;
            score = 0;
            cactus여러개 = [];
            gameoverText.style.visibility = "hidden";
            프레임마다실행할것();
        } else {
            if (dino.y >= draw_base_y-3) {
                점프중 = true;
            }
        }
    }
})

document.addEventListener("touchstart", function(e) {
    if (gameOver) {
        gameOver = false;
        score = 0;
        cactus여러개 = [];
        gameoverText.style.visibility = "hidden";
        프레임마다실행할것();
    } else {
        if (dino.y >= draw_base_y-3) {
            점프중 = true;
        }
    }
})