/** @type {HTMLCanvasElement} */

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

    img1.src = "./docs/assets/images/big_demon_run_anim_f0.png";
    img2.src = "./docs/assets/images/big_demon_run_anim_f1.png";
    img3.src = "./docs/assets/images/big_demon_run_anim_f2.png";
    img4.src = "./docs/assets/images/big_demon_run_anim_f3.png";
    img5.src = "./docs/assets/images/big_demon_run_anim_f0.png";
    img6.src = "./docs/assets/images/big_demon_run_anim_f1.png";
    img7.src = "./docs/assets/images/big_demon_run_anim_f2.png";
    img8.src = "./docs/assets/images/big_demon_run_anim_f3.png";

    this.img = img1;
    this.images = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8 /* , img9, img10, img11, img12 */,
    ];
  }
  draw(frames) {
    this.img = this.images[Math.floor((frames % 60) / 8)];
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  newPos() {
    if (this.speedX === 6) {
      this.x -= this.speedX;
    } else {
      this.x += this.speedX;
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
}
