// select the elements - canvas, shake buttons

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const shakeBtn = document.querySelector(".shake");
const MOVE = 10;
// setup canvas for drawing

// making variables from the same properties on the canvas
const { width, height } = canvas;

// creating random x and y points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = MOVE;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw function
function draw({ key }) {
  console.log(key);
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // start the drawing
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y values depending from the user
  switch (key) {
    case "ArrowUp":
      y = y - MOVE;

      break;
    case "ArrowDown":
      y = y + MOVE;
      break;

    case "ArrowRight":
      x = x + MOVE;
      break;

    case "ArrowLeft":
      x = x - MOVE;
      break;

    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// handler for keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// clearing function
const cleanCanvas = () => {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    function () {
      canvas.classList.remove("shake");
      window.location.reload();
    },
    { once: true }
  );
};

shakeBtn.addEventListener("click", cleanCanvas);
// listen for arrow keys
window.addEventListener("keydown", handleKey);
