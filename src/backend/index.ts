const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

interface FilePath {
  name: string;
}
const filePaths: readonly FilePath[] = [
  { name: path.join(__dirname, "../../public/length.html") },
  { name: path.join(__dirname, "../../public/weight.html") },
  { name: path.join(__dirname, "../../public/temperature.html") },
];

const server = http.createServer();

server.on("request", async (req: any, res: any) => {
  if (req.url === "/length" && req.method === "GET") {
    const fileHandle = await fs.open(filePaths[0].name, "r");
    const readStream = fileHandle.createReadStream();

    res.writeHead(200, { "content-type": "text/html" });

    readStream.on("data", (chunk: Buffer) => {
      if (!res.write(chunk)) readStream.pause();
    });
    readStream.on("drain", () => {
      readStream.resume();
    });
    readStream.on("end", async () => {
      res.end();
      await fileHandle.close();
    });
  } else if (req.url === "/api/length" && req.method === "POST") {
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 Page Not Found");
  }
});

server.listen(9090, () => {
  console.log("Server listening on", server.address());
});
