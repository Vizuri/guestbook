'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource', 'guest_services', 'employee_services', 'common_services', 'login_services']).

    controller('LoginCntrl',function ($scope, $http, $location, LoggedIn, Login) {

//        var data = $scope.form;

        $scope.login = function () {
            $http.post('/passport/password/start', $scope.form).
                success(function (data, status, headers, config) {
                    console.log(data);
                    $location.url('/home')
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);

                });
        };

        $scope.saveUser = function () {
            $http.post('/createuser', $scope.form).
                success(function (data, status, headers, config) {
                    console.log(data);
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);

                });
        };

        $scope.googlelogin = function () {
            window.location = '/passport/google';
            LoggedIn.setIsLoggedIn(true);
        };

//        if (LoggedIn.getIsLoggedIn() == false) {
//            $location.url('partials/login');
//        } else {
//            $location.url('partials/home')
//        }

    }).
    controller('HomeCtrl',function ($scope, $http, $location, Guests, BadgeType) {

        var guestsArr = [];

        Guests.getWhosCheckedIn(function (guests) {
            guestsArr = guests;
            $scope.guests = guests;
            $scope.predicate = '-checkin_time';
        });


        $scope.changeBadgeType = function (guest) {
            console.log('CHANGED ' + guest._id + ' BT TO:' + guest.badge_type);

            BadgeType.chngBadgeType({id: guest._id, update: {badge_type: guest.badge_type}});
        }

        $scope.addGuest = function () {
            $location.path('/addguest');
        }

        $scope.signout = function () {
            $http({method: 'GET', url: '/logout'}).
                success(function (data, status, headers, config) {
                    console.log(data);
                    $location.url('/login');
                }).
                error(function (data, status, headers, config) {
                    console.log('error')
                });
        };


    }).
    controller('AddGuestCtrl',function ($scope, $http, $location, Guest, selectedEmployee, SharedProps) {

        $scope.form = {};

        var meet_with_employee = {}
            , emp_full_name = '';


        $scope.lookupEmployee = function () {
            selectedEmployee.setGuestFormData($scope.form);
            SharedProps.setPreviousURL($location.path());

            $location.path('employeedir');
        };

        meet_with_employee = selectedEmployee.getEmployeeData();

        if (meet_with_employee != '') {
            emp_full_name = meet_with_employee.first_name + ' ' + meet_with_employee.last_name;
            $scope.form = selectedEmployee.getGuestFormData();
            $scope.form.meeting_with = emp_full_name;
        }


        $scope.submitGuest = function () {
            console.log('Submitting guest');

            //we only need to grab the id since we only store the
            //id in the Node JS model
            $scope.form.meeting_with = meet_with_employee._id;

            Guest.saveguest($scope.form, function(callback){
                $location.url('/home');
                //clear form data saved in the selectedEmployee service
                selectedEmployee.setGuestFormData('');

            });


        };

    }).
    controller('DelGuestCtrl',function ($scope, $http, $routeParams, $location) {

        $http.get('/findguestbyid/' + $routeParams.id).
            success(function (data) {
                $scope.guest = data;
            }).
            error(function (data, status, headers, config) {
                $scope.guest.first_name = 'ERROR!!!'
            });

        $scope.delGuest = function () {
            console.log('Deleting guest');
            $http.delete('/delguest/' + $routeParams.id).
                success(function (data) {
                    $location.url('/home');
                });

            $scope.home = function () {
                $location.url('/home');
            };
        }

    }).
    controller('EditGuestCtrl',function ($scope, $http, $routeParams, $location, GuestById, EmpFullName, UpdateGuest, selectedEmployee, SharedProps) {
        var guest = {}
            , employee = {}
            , emp_full_name = ''
            , meeting_with_id = '';


        //Reloading with every route change. Need to change this to only update on initial
        //page load
        GuestById.findbyid({id: $routeParams.id}, function (guest) {
            $scope.guest = guest;
            $scope.guest.meeting_with.full_name = EmpFullName.getFullName(guest.meeting_with);
        });

        $scope.lookupEmployee = function () {
            $scope.guest.meeting_with = {};
            selectedEmployee.setGuestFormData($scope.guest);
            SharedProps.setPreviousURL($location.path())
            $location.path('/employeedir');
        };

        $scope.save_changes = function () {

            UpdateGuest.updateguest({id: $scope.guest._id,  update: $scope.guest});
        };

    }).
    controller('EmployeeDirCntrl',function ($scope, $http, $routeParams, $location, selectedEmployee, SharedProps) {

        $http.get('/employeedir').
            success(function (data) {
                $scope.employees = data;
            }).
            error(function (data, status, headers, config) {
                $scope.employees = 'ERROR!!!'
            });

        $scope.selectEmployee = function (employee) {
            selectedEmployee.setEmployeeData(employee);

            $location.path(SharedProps.getPreviousUrl());
        };

        //test using rootscope
//        $scope.$on('testCall',function(data) {
//            $scope.test = 'Johnson Dog Nabit~~'
//        });
    }).
    controller('MyCtrl2', function ($scope) {
        // write Ctrl here

    });
