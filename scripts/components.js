/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

class Player {
    constructor(x, y, w, h, direction, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.direction = direction;
        this.ctx = ctx;
        this.isFire = false;
        this.speedX = 0;
        this.speedY = 0;
        
        const img1 = new Image();
        const img2 = new Image();
        const img3 = new Image();
        const img4 = new Image();
        const img5 = new Image();
        const img6 = new Image();
        const img7 = new Image();
        const img8 = new Image();

        img1.src = "/docs/assets/images/wizzard_m_run_anim_f0.png";
        img2.src = "/docs/assets/images/wizzard_m_run_anim_f1.png";
        img3.src = "/docs/assets/images/wizzard_m_run_anim_f2.png";
        img4.src = "/docs/assets/images/wizzard_m_run_anim_f3.png";
        img5.src = "/docs/assets/images/wizzard_m_run_anim_f0.png";
        img6.src = "/docs/assets/images/wizzard_m_run_anim_f1.png";
        img7.src = "/docs/assets/images/wizzard_m_run_anim_f2.png";
        img8.src = "/docs/assets/images/wizzard_m_run_anim_f3.png";
    
        this.img = img1;
        this.images = [img1, img2, img3, img4, img5, img6, img7, img8]
        
    }
    draw(frames){
        this.img = this.images[Math.floor(frames % 60  / 7.5)]; 
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        /* this.ctx.drawImage(this.wizImg, this.x, this.y, this.w, this.h); */
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
            this.left() > enemy.right()
        );
    };

    crashWith2(powerUp) {
        return !(
            this.bottom() < powerUp.top() ||
            this.top() > powerUp.bottom() ||
            this.right() < powerUp.left() ||
            this.left() > powerUp.right()
        );
    };
};

class Enemy {
    constructor(x, y, w, h, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.isDead = false;
        this.speedX = 0.02;
        this.speedY = 0.005;

        const img1 = new Image();
        const img2 = new Image();
        const img3 = new Image();
        const img4 = new Image();
        const img5 = new Image();
        const img6 = new Image();
        const img7 = new Image();
        const img8 = new Image();

        img1.src = "/docs/assets/images/masked_orc_run_anim_f0.png";
        img2.src = "/docs/assets/images/masked_orc_run_anim_f1.png";
        img3.src = "/docs/assets/images/masked_orc_run_anim_f2.png";
        img4.src = "/docs/assets/images/masked_orc_run_anim_f3.png";
        img5.src = "/docs/assets/images/masked_orc_run_anim_f0.png";
        img6.src = "/docs/assets/images/masked_orc_run_anim_f1.png";
        img7.src = "/docs/assets/images/masked_orc_run_anim_f2.png";
        img8.src = "/docs/assets/images/masked_orc_run_anim_f3.png";

        const img9 = new Image();
        const img10 = new Image();
        const img11 = new Image();
        const img12 = new Image();
        const img13 = new Image();
        const img14 = new Image();
        const img15 = new Image();
        const img16 = new Image();
        const img17 = new Image();
        const img18 = new Image();
        const img19 = new Image();
        const img20 = new Image();

        img9.src = "/docs/assets/images/Cacodaemon Sprite Sheet_0.png";
        img10.src = "/docs/assets/images/Cacodaemon Sprite Sheet_1.png";
        img11.src = "/docs/assets/images/Cacodaemon Sprite Sheet_10.png";
        img12.src = "/docs/assets/images/Cacodaemon Sprite Sheet_11.png";
        img13.src = "/docs/assets/images/Cacodaemon Sprite Sheet_12.png";
        img14.src = "/docs/assets/images/Cacodaemon Sprite Sheet_13.png";
        img15.src = "/docs/assets/images/Cacodaemon Sprite Sheet_2.png";
        img16.src = "/docs/assets/images/Cacodaemon Sprite Sheet_3.png";
        img17.src = "/docs/assets/images/Cacodaemon Sprite Sheet_4.png";
        img18.src = "/docs/assets/images/Cacodaemon Sprite Sheet_5.png";
        img19.src = "/docs/assets/images/Cacodaemon Sprite Sheet_8.png";
        img20.src = "/docs/assets/images/Cacodaemon Sprite Sheet_9.png";
  
      
    
        this.imgEnemy1 = img1;
        this.imagesEnemy1 = [img1, img2, img3, img4, img5, img6, img7, img8];

        this.imgEnemy2 = img9;
        this.imagesEnemy2 = [img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20];
        
    }
    draw1(frames){
        this.imgEnemy1 = this.imagesEnemy1[Math.floor(frames % 60  / 7.5)]; 
        this.ctx.drawImage(this.imgEnemy1, this.x, this.y, this.w, this.h);

    }

    draw2(frames){
        this.imgEnemy2 = this.imagesEnemy2[Math.floor(frames % 60  / 7.5)]; 
        this.ctx.drawImage(this.imgEnemy2, this.x, this.y, this.w, this.h);

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
};

    class Background {
        constructor(ctx) {
            this.ctx = ctx;
            this.x = 0;
            this.velocity = -1;
            this.background = new Image();
            this.background.src = './docs/assets/images/blue-background.png';
        }
        move() {
            this.x += this.velocity;
            this.x %= canvas.width;
        }
        draw() {
            this.ctx.drawImage(this.background, this.x, 0); // drawImage(image, dx, dy, dWidth, dHeight)
            if (this.velocity < 0) {
                ctx.drawImage(this.background, this.x + canvas.width, 0); 
            } else {
                ctx.drawImage(this.background, this.x - this.background.width, 0);
            }
        }
    }

      
  class Projectile {
    constructor(x, y, direction, ctx) {
        this.x = x;
        this.y = y
        this.w = 20;
        this.h = 20;
        this.direction = direction;
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;

        const img1 = new Image();
        const img2 = new Image();
        const img3 = new Image();
        const img4 = new Image();
        const img5 = new Image();
        const img6 = new Image();
        const img7 = new Image();
        const img8 = new Image();

        img1.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_01.png";
        img2.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_101.png";
        img3.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_11.png";
        img4.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_111.png";
        img5.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_121.png";
        img6.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_131.png";
        img7.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_141.png";
        img8.src = "/docs/assets/images/explosion/16_sunburn_spritesheet_151.png";
    
        this.img = img1;
        this.images = [img1, img2, img3, img4, img5, img6, img7, img8]
        
    }
    draw(frames){
        this.img = this.images[Math.floor(frames % 60  / 7.5)]; 
        this.ctx.drawImage(this.img, this.x, this.y, this.w + 35, this.h + 35);
        /* this.ctx.drawImage(this.wizImg, this.x, this.y, this.w, this.h); */
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
            this.left() > enemy.right()
        );
    };  
};  

class Boss {
    constructor(x, y, w, h, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.isDead = false;
        this.speedX = 5;
        this.speedY = 0.005;

        const img1 = new Image();
        const img2 = new Image();
        const img3 = new Image();
        const img4 = new Image();
        const img5 = new Image();
        const img6 = new Image();
        const img7 = new Image();
        const img8 = new Image();
        const img9 = new Image();
        const img10 = new Image();
        const img11 = new Image();
        const img12 = new Image();

        img1.src = "/docs/assets/images/big_demon_run_anim_f0.png";
        img2.src = "/docs/assets/images/big_demon_run_anim_f1.png";
        img3.src = "/docs/assets/images/big_demon_run_anim_f2.png";
        img4.src = "/docs/assets/images/big_demon_run_anim_f3.png";
        img5.src = "/docs/assets/images/big_demon_run_anim_f0.png";
        img6.src = "/docs/assets/images/big_demon_run_anim_f1.png";
        img7.src = "/docs/assets/images/big_demon_run_anim_f2.png";
        img8.src = "/docs/assets/images/big_demon_run_anim_f3.png";
    
        this.img = img1;
        this.images = [img1, img2, img3, img4, img5, img6, img7, img8/* , img9, img10, img11, img12 */]
        
    }
    draw(frames){
        this.img = this.images[Math.floor(frames % 60  / 7.5)]; 
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

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
};

class PowerUp {
    constructor(x, y, w, h, ctx) {
        
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.w = 50;
        this.h = 50;
        this.velocity = -1;
        this.powerUpImg = new Image();
        this.powerUpImg.src = '/docs/assets/images/flask_big_yellow.png';
    }

    move() {
        this.x += this.velocity;
    }
    draw(frames) {
        ctx.drawImage(this.powerUpImg, this.x, this.y, this.w, this.h); 
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
}