var express = require('express');
var path = require('path');
var fs = require('fs');
var marked = require('marked');

var app = express();

app.set('view engine', 'ejs');
app.use("/static", express.static(path.join(__dirname + '/static/node_modules/')));
app.use("/css", express.static(path.join(__dirname + '/static/css/')));

app.get('/', function(req, res) {
    var path = __dirname + '/README.md';
    var file = fs.readFileSync(path, 'utf8');
    res.send(marked(file.toString()));
});

app.get('/demo', function(req, res) {
    res.render('demo.ejs', { title: "CrudJS Demo" });
});

var port = 5000;
var baseUrl = 'http://localhost:' + port;
app.listen(port);
console.log('Running index.js at ' + baseUrl + '/');
console.log("Urls: ");
for (var i = 0; i < app._router.stack.length; i++) {
    if(app._router.stack[i].route !== undefined) {
        console.log("> "+baseUrl+app._router.stack[i].route.path);
    }
}
