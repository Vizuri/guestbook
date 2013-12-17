var mongoose = require('mongoose')
, Employee = mongoose.model('Employee');

exports.getAllEmployees = function(req, res){
	
	Employee.find(function (err, employees) {
		if (err){
			console.log('Had Error of:  ' + err);
		}else{ 
			console.log('EMPLOYEE LIST: ' + employees)
			res.send(employees); 

		}
	})
};

exports.findEmpById = function(req, res){

    var id = req.params.id;

    Employee.findById(id, function(err, employee){
        console.log("FOUND EMPLOYEE" + employee.last_name)
        res.send(employee);
    });
};