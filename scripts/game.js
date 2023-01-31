/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

class Game {
    constructor(ctx, width, height, player, background) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.background = background;
        this.interval = null;
        this.frames = 0;
        this.enemies = [];
        this.projectiles = [];
        this.boss = [];
        this.bossHealthCount = 30;
        this.playerHealthCount = 100;

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
        this.player.draw();
        this.score();
        this.playerHealth();     
        this.checkGameOver();
        this.checkDeadEnemies();
        this.updateEnemies();
        this.updateBoss();
        this.updateProjectiles(); 
    }

    stop() {
        clearInterval(this.intervalId);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {

            this.enemies[i].x -= 5

            //Enemy follows player:
            //this.enemies[i].x -= this.player.x * this.enemies[i].speedX; //
            // Another approach:
           /*  if(this.player.y > this.height/2){
                this.enemies[i].y += 2
            } else if(this.player.y < this.height){
                this.enemies[i].y -= 2
            } */
            
            this.enemies[i].draw();
        }
        // Create enemies every certain frames:
        if (this.frames % 60 === 0) { 

        let randomSize = Math.floor(Math.random() * 100 - 20) + 60;
        let randomY = Math.floor(Math.random() * this.height - randomSize) + randomSize;

        this.enemies.push(new Enemy(this.width, randomY, randomSize, randomSize, this.ctx)
            );
        }
    };

    updateBoss() {
        for (let i = 0; i < this.boss.length; i++) {
            
            this.boss[i].newPos();
            this.boss[i].draw();
            console.log(this.boss[i].x);
                 if (this.boss[i].x >= canvas.width) { // Not Working! Fix Boss Movement
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
                this.projectiles[i].draw();
              }
            else if (this.projectiles[i].direction === 'down') {
                this.projectiles[i].y += 4;
                this.projectiles[i].draw();
        }
            else if (this.projectiles[i].direction === 'left') {
                this.projectiles[i].x -= 4;
                this.projectiles[i].draw();
        }
            else if (this.projectiles[i].direction === 'right') {
                this.projectiles[i].x += 4;
                this.projectiles[i].draw();
    }    
    }
       /*   if (this.player.isFire === true) {
        this.projectiles.push(new Projectile(player.x + 25, player.y + 25, player.direction, this.ctx)
            );
        }  */
    };

    score() {
        const points = Math.floor(this.frames / 30);
        this.ctx.font = '18px serif';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Score: ${points}`, 500, 50);
      }

      playerHealth() {
        this.ctx.font = '18px serif';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Life:${this.playerHealthCount} `, 95, 42);
      }

    checkGameOver() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.player.crashWith(this.enemies[i])) {

                this.playerHealthCount--;
            }
            else if (this.playerHealthCount <= 0) {
                this.stop();
                alert("Game Over"); 
        }
    }   
          for (let j = 0; j < this.boss.length; j++) { // NOT WORKING! WHY?
            if (this.player.crashWith(this.boss[j])) {
                this.playerHealthCount--;
            }
            else if (this.playerHealthCount <= 0) {
                this.stop();
                alert("Game Over"); 
        }
        }  
    }
      checkDeadEnemies() {
            // Check Enemies
            for (let i = 0; i < this.enemies.length; i++) {

                for (let j = 0; j < this.projectiles.length; j++) {

                    if (this.projectiles[j].crashWith(this.enemies[i])) {

                        let explosionImg = new Image();
                        explosionImg.src = "../docs/assets/images/fireball.png"
                        this.ctx.drawImage(explosionImg, this.enemies[i].x, this.enemies[i].y, this.enemies[i].w, this.enemies[i].h );

                        this.enemies.splice(i, 1);
                        /* console.log(this.projectiles) */
                        this.projectiles.splice(j, 1);
                        /* this.projectiles = []; */
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
                        this.projectiles.splice(j, 1);
                       /*  console.log(this.bossHealthCount) */
                        /* this.projectiles = []; */
                        if (this.bossHealthCount <= 0) {
                            this.boss.splice(i, 1);
                            this.bossHealthCount = 0;
                    }
                }
            }
        }    
    }  
}