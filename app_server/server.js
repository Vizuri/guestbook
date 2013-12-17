/**
 * Module dependencies.
 */

var express = require('express')
    , mongoose = require("mongoose")
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , crypto = require('crypto')
    , fs = require('fs')
    , auth = require('./config/middlewares/authorization')

//load the guest and employee schema to mongo registry
    , employee = require('./app/models/Employee')
    , guest = require('./app/models/Guest')
    , user = require('./app/models/User')
    , dbConn = require('./db/DBConn')

    , employeeEndpoint = require('./app/controllers/employee');


// Bootstrap models not working at the moment
//var models_path = __dirname + '/app/models'
//fs.readdirSync(models_path).forEach(function (file) {
//    require(models_path + '/' + file)
//})

var conn = new dbConn()
  , app = module.exports = express();

require('./passport/passport.js')(passport, app);

// Configure some Express settings
app.configure(function () {
    app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
    app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "localhost");
    app.set('views', __dirname + '/public/js/app/views');
    app.set('view engine', 'jade');
    app.set('env', 'development');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

//initialize passport as well as session
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

// Bootstrap routes
require('./config/routes')(app, passport, auth);

http.createServer(app).listen(app.get('port'), app.get('ipaddr'));
console.log('Express server listening on port ' + app.get('port'));
