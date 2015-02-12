var express = require('express');
var nunjucks = require('nunjucks');
var bluebird = require('bluebird');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var shortId = require('shortid');

var storageFactory = require("./lib/storage");

shortId.seed(150692748012255356);

function addToRequestMiddleware(name, value) {
    return function(req, res, next) {
        req[name] = value;
        next();
    }
}

function startServer(port, path, callback) {
    var app = express();

    app.use(morgan('dev'));
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    var env = nunjucks.configure('views', {
        autoescape: true,
        express: app,
        watch: true
    });

    env.addFilter('prettyjson', function(e) {
        return JSON.stringify(e, null, 4);
    })

    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(express.static(__dirname + '/public'));

    var config = {
        storageUri: "dummy://"
    }

    config.storageUri = "fs://./teststorage";

    var storage = storageFactory.getStorage(config.storageUri);

    app.use(addToRequestMiddleware("storage", storage));
    
    require('./lib/routes')(app);

    console.log("Listening on", port);
    app.listen(port);
    if (callback) { callback(app); }
    return app;
}

exports.startServer = startServer;

