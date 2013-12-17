angular.module('guest_services', ['ngResource']).
    factory('Guests',function ($resource) {
        return $resource('/whosCheckedIn', {}, {
            getWhosCheckedIn: {method: 'GET', isArray: true}
        });
    }).
    factory('Guest',function ($resource) {
        return $resource('/saveguest', {}, {
            saveguest: {method: 'POST'}
        });

    }).
    factory('GuestById',function ($resource) {
        return $resource('/findguestbyid/:id', {}, {
            findbyid: {method: 'GET', isArray: false}
        });
    }).
    factory('UpdateGuest',function ($resource) {
        return $resource('/updateguest', {}, {
            updateguest: {method: 'POST'}
        });
    }).
    factory('BadgeType',function ($resource) {
        return $resource('/chngBadgeType', {}, {
            chngBadgeType: {method: 'POST'}
        });
    }).
    factory('eventBroadcast',function ($rootScope) {
        var eventBroadcaster = {};


        // The message is a string or object to carry data with the event.
        eventBroadcaster.message = '';

        // The event name is a string used to define event types.
        eventBroadcaster.eventName = '';

        // This method is called from within a controller to define an event and attach data to the eventBroadcaster object.
        eventBroadcaster.broadcast = function (event, msg) {
            this.message = msg;
            this.eventName = event;
            this.broadcastItem();
        };

        // This method broadcasts an event with the specified name.
        eventBroadcaster.broadcastItem = function () {
            console.log('IN EVENT BROADCAST');
            $rootScope.$broadcast(this.eventName);
        };

        return eventBroadcaster;
    }).factory('selectedEmployee',function () {

        var guest_form_data = ''
            , employee_data = '';


        return {
            getGuestFormData: function () {
                return guest_form_data;
            },
            setGuestFormData: function(value) {
                guest_form_data = value;
            },
            getEmployeeData: function(){
                return employee_data;
            },
            setEmployeeData: function(value) {
                employee_data = value;
            }
        };
    });




