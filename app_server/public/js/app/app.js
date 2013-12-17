'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', ['myApp.controllers', 'ui.bootstrap']).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home',
                controller: 'HomeCtrl'
            }).
            when('/', {
                templateUrl: '/init/login',
                controller: 'LoginCntrl'
            }).
            when('/addguest', {
                templateUrl: 'partials/addguest',
                controller: 'AddGuestCtrl'
            }).
            when('/delguest/:id', {
                templateUrl: 'partials/delguest',
                controller: 'DelGuestCtrl'
            }).
            when('/editguest/:id', {
                templateUrl: 'partials/editguest',
                controller: 'EditGuestCtrl'
            }).
            when('/employeedir', {
                templateUrl: 'partials/employee',
                controller: 'EmployeeDirCntrl'
            }).
            otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(false);
    }]);
