const http = require('http'),
      ejs = require('ejs'),
      localhost = 'localhost:8080/',
      pathJson = 'api/api.json',
      fs = require('fs'),
      port = 8080,
      obj = [],
      password = "aaaaaa",
      { parse } = require('querystring');


var dataJson,
    err = false,
    sucess
    

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
  
      const reg = new RegExp(/^\d+$/)
      const test = reg.test(data.name)

      if(data.name && test === false){
        obj.push({
          name: data.name,
          techno: null
        })
        err = false
      }else{
        err = "Le name doit être un string"
      }

      if(data.techno && test === false){
        var randomMembre = obj[Math.floor(Math.random() * obj.length)];
        randomMembre.techno = data.techno
        sucess = "TECHNO STRING"
        err = false
      }else {
        err = "Techno doit etre un string"
      }

      result = JSON.stringify(obj)

      fs.writeFile(pathJson, result, (err) => {
        if(req.url == '/')
          res.writeHead(301, { "Location" : "http://" + localhost});
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
          <head>
          <style>
            .barre{
              text-decoration: line-through;
            }
          </style>
          </hea>
          <html>
            <body>
              <h1><%= title %></h1>
              <ul>
                <% state.forEach(function(membre) { %> 
                  <%if(membre.techno != null) { %>
                    <li class="barre" ><%= membre.name %></li>
                  <% }else{  %>
                    <li ><%= membre.name %></li>
                      <% } %>
                <% }) %>
              </ul>
              <form action="/" method="POST">
                <input type="text" name="name"/>
                <button>Save</button>
              </form>
              <ul>
              <% state.forEach(function(membre) { %> 
                <%if(membre.techno != null) { %>
                  <li><%= membre.name %> - <%= membre.techno %></li>
                <% } %>
              <% }) %>
            </ul>
            <% if(err !== false) { %> 
              <p><%= err %></p>
              <% } %>
              <form action="/" method="POST">
                <input type="text" name="techno"/>
                <button>Save</button>
              </form>
            </body>
          </html>
        `,{
          state: dataJson, 
          title: "Generator",
          err: err,
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

addVielle = (data, test ) => {
  if(data && test === false){
    var randomMembre = obj[Math.floor(Math.random() * obj.length)];
    randomMembre.techno = data.techno
    sucess = "TECHNO STRING"
    err = false
  }else {
    err = "Techno doit etre un string"
  }
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    console.log("REQUEST HEADERS => ")
    console.log(request.headers['content-type']);
    
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}