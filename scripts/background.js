/** @type {HTMLCanvasElement} */

class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.velocity = -1;
    this.background = new Image();
    this.background.src = "./docs/assets/images/blue-background.png";
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
