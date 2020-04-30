var express = require('express');
var path = require('path');
var fs = require('fs');
var marked = require('marked');
var cors = require('cors');

var app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use("/static", express.static(path.join(__dirname + '/static/')));
app.use("/dependencies", express.static(path.join(__dirname + '/static/node_modules/')));
app.use("/css", express.static(path.join(__dirname + '/static/css/')));
app.use("/js", express.static(path.join(__dirname + '/static/js/')));
app.use("/images", express.static(path.join(__dirname + '/static/images/')));
app.use("/crudjs", express.static(path.join(__dirname + '/src/')));

app.get('/', function(req, res) {
    res.redirect('/readme');
});

app.get('/readme', function(req, res) {
    var path = __dirname + '/README.md';
    var file = fs.readFileSync(path, 'utf8');
    res.render('readme.ejs', {readme_html: marked(file.toString())});
});

app.get('/demo', function(req, res) {
    res.render('demo.ejs');
});

app.get('/demo/data', function(req, res) {
    var json = {
        columns: [
            {
                name: "Name",
                type: "text",
                options: {
                    helpText: "The name needs to have between 1 and 50 characters and composed of only alphabetic letters without accentuation. Space and hyphen authorized.",
                    validators: {
                        minLength: 1,
                        maxLength: 50,
                        regex: "^[A-Za-z-\ ]*$"
                    }
                }
            },
            {
                name: "Mail",
                type: "email",
                options: {
                    helpText: "The email needs to end with \".com\".",
                    validators: {
                        "domain": ".com"
                    }
                }
            },
            {
                name: "Age",
                type: "int",
                options: {
                    helpText: "The age needs to be between 1 and 120.",
                    validators: {
                        min: 1,
                        max: 120
                    }
                }
            },
            {
                name: "Gender",
                type: "select",
                options: {
                    values: ["Men", "Women", "Other"]
                }
            },
            {
                name: "Busy day",
                type: "select-chips",
                options: {
                    helpText: "You'll need to select between 1 and 5 elements.",
                    values: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    validators: {
                        minSelect: 1,
                        maxSelect: 5
                    }
                }
            }
        ],
        values: [
            ["Thomas", "thomas@example.com", 16, "Men", ["Monday", "Tuesday", "Wednesday"]],
            ["Giovanni", "giovanni@example.com", 54, "Women", ["Thursday", "Friday"]],
            ["Super Cookie", "super-cookie@example.com", 1, "Other", ["Saturday"]]
        ],
        options: {
            deleteMessage: "You want to delete this line? Sure at 100%?",
            examples: [
                ["Example", "example@example.com", 77, "Other", ["Tuesday"]],
                ["AnotherExample", "another-example@example.com", 65, "Other", ["Monday", "Tuesday"]]
            ]
        }
    };
    res.json(json);
});

app.post('/demo/data', function(req, res) {
    for(var i = 0; i < req.body.actions.length; i++) {
        var j;
        var request = req.body.actions[i].request;
        switch(request) {
            case "NEW":
                req.body.actions[i].result = [];
                for(j = 0; j < req.body.actions[i].new_values.length; j++) {
                    req.body.actions[i].result.push(['OK']);
                }
                break;
            case "MODIFIED":
                req.body.actions[i].result = [];
                for(j = 0; j < req.body.actions[i].new_values.length; j++) {
                    req.body.actions[i].result.push(['OK']);
                }
                break;
            case "DELETED":
                req.body.actions[i].result = [];
                for(j = 0; j < req.body.actions[i].old_values.length; j++) {
                    req.body.actions[i].result.push(['ERROR', "Example of error"]);
                }
                break;
        }
    }
    res.json(req.body);
});

app.get('/docs', function(req, res) {
    res.send('Docs');
});

var port = 5000;
var baseUrl = 'http://localhost:' + port;
app.listen(port);
console.log('Running index.js at ' + baseUrl + '/');
console.log("Urls: ");
for(var i = 0; i < app._router.stack.length; i++) {
    if(app._router.stack[i].route !== undefined) {
        var typeMeth = (app._router.stack[i].route.methods.post) ? "POST" : "GET";
        console.log("> HTTP "+typeMeth+": "+baseUrl+app._router.stack[i].route.path);
    }
}
