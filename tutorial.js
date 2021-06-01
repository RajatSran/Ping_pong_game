const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 4,
  radius: 9,
  velocityX: 3,
  velocityY: 3,
  speed: 4,
  color: "ORANGE",
};


const player1 = {
  x: 0,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 90,
  score: 0,
  color: "BLUE",
  up: false,
  down: false,
};

const player2 = {
  x: canvas.width - 10,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 90,
  score: 0,
  color: "BLUE",
  up: false,
  down: false,
};

const net = {
  x: (canvas.width - 2) / 2,
  y: 0,
  height: canvas.height,
  width: 2,
  color: "green",
};

function drawbox(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function resetBall(ball) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 4;
}


function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return (
    p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
  );
}

let keysPressed = {};
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;

  if (keysPressed["w"]) {
    player1.y = player1.y - 25;
    document.getElementById("p1up").style.backgroundColor = "#3e8e41";
    document.getElementById("p1up").style.boxShadow = "0 5px #666";
    document.getElementById("p1up").style.transform = "translateY(4px)";
  }
  if (keysPressed["s"]) {
    player1.y = player1.y + 25;
    document.getElementById("p1down").style.backgroundColor = "#3e8e41";
    document.getElementById("p1down").style.boxShadow = "0 5px #666";
    document.getElementById("p1down").style.transform = "translateY(4px)";
  }
  if (keysPressed["ArrowUp"]) {
    player2.y = player2.y - 25;
    document.getElementById("p2up").style.backgroundColor = "#3e8e41";
    document.getElementById("p2up").style.boxShadow = "0 5px #666";
    document.getElementById("p2up").style.transform = "translateY(4px)";
  }
  if (keysPressed["ArrowDown"]) {
    player2.y = player2.y + 25;
    document.getElementById("p2down").style.backgroundColor = "#3e8e41";
    document.getElementById("p2down").style.boxShadow = "0 5px #666";
    document.getElementById("p2down").style.transform = "translateY(4px)";
  }
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key];
    document.getElementById("p1up").style.backgroundColor = "#FF6978";
    document.getElementById("p1up").style.boxShadow = "0 9px #999";
    document.getElementById("p1up").style.transform = "translateY(-4px)";
    document.getElementById("p1down").style.backgroundColor = "#FF6978";
    document.getElementById("p1down").style.boxShadow = "0 9px #999";
    document.getElementById("p1down").style.transform = "translateY(-4px)";
    document.getElementById("p2up").style.backgroundColor = "#FF6978";
    document.getElementById("p2up").style.boxShadow = "0 9px #999";
    document.getElementById("p2up").style.transform = "translateY(-4px)";
    document.getElementById("p2down").style.backgroundColor = "#FF6978";
    document.getElementById("p2down").style.boxShadow = "0 9px #999";
    document.getElementById("p2down").style.transform = "translateY(-4px)";
});

function update_game(ball) {
  if (ball.x - ball.radius <= 0) {
    resetBall(ball);
  } else if (ball.x + ball.radius >= canvas.width) {
    resetBall(ball);
  }

  ball.x += ball.velocityX;
  ball.y += ball.velocityY;


  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }

  let player = ball.x + ball.radius < canvas.width / 2 ? player1 : player2;

  if (collision(ball, player)) {
    let coP = ball.y - (player.y + player.height / 2);

    coP = coP / (player.height / 2);

    let angleRad = (Math.PI / 4) * coP;
    let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);
    ball.speed += 0.1;
  }
}


function render_game() {
  drawbox(0, 0, canvas.width, canvas.height, "#000");
  drawbox(net.x, net.y, net.width, net.height, net.color);
  drawbox(player1.x, player1.y, player1.width, player1.height, player1.color);
  drawbox(player2.x, player2.y, player2.width, player2.height, player2.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function start_game() {
  update_game(ball);
  render_game();
}

function p1up(){
    player1.y=player1.y - 25;
}
function p1down(){
    player1.y=player1.y + 25;
}
function p2up(){
    player2.y=player2.y - 25;
}
function p2down(){
    player2.y=player2.y + 25;
}



let framePerSecond = 50;
let loop = setInterval(start_game, 1000 / framePerSecond);
