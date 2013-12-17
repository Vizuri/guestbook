angular.module('login_services', ['ngResource']).
    factory('LoggedIn',function () {

        var isLoggedIn = false;


        return {
            getIsLoggedIn: function () {
                return isLoggedIn;
            },
            setIsLoggedIn: function (value) {
                isLoggedIn = value;
            }
        }
    }).
    factory('Login', function ($resource) {
        return $resource('/passport/password/start', {}, {
            login: {method: 'POST'}
        });
    });