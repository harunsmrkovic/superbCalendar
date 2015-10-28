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
      busyDates: [],
      dates: [{date: "2015-10-24"}, {startDate: "2015-11-08",endDate: "2015-11-12"}]
    };
  });
