export {};

interface Command {
  execute(): void;
  name: string;
}
interface ForwardDirection {
  name: string;
  xOffset: number;
  yOffset: number;
}
const directions: ForwardDirection[] = [{
  name: "North",
  xOffset: 0,
  yOffset: -1,
}, {
  name: "East",
  xOffset: 1,
  yOffset: 0,
}, {
  name: "South",
  xOffset: 0,
  yOffset: 1,
}, {
  name: "West",
  xOffset: -1,
  yOffset: 0,
}];
const canvas = document.querySelector<HTMLCanvasElement>("#rover-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>("#rover-readout")!;
const roverPending = document.querySelector<HTMLOListElement>(
  "#rover-pending",
)!;
const roverRun = document.querySelector<HTMLButtonElement>("#rover-run")!;
const roverClear = document.querySelector<HTMLButtonElement>("#rover-clear")!;
let x = 2;
let y = 2;
let direction = 0;
let queue: Command[] = [];
const forwardCommand: Command = {
  name: "Forward",
  execute() {
    const directionLookup = directions[direction];
    x = Math.max(0, Math.min(4, x + directionLookup.xOffset));
    y = Math.max(0, Math.min(4, y + directionLookup.yOffset));
  },
};
const rightCommand: Command = {
  name: "Right",
  execute() {
    direction = (direction + 1) % 4;
  },
};

function updateQueueUI() {
  roverPending.innerHTML = "";
  for (const element of queue) {
    const queueItem = document.createElement("li");
    queueItem.textContent = element.name;
    roverPending.appendChild(queueItem);
  }
  roverRun.disabled = queue.length === 0;
  roverClear.disabled = queue.length === 0;
}
function drawRover() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#718881";
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      ctx.strokeRect(10 + column * 56, 10 + row * 56, 56, 56);
    }
  }
  ctx.save();
  ctx.translate(38 + x * 56, 38 + y * 56);
  ctx.rotate(direction * Math.PI / 2);
  ctx.fillStyle = "#27766b";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(17, 16);
  ctx.lineTo(-17, 16);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  readout.textContent = `Position: (${x}, ${y}) · Facing: ${
    directions[direction].name
  }`;
}

document.querySelector<HTMLButtonElement>("#rover-forward")!.onclick = () => {
  queue.push(forwardCommand);
  updateQueueUI();
};
document.querySelector<HTMLButtonElement>("#rover-right")!.onclick = () => {
  queue.push(rightCommand);
  updateQueueUI();
};
roverRun.onclick = () => {
  for (const element of queue) {
    element.execute();
  }
  queue = [];
  drawRover();
  updateQueueUI();
};
roverClear.onclick = () => {
  queue = [];
  updateQueueUI();
};
document.querySelector<HTMLButtonElement>("#rover-reset")!.onclick = () => {
  x = 2;
  y = 2;
  direction = 0;
  drawRover();
  queue = [];
  updateQueueUI();
};
drawRover();
