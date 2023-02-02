/** @type {HTMLCanvasElement} */

class Projectile {
  constructor(x, y, direction, ctx) {
    this.x = x;
    this.y = y;
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

    img1.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_01.png";
    img2.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_101.png";
    img3.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_11.png";
    img4.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_111.png";
    img5.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_121.png";
    img6.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_131.png";
    img7.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_141.png";
    img8.src = "./docs/assets/images/explosion/16_sunburn_spritesheet_151.png";

    this.img = img1;
    this.images = [img1, img2, img3, img4, img5, img6, img7, img8];
  }
  draw(frames) {
    this.img = this.images[Math.floor((frames % 60) / 7.5)];
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
  }
}
