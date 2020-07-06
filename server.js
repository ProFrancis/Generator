const http = require('http'),
      fs = require('fs')

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'aaaaaa'
}

const app = http.createServer(options, (req, res) => {
  fs.readFile('index.html' , (err, data) => {
    if(err) {
      res.writeHead(404)
      console.log("something went wong :( ")
    }else{
      res.writeHead(200, {'Content-Type': 'text/plain'})
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