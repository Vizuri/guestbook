
module.exports = function (app, passport, auth) {

    // user routes
    var users = require('../app/controllers/users')
    app.get('/signin', users.signin)
    app.get('/signup', users.signup)
    app.post('/createuser', users.create)


    //home route
    var routes = require('../app/controllers/index')
    app.get('/', routes.index);
    app.get('/init/login', routes.initpage);
    app.get('/partials/:name', auth.requiresLogin, routes.partials);

    //Guest Routes
    var guests = require('../app/controllers/guest')
    app.get('/getAllGuests', guests.getAllGuests);
    app.post('/saveguest', guests.saveguest);
    app.get('/findguestbyid/:id', guests.findById)
    app.delete('/delguest/:id', guests.delguest);
    app.post('/chngBadgeType', guests.changeBadgeType);
    app.post('/updateguest', guests.updateguest);
    app.get('/whosCheckedIn', guests.getCheckedInGuests);
    app.post('/signout', guests.signout);

    //mobile API
    app.post('/getbyname', guests.getbyname);

    //Employee Routes
    var employees = require('../app/controllers/employee')
    app.get('/employeedir', employees.getAllEmployees);
    app.get('/findempbyid/:id', employees.findEmpById);

    //PASSPORT ROUTES
    app.post( '/passport/password/start'
        , passport.authenticate( 'local'
            , { successRedirect: '/passport/success',
                failureRedirect: '/passport/failure'  }
        )
    );

    app.get( '/passport/logout' , function(req, res) {
        req.logOut();
        req.session.destroy();
        res.render('logout');
    });

    app.get( '/passport/success' , function(req,res) {
        console.log('in /passport/success');
        // res.render('success', {logged_in_user:req.user});
        res.send('SUCESS');
    });

    app.get( '/passport/failure' , function(req, res) {
        res.render('/init/login');
    });

    app.get( '/passport/session' , function(req, res) {
        res.send(req.session);
    });

    app.get( '/passport/userid' , function(req, res) {
        res.send(req.user);
    });



}