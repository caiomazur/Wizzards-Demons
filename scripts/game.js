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
        this.checkGameOver();
        this.checkDeadEnemies();
        this.updateEnemies();
        this.updateProjectiles(); 
   
        
    }
    stop() {
        clearInterval(this.intervalId);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    // When the enemies appear
    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
        
            //this.enemies[i].x -= this.player.x * this.enemies[i].speedX; //
            this.enemies[i].x -= 5
           /*  if(this.player.y > this.height/2){
                this.enemies[i].y += 2
            } else if(this.player.y < this.height){
                this.enemies[i].y -= 2
            } */
            
            this.enemies[i].draw();
        }
        // the if statement is to create the enemies
        // which we only want to do every 120 frames (2 seconds)
        if (this.frames % 60 === 0) {
            // 150 is the maximum square size
            // 20 is the minimum size
        let randomSize = Math.floor(Math.random() * 150 - 20) + 50;
        let randomY = Math.floor(Math.random() * this.height - randomSize) + randomSize;

        this.enemies.push(new Enemy(this.width, randomY, randomSize, randomSize, "green", this.ctx)
            );
        }

    };
    updateProjectiles() {
        for (let i = 0; i < this.projectiles.length; i++) {
           /*   this.projectiles[i].x += 4;
            this.projectiles[i].draw(); */
        
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
         if (this.player.isFire === true) {
        this.projectiles.push(new Projectile(player.x + 25, player.y + 25, player.direction, this.ctx)
            );
        } 
    };
    score() {
        const points = Math.floor(this.frames / 30);
        this.ctx.font = '18px serif';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Score: ${points}`, 500, 50);
      }

    checkGameOver() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.player.crashWith(this.enemies[i])) {
                this.stop();
                alert("Game Over");
            }
        }
            
       /*  const playerCrash = this.enemies.some((enemy) => {
            return this.player.crashWith(enemy);
        });

        if (playerCrash) {
            this.stop();
            alert("Game Over");
        } */
    }
      checkDeadEnemies() {

            for (let i = 0; i < this.enemies.length; i++) {
                for (let j = 0; j < this.projectiles.length; j++){
                    if ( this.projectiles[j].crashWith(this.enemies[i])){
                        let explosionImg = new Image();
                        explosionImg.src = "../docs/assets/images/fireball.png"
                        this.ctx.drawImage(explosionImg, this.enemies[i].x, this.enemies[i].y, this.enemies[i].w, this.enemies[i].h );
                        this.enemies.splice(i, 1);
                        /* console.log(this.projectiles) */
                        /* this.projectiles.splice(j, 10); */
                        this.projectiles = [];
                        /* console.log(this.projectiles) */

                    }else if (this.enemies[i].x < 0 || this.enemies[i].y < 0 || this.enemies[i].y > 550){
                        this.enemies.splice(i, 1);
                        
                    }
                   
                }
            }
        
    }  
}