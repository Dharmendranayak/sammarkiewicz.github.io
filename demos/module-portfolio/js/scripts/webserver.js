var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),

  PORT = 8003,
  WEBROOT = ".";

http.createServer(function(req, res) {
  var ip = req.connection.remoteAddress;
  paperboy
    .deliver(WEBROOT, req, res)
    .addHeader('Expires', 300)
    .addHeader('X-PaperRoute', 'Node')
    .before(function() {
    })
    .after(function(statCode) {
      log(statCode, req.url, ip);
    })
    .error(function(statCode, msg) {
    res.writeHead(statCode, {'Content-Type': 'text/plain'});
    res.end("Error " + statCode);
    log(statCode, req.url);
    })
    .otherwise(function(err) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Error 404: File not found");
    log(404, req.url);
    });
}).listen(PORT);

function log(statCode, url, ip, err) {
  var logStr = statCode + ' - ' + url + ' - ' + ip;
  if (err)
    logStr += ' - ' + err;
  console.log(logStr);
}

console.log("WEBROOT "+WEBROOT);
console.log("Listening @ "+PORT);

