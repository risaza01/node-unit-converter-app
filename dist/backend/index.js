"use strict";
const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");
const { convertLength, convertWeight, convertTemperature, } = require("../utils/functions");
// Array de tipo FilePath para guardar las rutas de los archivos
const filePaths = {
    "length.html": path.join(__dirname, "../../public/length.html"),
    "weight.html": path.join(__dirname, "../../public/weight.html"),
    "temperature.html": path.join(__dirname, "../../public/temperature.html"),
    "index.js": path.join(__dirname, "../../dist/frontend/index.js"),
    "main.css": path.join(__dirname, "../../public/style/main.css"),
};
const server = http.createServer();
server.on("request", async (req, res) => {
    if (req.url === "/length" && req.method === "GET") {
        const fileHandle = await fs.open(filePaths["length.html"], "r");
        const readStream = fileHandle.createReadStream();
        res.writeHead(200, { "content-type": "text/html" });
        readStream.on("data", (chunk) => {
            if (!res.write(chunk))
                readStream.pause();
        });
        res.on("drain", () => {
            readStream.resume();
        });
        readStream.on("end", async () => {
            res.end();
            await fileHandle.close();
        });
    }
    else if (req.url === "/weight" && req.method === "GET") {
        const fileHandle = await fs.open(filePaths["weight.html"], "r");
        const readStream = fileHandle.createReadStream();
        res.writeHead(200, { "content-type": "text/html" });
        readStream.on("data", (chunk) => {
            if (!res.write(chunk))
                readStream.pause();
        });
        res.on("drain", () => {
            readStream.resume();
        });
        readStream.on("end", async () => {
            res.end();
            await fileHandle.close();
        });
    }
    else if (req.url === "/temperature" && req.method === "GET") {
        const fileHandle = await fs.open(filePaths["temperature.html"], "r");
        const readStream = fileHandle.createReadStream();
        res.writeHead(200, { "content-type": "text/html" });
        readStream.on("data", (chunk) => {
            if (!res.write(chunk))
                readStream.pause();
        });
        res.on("drain", () => {
            readStream.resume();
        });
        readStream.on("end", async () => {
            res.end();
            await fileHandle.close();
        });
    }
    else if (req.url === "/index.js" && req.method === "GET") {
        const fileHandle = await fs.open(filePaths["index.js"], "r");
        const readStream = fileHandle.createReadStream();
        res.writeHead(200, { "content-type": "text/javascript" });
        readStream.on("data", (chunk) => {
            if (!res.write(chunk))
                readStream.pause();
        });
        res.on("drain", () => {
            readStream.resume();
        });
        readStream.on("end", async () => {
            res.end();
            await fileHandle.close();
        });
    }
    else if (req.url === "/main.css" && req.method === "GET") {
        const fileHandle = await fs.open(filePaths["main.css"], "r");
        const readStream = fileHandle.createReadStream();
        res.writeHead(200, { "content-type": "text/css" });
        readStream.on("data", (chunk) => {
            if (!res.write(chunk))
                readStream.pause();
        });
        res.on("drain", () => {
            readStream.resume();
        });
        readStream.on("end", async () => {
            res.end();
            await fileHandle.close();
        });
    }
    else if (req.url === "/api/length" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString("utf8");
        });
        req.on("end", () => {
            const formData = JSON.parse(body);
            const result = convertLength(formData.measure, formData.inputUnit, formData.outputUnit);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ result }));
        });
    }
    else if (req.url === "/api/weight" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString("utf8");
        });
        req.on("end", () => {
            const formData = JSON.parse(body);
            const result = convertWeight(formData.measure, formData.inputUnit, formData.outputUnit);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ result }));
        });
    }
    else if (req.url === "/api/temperature" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString("utf8");
        });
        req.on("end", () => {
            const formData = JSON.parse(body);
            const result = convertTemperature(formData.measure, formData.inputUnit, formData.outputUnit);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ result }));
        });
    }
    else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("404 Page Not Found");
    }
});
server.listen(9090, () => {
    console.log("Server listening on", server.address());
});
