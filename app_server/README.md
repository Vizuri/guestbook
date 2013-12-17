This is the node JS app server portion of the application.  To build and run the server you must have the following requirements met:

1. have node js and npm installed on your machine
	- i am running version 0.10 for node and the lateset version for npm

Steps to build:
1. issue the command for importing the dependencies listed in the package.json file in root directory.  "npm install"

Steps to run:
1. issue the command "node server.js"
	- this will cause the server to start and you should see this "Express server listening on port 3000"

2. Test this by going to "localhost:3000" you should see a stub for a webservice call with just the response being a string with "request checkin"

As of now I only have to endpoints and they just return strings for a couple of things we want to accomplish.  "localhost:3000/whosCheckedIn" returns a string now, however, this will return a list of who all is checked in.


July 7th 2013 
---------------
Need to create the following mongo db and insert the following document in mongo for a result set to be returned with the code.

use guestbook;
db.guests.insert({first_name: "Chester", last_name: "Copperpot", company: "Goonies Inc.", us_citizen: true, checkout_time: null, checkin_time: ISODate("2013-07-24T17:07:00.364Z"), badge_type: 'U', meeting_with: ObjectId('51e85ed323def57c726d1ba9')});


db.users.insert({username: 'cbritz@vizuri.com'
db.employees.insert({first_name: 'John', last_name: 'Riggins'});
db.employees.insert({first_name: 'Alfred', last_name: 'Morris'});
db.employees.insert({first_name: 'Chris', last_name: 'Cooley'});
db.employees.insert({first_name: 'Art', last_name: 'Monk'});
db.employees.insert({first_name: 'Brian', last_name: 'Orakpo'});
db.employees.insert({first_name: 'Ryan', last_name: 'Kerrigan'});
db.employees.insert({first_name: 'RG', last_name: 'III'});


var mongoose = require ("mongoose");

var nameSchema = mongoose.Schema({
    familyName: String,
    givenName: String,
    middleName: String
});

var emailSchema = mongoose.Schema({
    value: String,
    type: String
});

var photoSchema = mongoose.Schema({
    value: String
});

var userSchema = mongoose.Schema({
    provider: String,
    id : String,
    displayName: String,
    name: [nameSchema],
    emails: [emailSchema],
    photos: [photoSchema]

});
db.users.insert({username: 'newuser', password: 'testpass'});