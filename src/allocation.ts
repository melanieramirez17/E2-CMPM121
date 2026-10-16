export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let currentProducers = 2;

function calculate() {
  const productionRate = currentProducers * 3;
  const consumptionRate = 6;
  const balance = productionRate - consumptionRate;
  return { productionRate, consumptionRate, balance };
}
function update() {
  const calculationResult = calculate();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < currentProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < currentProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${currentProducers} / 6`, 18, 76);
  ctx.fillText(`Production: ${calculationResult.productionRate}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, calculationResult.productionRate * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${calculationResult.consumptionRate}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, calculationResult.consumptionRate * 14, 20);
  readout.textContent =
    `Assigned: ${currentProducers}/6 · Production: ${calculationResult.productionRate} · Consumption: ${calculationResult.consumptionRate} · Balance: ${
      calculationResult.balance > 0 ? "+" : ""
    }${calculationResult.balance}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  currentProducers = Math.max(0, currentProducers - 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  currentProducers = Math.min(6, currentProducers + 1);
  update();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    currentProducers = 2;
    update();
  };
update();
