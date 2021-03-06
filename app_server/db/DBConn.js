var DBConn = function DBConnection(){ 

var mongoose = require ("mongoose");

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
process.env.OPENSHIFT_MONGODB_DB_URL ||
process.env.MONGOLAB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/';

uristring = uristring+'guestbook'

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.

console.log('URI STRING FOR DB: ' + uristring);

mongoose.connect(uristring, function (err, res) {
	if (err) { 
		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + uristring);

	}		


});
}

module.exports = DBConn;



