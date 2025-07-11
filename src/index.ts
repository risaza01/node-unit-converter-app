const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on("request", async (req: any, res: any) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hola mundo!");
  }
});

server.listen(9090, () => {
  console.log("Server listening on", server.address());
});
