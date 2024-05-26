let player;
let obstacles = [];
let backgroundImage;

function preload() {
    backgroundImage = loadImage('background.png'); // Carregar a imagem de fundo
}

function setup() {
    createCanvas(800, 400);
    player = new Player();
    obstacles.push(new Obstacle());
}

function draw() {
    background(backgroundImage); // Desenhar a imagem de fundo

    player.update();
    player.show();

    if (frameCount % 60 == 0) {
        obstacles.push(new Obstacle());
    }

    for (let obs of obstacles) {
        obs.update();
        obs.show();

        if (player.hits(obs)) {
            console.log('GAME OVER');
            noLoop();
        }
    }
}

function keyPressed() {
    if (key == ' ') {
        player.jump();
    }
}

class Player {
    constructor() {
        this.r = 50;
        this.x = 50;
        this.y = height - this.r;
        this.vy = 0;
        this.gravity = 1.5;
    }

    jump() {
        if (this.y == height - this.r) {
            this.vy = -25;
        }
    }

    hits(obstacle) {
        return collideRectRect(this.x, this.y, this.r, this.r, obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    }

    update() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.r);
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.r, this.r);
    }
}

class Obstacle {
    constructor() {
        this.w = random(20, 50);
        this.h = random(20, 80);
        this.x = width;
        this.y = height - this.h;
        this.speed = 6;
    }

    update() {
        this.x -= this.speed;
    }

    show() {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }
}
