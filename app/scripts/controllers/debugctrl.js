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
      ranges: [{startDate:'2015-09-19', endDate:'2015-09-23'}],
      dates: []
    };
  });
