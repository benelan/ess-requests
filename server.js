const httpsServer = require('https').createServer
const httpServer = require('http').createServer
const { parse } = require('url')
const next = require('next')
const fs = require('fs')

const prod = process.env.NODE_ENV === 'production'
const app = next({ prod })
const handle = app.getRequestHandler()

process.env.NODE_ENV = 'production'

const httpsOptions = {
  /** FOR DEV */
  key: fs.readFileSync('./certs/unsigned.key'),
  cert: fs.readFileSync('./certs/unsigned.crt'),
  /** FOR PROD */
  // key: fs.readFileSync("./certs/essapps.key"),
  // cert: fs.readFileSync("./certs/essapps.crt"),
}

const portHTTP = 3001
const portHTTPS = 3000

app.prepare().then(() => {
  httpsServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(portHTTPS, (err) => {
    if (err) throw err
    console.log(`> HTTPS listening on port ${portHTTPS}`)
  })

  httpServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(portHTTP, (err) => {
    if (err) throw err
    console.log(`> HTTP listening on port ${portHTTP}`)
  })
})
