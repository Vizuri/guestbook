var mongoose = require ("mongoose"); 

var employeeSchema = mongoose.Schema({
	first_name : String,
	last_name : String
});
 
mongoose.model('Employee', employeeSchema);
