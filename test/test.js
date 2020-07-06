const https = require('https'),
      fs = require('fs')

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'aaaaaa'
}

const app = https.createServer(options, (req, res) => {
  fs.readFile('test.html' , (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write(res)
    res.end()
  })
})

app.listen(8000, () => {
  console.log('the server turn on port 8000 !')
})

//  fonctionel 
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

// fonctionnelle 

const http = require('http'),
      fs =  require('fs')
      url = "index.html"

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'aaa'
}

http.createServer(options, (req, res) => {
  fs.readFile(url, (err, data) => {
    if(err){
      res.writeHead(404)
      res.write("Error: file not found")
    }else{
      res.writeHead(200, { 'Content-Type' : 'text:html'})
      res.write(data)
    }
    res.end()
  })
}).listen(8000, (err) => {
  if(err) {
    console.log("something went wrong", err)
  } else {
    console.log("Sever is listening on port 8000! ")
  }
})