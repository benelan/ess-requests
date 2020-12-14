const httpsServer = require("https").createServer;
const httpServer = require("http").createServer;
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

process.env.NODE_ENV = 'production';

const httpsOptions = {
  /** FOR DEV */
  key: fs.readFileSync("./certs/unsigned.key"),
  cert: fs.readFileSync("./certs/unsigned.crt"),
  /** FOR PROD */
  // key: fs.readFileSync("./certs/essrequests.key"),
  // cert: fs.readFileSync("./certs/essrequests.crt"),
};

const http_port = 3001
const https_port = 3000

app.prepare().then(() => {
  httpsServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(https_port, (err) => {
    if (err) throw err;
    console.log(`> HTTPS listening on port ${https_port}`);
  });

  httpServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(http_port, (err) => {
    if (err) throw err;
    console.log(`> HTTP listening on port ${http_port}`);
  });
});