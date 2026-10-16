export {};

interface ShiftReport {
  currentProducers: number;
  productionRate: number;
  consumptionRate: number;
  balance: number;
}

interface RowDisplay {
  text: string;
  color: string;
  value: number;
}

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let currentProducers = 2;

function calculate(producers: number): ShiftReport {
  const productionRate = producers * 3;
  const consumptionRate = 6;
  const balance = productionRate - consumptionRate;
  return {
    currentProducers: producers,
    productionRate,
    consumptionRate,
    balance,
  };
}

function displayCanvas(report: ShiftReport) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < report.currentProducers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < report.currentProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${report.currentProducers} / 6`, 18, 76);
  const canvasArray: RowDisplay[] = [{
    text: "Production: ",
    color: "#27766b",
    value: report.productionRate,
  }, {
    text: "Consumption: ",
    color: "#a44d23",
    value: report.consumptionRate,
  }];
  for (let j = 0; j < canvasArray.length; j++) {
    const row = canvasArray[j];
    ctx.fillStyle = "#233e43";
    ctx.fillText(`${row.text}${row.value}`, 18, 102 + j * 52);
    ctx.fillStyle = row.color;
    ctx.fillRect(18, 110 + j * 52, row.value * 14, 20);
  }
}

function displayReadout(report: ShiftReport) {
  readout.textContent =
    `Assigned: ${report.currentProducers}/6 · Production: ${report.productionRate} · Consumption: ${report.consumptionRate} · Balance: ${
      report.balance > 0 ? "+" : ""
    }${report.balance}`;
}
function update() {
  const calculationResult = calculate(currentProducers);
  displayCanvas(calculationResult);
  displayReadout(calculationResult);
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
