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
    }
    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    newPos() {
        // Screen limit X axis
        if (this.x + 75 > canvas.width){
            this.x = canvas.width - 75;
            this.speedX = 0
        }
        else if (this.x < 0){
            this.x = 0;
            this.speedX = 0

        }
        // Screen limit Y axis
        else if (this.y + 75 > canvas.height){
            this.y = canvas.height - 75;
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
