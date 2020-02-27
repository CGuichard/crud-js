var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req, res) {
    res.send("CrudJS index");
});

app.get('/demo', function(req, res) {
    res.send("CrudJS demo");
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
