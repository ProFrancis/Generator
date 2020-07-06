const http = require('http'),
      fs = require('fs'),
      url = require("url"),
      path = require("path"),
      port = process.argv[2] || 8000,
      password = "aaaaaa"

var type = {
  "html": "text/html",
  "json": "application/json",
  "js": "text/javascript"
}

const options = {
  key: fs.readFileSync('pem/key.pem'),
  cert: fs.readFileSync('pem/cert.pem'),
  passphrase: password
}

const app = http.createServer(options, (req, res) => {

  var uri = url.parse(req.url).pathname, 
      file = path.join(process.cwd(), uri);

  fs.exists(file, function(exists) {
    if(!exists) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found\n");
      res.end();
      return;
    }

    if (fs.statSync(file).isDirectory())
      file += 'public/index.html'

  fs.readFile(file, "binary", (err, data) => {
    if(err) {
      res.writeHead(404, { "Content-Type":"text/plain"})
      res.write(err + "\n")
      res.end()
      return;
    }

    var allType = type[file.split('.').pop()]

    if(!allType)
      allType = 'text/plain'

    res.writeHead(200, { "Content-Type" : allType })
    res.write(data, "binary")
    res.end()
    })
  });
})

app.listen(port, (err) => {
  if(err){
    console.log("there is erro ", err)
  }else{
    console.log('the server turn on port => http://localhost:' + port + "/\nCTRL + C to stop server ")
  }
})