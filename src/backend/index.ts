const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");
// Funciones necesarias para convertir los diferentes tipos de medidas
const {
  convertLength,
  convertWeight,
  convertTemperature,
} = require("../utils/functions");

// Interface para el objeto que viene con la info del formulario
interface ConvertData {
  measure: number;
  inputUnit: string;
  outputUnit: string;
}

// Objeto para guardar las rutas de los archivos locales
const filePaths: Record<string, string> = {
  "length.html": path.join(__dirname, "../../public/length.html"),
  "weight.html": path.join(__dirname, "../../public/weight.html"),
  "temperature.html": path.join(__dirname, "../../public/temperature.html"),
  "index.js": path.join(__dirname, "../../dist/frontend/index.js"),
  "main.css": path.join(__dirname, "../../public/style/main.css"),
};

const PORT = process.env.PORT || 9090;
const server = http.createServer();

server.on("request", async (req: any, res: any) => {
  if (req.url === "/length" && req.method === "GET") {
    const fileHandle = await fs.open(filePaths["length.html"], "r");
    const readStream = fileHandle.createReadStream();

    res.writeHead(200, { "content-type": "text/html" });

    readStream.on("data", (chunk: Buffer) => {
      if (!res.write(chunk)) readStream.pause();
    });
    res.on("drain", () => {
      readStream.resume();
    });
    readStream.on("end", async () => {
      res.end();
      await fileHandle.close();
    });
  } else if (req.url === "/weight" && req.method === "GET") {
    const fileHandle = await fs.open(filePaths["weight.html"], "r");
    const readStream = fileHandle.createReadStream();

    res.writeHead(200, { "content-type": "text/html" });

    readStream.on("data", (chunk: Buffer) => {
      if (!res.write(chunk)) readStream.pause();
    });
    res.on("drain", () => {
      readStream.resume();
    });
    readStream.on("end", async () => {
      res.end();
      await fileHandle.close();
    });
  } else if (req.url === "/temperature" && req.method === "GET") {
    const fileHandle = await fs.open(filePaths["temperature.html"], "r");
    const readStream = fileHandle.createReadStream();

    res.writeHead(200, { "content-type": "text/html" });

    readStream.on("data", (chunk: Buffer) => {
      if (!res.write(chunk)) readStream.pause();
    });
    res.on("drain", () => {
      readStream.resume();
    });
    readStream.on("end", async () => {
      res.end();
      await fileHandle.close();
    });
  } else if (req.url === "/index.js" && req.method === "GET") {
    const fileHandle = await fs.open(filePaths["index.js"], "r");
    const readStream = fileHandle.createReadStream();

    res.writeHead(200, { "content-type": "text/javascript" });

    readStream.on("data", (chunk: Buffer) => {
      if (!res.write(chunk)) readStream.pause();
    });
    res.on("drain", () => {
      readStream.resume();
    });
    readStream.on("end", async () => {
      res.end();
      await fileHandle.close();
    });
  } else if (req.url === "/main.css" && req.method === "GET") {
    const fileHandle = await fs.open(filePaths["main.css"], "r");
    const readStream = fileHandle.createReadStream();

    res.writeHead(200, { "content-type": "text/css" });

    readStream.on("data", (chunk: Buffer) => {
      if (!res.write(chunk)) readStream.pause();
    });
    res.on("drain", () => {
      readStream.resume();
    });
    readStream.on("end", async () => {
      res.end();
      await fileHandle.close();
    });
  } else if (req.url === "/api/length" && req.method === "POST") {
    let body: string = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");
    });
    req.on("end", () => {
      const formData: ConvertData = JSON.parse(body);

      const result: number = convertLength(
        formData.measure,
        formData.inputUnit,
        formData.outputUnit
      );

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ result }));
    });
  } else if (req.url === "/api/weight" && req.method === "POST") {
    let body: string = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");
    });
    req.on("end", () => {
      const formData: ConvertData = JSON.parse(body);

      const result: number = convertWeight(
        formData.measure,
        formData.inputUnit,
        formData.outputUnit
      );

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ result }));
    });
  } else if (req.url === "/api/temperature" && req.method === "POST") {
    let body: string = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");
    });
    req.on("end", () => {
      const formData: ConvertData = JSON.parse(body);

      const result: number = convertTemperature(
        formData.measure,
        formData.inputUnit,
        formData.outputUnit
      );

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ result }));
    });
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log("Server listening on", server.address());
});
