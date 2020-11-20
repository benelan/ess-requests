const httpsServer = require("https").createServer;
const httpServer = require("http").createServer;
const express = require('express');
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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
  const server = express();
  server.get('*', (req, res) => {
    if (req.secure) {
      // request was via https, so do no special handling
      return handle(req, res);
    } else {
      // request was via http, so redirect to https
      const https_url = 'https://' + req.headers.host.substring(0, req.headers.host.indexOf(':') + 1) + https_port;
      res.redirect(https_url);
    }
    return handle(req, res);
  });

  httpsServer(httpsOptions, server, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(https_port, (err) => {
    if (err) throw err;
    console.log(`> HTTPS listening on port ${https_port}`);
  });

  httpServer(server, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(http_port, (err) => {
    if (err) throw err;
    console.log(`> HTTP listening on port ${http_port}`);
  });
});




// app.prepare().then(() => {
//   HTTPS(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(3000, (err) => {
//     if (err) throw err;
//     console.log("> Server started on https://localhost:3000");
//   });
//   HTTP((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(3001, (err) => {
//     if (err) throw err;
//     console.log("> Server started on http://localhost:3001");
//   });
// });