  var mongoose = require('mongoose')
    , User = mongoose.model('User');



module.exports = function (passport, app) {

    // API Access link for creating client ID and secret:
    // https://code.google.com/apis/console/
    var GOOGLE_CLIENT_ID = "934748356626.apps.googleusercontent.com";
    var GOOGLE_CLIENT_SECRET = "zRrlGAjarsFCpKRXJ6RZqQZx";

    var LocalStrategy = require('passport-local').Strategy,
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Passport session setup.
//   To support persistent layout.html sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //   var thisUser = require('../controllers/user');

    // local: check if a u/p is good then cb
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }
        , function (username, password, done) {

            var user = null;

            User.find({'username' : username}, function (err, users) {
                if (err) {
                    console.log('Had Error of:  ' + err);
                } else {
                    console.log('USER LIST PASSPORT: ' + users)
                    user = users[0];

                    if(user == null)
                    { return done(null, false, {message: 'Bad username or password'}) };
                    //keep going otherwise

                    if(user.password == password) {   // password matched
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Bad username or password'});
                    };
                }
            });




        }
    )); //end of passport.use() localstrategy


    //Google OAuth2
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/oauth2callback"
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);

            done(null, profile);
        }

    ));

};