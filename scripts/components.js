/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

class Component {
    constructor(x, y, w, h, color, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;

        this.wizImg = new Image();
        this.wizImg.src = '../docs/assets/images/walk right1.png'
    }
    draw(){
        this.ctx.drawImage(this.wizImg, this.x, this.y, this.w, this.h);
    }

    newPos() {
        // Screen limit X axis
        if (this.x + 256 > canvas.width){
            this.x = canvas.width - 256;
            this.speedX = 0
        }
        else if (this.x < 0){
            this.x = 0;
            this.speedX = 0

        }
        // Screen limit Y axis
        else if (this.y + 256 > canvas.height){
            this.y = canvas.height - 256;
            this.speedY = 0
        }
        else if (this.y < 0){
            this.y = 0;
            this.speedY = 0
        }
        else {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.h;
    }
    left() {
        return this.x;
    }
    right() {
        return this.x + this.w;
    }

    crashWith(enemy) {
        return !(
            this.bottom() < enemy.top() ||
            this.top() > enemy.bottom() ||
            this.right() < enemy.left() ||
            this.left > enemy.right()
        );
    };
};

class Enemy {
    constructor(x, y, w, h, color, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;
    }
    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.h;
    }
    left() {
        return this.x;
    }
    right() {
        return this.x + this.w;
    }
    crashWith(projectile) {
        return !(
            this.bottom() < projectile.top() ||
            this.top() > projectile.bottom() ||
            this.right() < projectile.left() ||
            this.left > projectile.right()
        );
    };
};

/* class Projectiles {
    constructor(x, y, w, h, direction, color, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.direction = direction;
        this.color = color;
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;
    }
    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.h;
    }
    left() {
        return this.x;
    }
    right() {
        return this.x + this.w;
    }
    crashWith(projectile) {
        return !(
            this.bottom() < projectile.top() ||
            this.top() > projectile.bottom() ||
            this.right() < projectile.left() ||
            this.left > projectile.right()
        );
    };
}; */
