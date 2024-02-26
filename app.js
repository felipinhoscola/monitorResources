import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";

const filename = "log.txt";
const logDir = path.resolve("log");
const logFilePath = path.resolve(logDir, filename);


const systemPlatformMap = {
  "win32": "Windows",
  "linux": "Linux",
  "darwin": "MacOS",
  "freebsd": "FreeBSD"
}
function getSystemInfos() {
  const platform = os.platform();
  const arch = os.arch();
  const cpu = os.cpus()[0].model;

  const ramTotal = os.totalmem() / 1024 / 1024 / 1024
  const ramUsage = (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024
  const ramUsagePercent = Math.round((ramUsage / ramTotal) * 100)

  const uptimeDays = Math.floor(os.uptime() / 60 / 60 / 24)
  const uptimeDaysInSeconds = uptimeDays * 24 * 60 * 60

  const uptimeHours = Math.floor((os.uptime() - uptimeDaysInSeconds) / 60 / 60)
  const uptimeHoursInSeconds = uptimeHours * 60 * 60

  const uptimeMins = Math.floor((os.uptime() - uptimeDaysInSeconds - uptimeHoursInSeconds) / 60)
  const uptimeMinsInSeconds = uptimeMins * 60

  const uptimeSecs = Math.floor(os.uptime() - uptimeDaysInSeconds - uptimeHoursInSeconds - uptimeMinsInSeconds)

  const uptime = `${uptimeDays}:${uptimeHours}:${uptimeMins}:${uptimeSecs}`
  console.clear();
  console.log("Descrição Do Sistema");
  console.log(`Sistema Operacional: ${systemPlatformMap[platform]}`);
  console.log(`Arquitetura do Sistema: ${arch}`);
  console.log(`Modelo do processador: ${cpu}`);
  console.log(`Tempo de ativiade: ${uptime}`);
  console.log(`Uso de Memória RAM: ${ramUsage.toFixed(2)} GB / ${ramTotal.toFixed(2)} GB (${ramUsagePercent} %)`);
  return { platform, arch, cpu, ramTotal, ramUsage, ramUsagePercent, uptime }
}
function printConsoleLog({ platform, arch, cpu, ramTotal, ramUsage, ramUsagePercent, uptime }) {
  console.clear();
  console.log("Descrição Do Sistema");
  console.log(`Sistema Operacional: ${systemPlatformMap[platform]}`);
  console.log(`Arquitetura do Sistema: ${arch}`);
  console.log(`Modelo do processador: ${cpu}`);
  console.log(`Tempo de ativiade: ${uptime}`);
  console.log(`Uso de Memória RAM: ${ramUsage.toFixed(2)} GB / ${ramTotal.toFixed(2)} GB (${ramUsagePercent} %)`);
}
function genLogText({ platform, arch, cpu, ramTotal, ramUsage, ramUsagePercent, uptime }) {
  const contentLog =
    `Descrição Do Sistema:
  -Sistema Operacional:${systemPlatformMap[platform]}
  -Arquitetura do Sistema: ${arch}
  -Modelo Do Processado: ${cpu}
  -Tempo De Atividade: ${uptime} H
  -Uso de Memória RAM: ${ramUsage.toFixed(2)} GB / ${ramTotal.toFixed(2)} GB (${ramUsagePercent} %)
  -----------------------------------------------\n`

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
  }

  fs.appendFileSync(logFilePath, contentLog)
}
//fs.unlinkSync(filePath)//Exclui o arquivo gerado anteriormente
setInterval(() => {
  const systemInfo = getSystemInfos();
  printConsoleLog(systemInfo);
  genLogText(systemInfo);
}, 1000);


