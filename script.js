class Coordinate {
  constructor(x, y, addX, addY) {
    this.x = x;
    this.y = y;
    this.addX = addX;
    this.addY = addY;
  }
  move() {
    this.x += this.addX;
    this.y += this.addY;
  }
}

class Color {
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;
  #intensity = 50;

  #randomValue() {
    return Math.random() * this.#intensity;
  }
  update() {
    this.r = this.#randomValue() % 255;
    this.g = this.#randomValue() % 255;
    this.b = this.#randomValue() % 255;
  }
}

window.onload = function () {
  const canvas = document.getElementById("canvas");

  const screen = window.screen;
  const width = (canvas.width = screen.width);
  const height = (canvas.height = screen.height);

  const ctx = canvas.getContext("2d");

  const frameDuration = 30;

  const darkenScreen = () => {
    ctx.fillStyle = `rgba(0,0,0,0.5)`;
    ctx.fillRect(0, 0, width, height);
  }
  setInterval(darkenScreen, frameDuration)

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  }

  function drawCircle(x, y, size, style) {
    ctx.beginPath();
    ctx.arc(x, y, size > 0 ? size : 0, 0, 2 * Math.PI);
    ctx.fillStyle = style;
    ctx.fill();
  }

  const color = new Color();

  const size = 16;
  const dist = 32;

  canvas.addEventListener("mousemove", evt => {
    const { x, y } = getMousePos(canvas, evt);

    let variantSize = size;

    const coordinates = []

    coordinates.push(new Coordinate(x, y, 0, -dist)); // Up
    coordinates.push(new Coordinate(x, y, 0, dist));  // Down
    coordinates.push(new Coordinate(x, y, -dist, 0)); // Left
    coordinates.push(new Coordinate(x, y, dist, 0)); // Right
    coordinates.push(new Coordinate(x, y, dist, -dist)); // Up
    coordinates.push(new Coordinate(x, y, dist, dist));  // Down
    coordinates.push(new Coordinate(x, y, -dist, dist)); // Left
    coordinates.push(new Coordinate(x, y, -dist, -dist)); // Right

    let alpha = 0;

    function waveAnimation() {
      coordinates.forEach(coord => {
        coord.move();
        drawCircle(coord.x, coord.y, variantSize, `rgba(${color.r},${color.g},190,${alpha})`);
      })
      alpha += 0.1;
      variantSize--;
    }
    color.update();

    const interval = setInterval(waveAnimation, frameDuration)
    setTimeout(() => { clearInterval(interval) }, 1000)
  })
}