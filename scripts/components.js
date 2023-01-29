/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

class Player {
    constructor(x, y, w, h, direction, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.direction = direction;
        this.isFire = false;
        this.wizImg = new Image();
        this.wizImg.src = '../docs/assets/images/wizzard_f_idle_anim_f1.png'
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;

        
    }
    draw(){
        this.ctx.drawImage(this.wizImg, this.x, this.y, this.w, this.h);
    }

    newPos() {
        // Screen limit X axis
        if (this.x + 64 > canvas.width){
            this.x = canvas.width - 64;
            this.speedX = 0
        }
        else if (this.x < 0){
            this.x = 0;
            this.speedX = 0

        }
        // Screen limit Y axis
        else if (this.y + 84 > canvas.height){
            this.y = canvas.height - 84;
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
        this.isDead = false;
        this.speedX = 0.02;
        this.speedY = 0.005;
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

    class Background {
        constructor(ctx) {
            this.ctx = ctx;
            this.x = 0;
            this.velocity = -1;
            this.background = new Image();
            this.background.src = 'https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png';
        }
        move() {
            this.x += this.velocity;
            this.x %= canvas.width;
        }
        draw() {
            this.ctx.drawImage(this.background, this.x, 0, 1200, 600); // drawImage(image, dx, dy, dWidth, dHeight)
            if (this.velocity < 0) {
                ctx.drawImage(this.background, this.x + canvas.width, 0, 1200, 600);
            } else {
                ctx.drawImage(this.background, this.x - this.background.width, 0, 1200, 600);
            }
        }
    }

      
  class Projectile {
    constructor(color, direction, ctx) {
        this.x = player.x + 32;
        this.y = player.y + 42;
        this.w = 20;
        this.h = 20;
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
       crashWith(enemy) {
        return !(
            this.bottom() < enemy.top() ||
            this.top() > enemy.bottom() ||
            this.right() < enemy.left() ||
            this.left > enemy.right()
        );
    };  
};  
