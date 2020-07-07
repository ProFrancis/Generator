const http = require('http'),
      ejs = require('ejs'),
      localhost = 'localhost:8080/',
      pathJson = 'api/api.json',
      fs = require('fs'),
      port = 8080,
      obj = { members: []},
      password = "aaaaaa",
      { parse } = require('querystring');

var dataJson;

ejs.delimiter = '%';
ejs.openDelimiter = '<';
ejs.closeDelimiter = '>';

const options = {
  key: fs.readFileSync('pem/key.pem'),
  cert: fs.readFileSync('pem/cert.pem'),
  passphrase: password
}

const server = http.createServer(options, (req, res) => {

  if (req.method === 'POST') {
    collectRequestData(req, data => {
      console.log('DATA => ')
      console.log(data)

      obj.members.push(data)
      result = JSON.stringify(obj)

      fs.writeFile(pathJson, result, (err) => {
        
        if (err) throw err;
        console.log('the file has been saved!')

        if(req.url == '/')
          res.writeHead(301, { "Location": "http://" + localhost});
          return res.end();
      })
    });
  } 
  else {
    dataJson = JSON.parse(fs.readFileSync(pathJson, 'utf-8'))
    res.end(
      ejs.render(
        `
          <!doctype html>
          <html>
            <body>
              <h1><%= title %></h1>
              <ul>
                <% state.forEach(function(membre) { %> 
                  <li><%= membre.name %></li>
                <% }) %>
              </ul>
              <form action="/" method="POST">
              <input type="text" name="name"/>
              <button>Save</button>
            </form>
            </body>
          </html>
        `,{
          state: dataJson.members, 
          title: "Generator"
        }
      )
    );
  }
});

server.listen(port, (err) => {
  if(err){
    console.log("there is erro ", err)
  }else{
    console.log('the server turn on port => http://localhost:' + port + "/\nCTRL + C to stop server ")
  }
})

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    console.log("REQUEST HEADERS => ")
    console.log(request.headers['content-type']);
    
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
            console.log('CHUNK => ')
            console.log(chunk)
        });
        request.on('end', () => {
            console.log('BODY => ')
            console.log(body)
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}