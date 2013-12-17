angular.module('common_services', ['ngResource']).
    factory('Global',function () {

        var previousUrl = '';


        return {
            getPreviousUrl: function () {
                return previousUrl;
            },
            setPreviousURL: function(value) {
                previousUrl = value;
            }
        }
    });