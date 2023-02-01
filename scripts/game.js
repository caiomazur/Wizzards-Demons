/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

class Game {
    constructor(ctx, width, height, player, background,/*  powerUp */) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.background = background;
        /* this.powerUp = powerUp; */
        this.interval = null;
        this.frames = 0;
        this.enemies = [];
        this.projectiles = [];
        this.boss = [];
        this.powerUps = [];
        this.bossHealthCount = 20;
        this.playerHealthCount = 100;
        this.scoreCount = 0;
        
        /* this.powerUpB = false; */

        this.enemyExplode = false;
        this.enemyI = null;

        this.winImg = new Image();
        this.winImg.src = "/docs/assets/images/youwin.png"  

        this.overImg = new Image();
        this.overImg.src = "/docs/assets/images/gameover.png"

        const img1 = new Image();
        const img2 = new Image();
        const img3 = new Image();
        const img4 = new Image();
        const img5 = new Image();
        const img6 = new Image();
        const img7 = new Image();
        const img8 = new Image();

        img1.src = "/docs/assets/images/explosion/explosion-6_01.png";
        img2.src = "/docs/assets/images/explosion/explosion-6_11.png";
        img3.src = "/docs/assets/images/explosion/explosion-6_21.png";
        img4.src = "/docs/assets/images/explosion/explosion-6_31.png";
        img5.src = "/docs/assets/images/explosion/explosion-6_41.png";
        img6.src = "/docs/assets/images/explosion/explosion-6_51.png";
        img7.src = "/docs/assets/images/explosion/explosion-6_61.png";
        img8.src = "/docs/assets/images/explosion/explosion-6_71.png";
    
        this.explosionImg = img1;
        this.images = [img1, img2, img3, img4, img5, img6, img7, img8]

        const img9 = new Image();
        const img10 = new Image();
        const img11 = new Image();
        const img12 = new Image();
        const img13 = new Image();
        const img14 = new Image();
        

    }

    start() {
        this.intervalId = setInterval(this.update, 1000 / 60) 
    }

    // Update needs to be an arrow function because "this" needs to refer to 
    // the class and not the update method
    update = () => {
        // Game logic here
        this.frames++;
        /* console.log(this.frames) */
        /* console.log(this.projectiles) */
        this.clear();
        this.background.move();
        this.background.draw();
    
        this.player.newPos();
        this.player.draw(this.frames);

        /* this.powerUp.framesUp(); */
     /*    if(this.frames >= 300 && this.frames <= 500) {
            this.powerUp.move()
            this.powerUp.draw(this.frames);
        } */
        
        /* console.log(this.powerUp) */
        this.updatePowerUp();
        this.updateProjectiles(); 
        this.updateEnemies();
        this.updateBoss();

        this.dieExplosion();


        this.score();
        this.playerHealth(); 
        this.checkDeadEnemies(); 
        this.checkPowerUp();
        this.checkGameOver();
        
    }

    stop() {
        clearInterval(this.intervalId);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {

            
            if (this.enemies[i].y > 220) { 
                this.enemies[i].x -= 5
                this.enemies[i].draw1(this.frames);
            }
            else {
                this.enemies[i].x -= 3
                this.enemies[i].draw2(this.frames);
            }
            //Enemy follows player:
            //this.enemies[i].x -= this.player.x * this.enemies[i].speedX; //
            // Another approach:
           /*  if(this.player.y > this.height/2){
                this.enemies[i].y += 2
            } else if(this.player.y < this.height){
                this.enemies[i].y -= 2
            } */

        }
        // Create enemies every certain frames:
        if (this.frames % 60 === 0) { 

        let randomSize = Math.floor(Math.random() * 60 - 10) + 60;
        let randomY = Math.floor(Math.random() * this.height - randomSize) + randomSize;
        
        if (randomY < 0) {
            randomY = 10
        }
        else if (randomY > 300) {
            randomY = 300;
        }

        this.enemies.push(new Enemy(this.width, randomY, randomSize, randomSize, this.ctx)
            );
        }
    };

    updateBoss() {
        for (let i = 0; i < this.boss.length; i++) {
            
            this.boss[i].newPos();
            this.boss[i].draw(this.frames);
            /* console.log(this.boss[i].x); */
                 if (this.boss[i].x >= canvas.width) { 
                    this.boss[i].speedX = -6
                }
                else if (this.boss[i].x <= 30) {
                    this.boss[i].speedX = 2

            } 

        }
        /* console.log(this.boss) */
        // Create boss after certain frames:
        if (this.frames === 600) {
            this.boss.push(new Boss(canvas.width, canvas.height / 2 - 100, 200, 200, this.ctx)
            )
        }
    }
    updateProjectiles() {
        for (let i = 0; i < this.projectiles.length; i++) {
        
                if(this.projectiles[i].direction === 'up') {
                this.projectiles[i].y -= 4;
                this.projectiles[i].draw(this.frames);
              }
            else if (this.projectiles[i].direction === 'down') {
                this.projectiles[i].y += 4;
                this.projectiles[i].draw(this.frames);
        }
            else if (this.projectiles[i].direction === 'left') {
                this.projectiles[i].x -= 4;
                this.projectiles[i].draw(this.frames);
        }
            else if (this.projectiles[i].direction === 'right') {
                this.projectiles[i].x += 4;
                this.projectiles[i].draw(this.frames);
            }    
        }
    };

    updatePowerUp() {
        /* console.log('here') */
        console.log(this.powerUps)
        console.log(this.frames)
        for (let i = 0; i < this.powerUps.length; i++) {
            /* console.log('here2') */
            this.powerUps[i].move()
            this.powerUps[i].draw(this.frames);
            /* console.log(this.powerUps.length) */
            
            /* console.log(this.powerUps) */
            
        }    
        if (this.frames == 150) {
            this.powerUps.push(new PowerUp(700, 235, 50, 50));
            /* console.log(this.powerUps) */
            }   
        }
    

    score() {
        /* const points = Math.floor(this.frames / 30); */
        const points = this.scoreCount;
        this.ctx.font = '18px Russo One';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Score: ${points}`, 450, 50);
      }

      playerHealth() {
        this.ctx.font = '18px Russo One';
        this.ctx.fillStyle = 'red';
        if (this.playerHealthCount >= 75 && this.playerHealthCount <= 100) {
            this.ctx.fillText(`🧡🧡🧡🧡:${this.playerHealthCount} `, 25, 50);
        }
        else if (this.playerHealthCount >= 50 && this.playerHealthCount < 75) {
            this.ctx.fillText(`🧡🧡🧡:${this.playerHealthCount} `, 25, 50);
        }
        else if (this.playerHealthCount >= 25 && this.playerHealthCount < 50) {
            this.ctx.fillText(`🧡🧡:${this.playerHealthCount} `, 25, 50);
        }
        else if (this.playerHealthCount > 0 && this.playerHealthCount < 25) {
            this.ctx.fillText(`🧡:${this.playerHealthCount} `, 25, 50);
        }
        else if (this.playerHealthCount > 100 && this.playerHealthCount <= 125) {
            this.ctx.fillText(`🧡🧡🧡🧡🧡:${this.playerHealthCount} `, 25, 50);
        }
        
      }

      checkGameOver() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.player.crashWith(this.enemies[i])) {

                this.playerHealthCount--;
            }
            else if (this.playerHealthCount <= 0) {
                this.enemies=[]
                this.boss=[]
                this.ctx.drawImage(this.overImg, 0, 0, canvas.width, canvas.height);
                this.ctx.font = '50px Russo One';
                this.ctx.fillStyle = 'white';
                this.ctx.strokeStyle = 'rgba(237,28,36,255)';
                this.ctx.lineWidth = 2;
                this.ctx.fillText(`OH NO!`, 220, canvas.height - 260);
                this.ctx.strokeText(`OH NO!`, 220, canvas.height - 260);
                this.ctx.font = '28px Russo One';
                this.ctx.fillText(`Your Score was: ${this.scoreCount}`, 165, canvas.height - 123);
                this.ctx.strokeText(`Your Score was: ${this.scoreCount}`, 165, canvas.height - 123);
                this.stop();
                mainMx.pause(); 
        }
    }   
          for (let j = 0; j < this.boss.length; j++) { 
            if (this.player.crashWith(this.boss[j])) {
                this.playerHealthCount--;
            }
            else if (this.playerHealthCount <= 0) {
                this.enemies=[]
                this.boss=[]
                this.ctx.drawImage(this.overImg, 0, 0, canvas.width, canvas.height);
                this.ctx.font = '50px Russo One';
                this.ctx.fillStyle = 'white';
                this.ctx.strokeStyle = 'rgba(237,28,36,255)';
                this.ctx.lineWidth = 2;
                this.ctx.fillText(`OH NO!`, 220, canvas.height - 260);
                this.ctx.strokeText(`OH NO!`, 220, canvas.height - 260);
                this.ctx.font = '28px Russo One';
                this.ctx.fillText(`Your Score was: ${this.scoreCount}`, 165, canvas.height - 123);
                this.ctx.strokeText(`Your Score was: ${this.scoreCount}`, 165, canvas.height - 123);
                this.stop();
                mainMx.pause(); 
        }
        }  
    }

    dieExplosion() {
        if (this.enemyExplode) {
                       
                   
            this.explosionImg = this.images[Math.floor(this.frames % 60  / 7.5)]; 
            this.ctx.drawImage(this.explosionImg, this.enemyI.x, this.enemyI.y, this.enemyI.w, this.enemyI.h );

                        /* this.dieExplosion = false; */
        }
    }
      checkDeadEnemies() {
            // Check Enemies
            for (let i = 0; i < this.enemies.length; i++) {

                for (let j = 0; j < this.projectiles.length; j++) {

                    if (this.projectiles[j].crashWith(this.enemies[i])) {

                        this.enemyI = this.enemies[i];
                        /*  this.dieExplosion(); */
                        
                        this.enemies.splice(i, 1);
                        this.scoreCount += 100;
                        /* console.log(this.projectiles) */
                        this.projectiles.splice(j, 1);
                        this.enemyExplode = true;

                        setTimeout(() => {
                            this.enemyExplode = false;
                        }, 1000);
                        
                         /* this.projectiles = [];  */
                        /* console.log(this.projectiles) */
                    }
                    else if (this.enemies[i].x < -50 || this.enemies[i].y < -50 || this.enemies[i].y > canvas.width + 50) {
                        this.enemies.splice(i, 1);
                        
                    }
                }
            }
            // Check Boss
            for (let i = 0; i < this.boss.length; i++) {

                for (let j = 0; j < this.projectiles.length; j++) {

                    if ( this.projectiles[j].crashWith(this.boss[i])) {

                        let explosionImg = new Image();
                        explosionImg.src = "../docs/assets/images/fireball.png"
                        this.ctx.drawImage(explosionImg, this.boss[i].x, this.boss[i].y, this.boss[i].w, this.boss[i].h );

                        this.bossHealthCount--;
                        this.projectiles.splice(j, 8);
                       /*  console.log(this.bossHealthCount) */
                        /* this.projectiles = []; */
                        if (this.bossHealthCount <= 0) {
                            this.boss.splice(i, 1);
                            this.scoreCount += 3000;
                            this.bossHealthCount = 0;
                            this.enemies=[]

                            this.ctx.drawImage(this.winImg, 0, 0, canvas.width,canvas.height);
                            this.ctx.font = '50px Russo One';
                            this.ctx.fillStyle = 'white';
                            this.ctx.strokeStyle = 'rgba(38,194,165,255)';
                            this.ctx.lineWidth = 2;
                            this.ctx.fillText(`CONGRATS!`, 155, canvas.height - 260);
                            this.ctx.strokeText(`CONGRATS!`, 155, canvas.height - 260);
                            this.ctx.font = '28px Russo One';
                            this.ctx.fillText(`Your Score was: ${this.scoreCount}`, 165, canvas.height - 123);
                            this.ctx.strokeText(`Your Score was: ${this.scoreCount}`, 165, canvas.height - 123);
                            mainMx.pause(); 
                            audioWin.play(); 
                            this.stop();
                           
                    }
                }
            }
        }    
    }  
    checkPowerUp() {
        for (let i = 0; i < this.powerUps.length; i++) {

                if (this.player.crashWith2(this.powerUps[i])) {

                    this.playerHealthCount += 25;
                    
                    /* this.powerUps.splice(i, 1); */
                    this.powerUps = [];
                    console.log(this.powerUps)
                    this.scoreCount += 100;
                    /* console.log(this.projectiles) */
                    
                    this.getPowerUp = true;

                    setTimeout(() => {
                        this.getPowerUp = false;
                    }, 1000);
                    
                }
            
        }
    }
}