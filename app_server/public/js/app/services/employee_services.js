angular.module('employee_services', ['ngResource']).
    factory('EmployeeById',function ($resource) {
        return $resource('/findempbyid/:id', {}, {
            findEmpById: {method: 'GET', isArray: false}
        });
    }).
    factory('EmpFullName', function () {

        return{
            getFullName: function(employee) {
                return employee.first_name + ' ' + employee.last_name;
            }
        }
    });
