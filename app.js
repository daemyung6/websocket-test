const http = require("http");
const fs = require("fs");
const webServer = http.createServer(function(req, res) {
    let { url, method } = req;
    if(url[url.length - 1] === "/") {
        url += 'index.html';
    }
    console.log(url);
    if(method === "GET") {
        fs.readFile(`${__dirname}/htdoc${url}`, function(err, file) {
            if(err) {
                res.statusCode = 404;
                res.end();
                return;
            }
            if(url.indexOf('.html') != -1) {
                res.writeHead(200, { "Content-Type": 'text/html' });
            }
            else if(url.indexOf('.js') != -1) {
                res.writeHead(200, { "Content-Type": 'text/javascript' });
            }
            else if(url.indexOf('.css') != -1) {
                res.writeHead(200, { "Content-Type": 'text/css' });
            }
            res.end(file);
            return;
        })
    }
    
})
webServer.listen("80");