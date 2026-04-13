const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime-types');

const host = '127.0.0.1';
const port = Number(process.env.PORT || 8080);

const server = http.createServer((request, response) => {
  const parsed = url.parse(request.url).pathname || '/';
  const requestedPath = parsed === '/' ? '/comp7780_home.html' : parsed;
  const safePath = path.normalize(requestedPath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('404 Not Found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': mime.lookup(filePath) || 'application/octet-stream'
    });
    response.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Cycle1 HTTP server running at http://${host}:${port}/comp7780_home.html`);
});
