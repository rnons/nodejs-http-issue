const http = require("http");
const fs = require("fs");
const { Buffer } = require("buffer");

const port = 3050;

const server = http.createServer((req, res) => {
  const bufs = [];
  req.on("data", buf => bufs.push(buf));
  req.on("end", () => {
    const fd = fs.openSync("node_req.json", "w");
    fs.writeFileSync(fd, Buffer.concat(bufs).toString("utf8"));
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("OK");
});

server.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
