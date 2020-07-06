const http = require('http'),
      fs = require('fs'),
      url = 'public/index.html',
      password = "aaaaaa"

const options = {
  key: fs.readFileSync('pem/key.pem'),
  cert: fs.readFileSync('pem/cert.pem'),
  passphrase: password
}

const app = http.createServer(options, (req, res) => {
  fs.readFile(url, (err, data) => {
    if(err) {
      res.writeHead(404)
      console.log("something went wong :( ")
    }else{
      res.writeHead(200, {'Content-Type': 'text:html'})
      res.write(data)
    }
    res.end()
  })
})

app.listen(8000, (err) => {
  if(err){
    console.log("there is erro ", err)
  }else{
    console.log('the server turn on port 8000 !')
  }
})