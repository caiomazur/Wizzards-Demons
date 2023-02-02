/** @type {HTMLCanvasElement} */

class PowerUp {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.w = 50;
    this.h = 50;
    this.velocity = -1;
    this.powerUpImg = new Image();
    this.powerUpImg.src = "./docs/assets/images/flask_big_red.png";
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
