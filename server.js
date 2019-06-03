const http = require("http");
const fs = require("fs");

const port = 3050;

const server = http.createServer((req, res) => {
  let reqBody = "";
  req.on("data", str => (reqBody += str));
  req.on("end", () => {
    const fd = fs.openSync("node_req.json", "w");
    fs.writeFileSync(fd, reqBody);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("OK");
});

server.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
