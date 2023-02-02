/** @type {HTMLCanvasElement} */ // Enable canvas auto complete

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

    img1.src = "./docs/assets/images/wizzard_m_run_anim_f0.png";
    img2.src = "./docs/assets/images/wizzard_m_run_anim_f1.png";
    img3.src = "./docs/assets/images/wizzard_m_run_anim_f2.png";
    img4.src = "./docs/assets/images/wizzard_m_run_anim_f3.png";
    img5.src = "./docs/assets/images/wizzard_m_run_anim_f0.png";
    img6.src = "./docs/assets/images/wizzard_m_run_anim_f1.png";
    img7.src = "./docs/assets/images/wizzard_m_run_anim_f2.png";
    img8.src = "./docs/assets/images/wizzard_m_run_anim_f3.png";

    this.img = img1;
    this.images = [img1, img2, img3, img4, img5, img6, img7, img8];
  }
  draw(frames) {
    this.img = this.images[Math.floor((frames % 60) / 7.5)];
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    /* this.ctx.drawImage(this.wizImg, this.x, this.y, this.w, this.h); */
  }

  newPos() {
    // Screen limit X axis
    if (this.x + 64 > canvas.width) {
      this.x = canvas.width - 64;
      this.speedX = 0;
    } else if (this.x < 0) {
      this.x = 0;
      this.speedX = 0;
    }
    // Screen limit Y axis
    else if (this.y + 84 > canvas.height) {
      this.y = canvas.height - 64;
      this.speedY = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.speedY = 0;
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  top() {
    return this.y + 10;
  }

  bottom() {
    return this.y + this.h - 10;
  }
  left() {
    return this.x + 10;
  }
  right() {
    return this.x + this.w - 15;
  }

  crashWith(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  }

  crashWith2(powerUp) {
    return !(
      this.bottom() < powerUp.top() ||
      this.top() > powerUp.bottom() ||
      this.right() < powerUp.left() ||
      this.left() > powerUp.right()
    );
  }
}
