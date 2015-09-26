'use strict';

/**
 * @ngdoc function
 * @name superbCalendarApp.controller:SuperbcalendarCtrl
 * @description
 * # SuperbcalendarCtrl
 * Controller of the superbCalendarApp
 */
angular.module('superbCalendar')
  .controller('debugCtrl', function($scope, $log){
    $scope.bookingCalendar = {
      busyDates: [{startDate: "2015-09-25",endDate: "2015-09-26"},{date: "2015-09-29"},{startDate: "2015-09-30",endDate: "2015-10-08"}],
      dates: []
    };
  });
