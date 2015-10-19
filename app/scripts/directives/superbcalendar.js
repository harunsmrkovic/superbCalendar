'use strict';

/**
 * @ngdoc directive
 * @name superbCalendarApp.directive:superbCalendar
 * @description
 * # superbCalendar
 */
angular.module('superbCalendar')
  .directive('superbCalendar', function () {
    return {
      templateUrl: 'views/_calendar.html',
      restrict: 'E',
      scope: {
        initialDate: '@', // start from this date (Y-m-d)
        selectedDates: '=', // array holding all the selected single dates and ranges
        allowRange: '@',
        multipleDates: '@',
        excludedDates: '=',
        showControls: '@',
        minDate: '@',
        maxDate: '@'
      },
      controller: 'superbCalendarCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
