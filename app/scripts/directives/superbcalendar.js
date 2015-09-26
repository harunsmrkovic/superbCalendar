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
        selectedRanges: '=', // array holding all the selected ranges
        multipleRanges: '@', // flag determining if multiple ranges are supported (true/ empty)
        selectedDates: '=', // array holding all the selected single dates
        multipleDates: '@'// flag determining if multiple single dates are supported (true/ empty)
      },
      controller: 'superbCalendarCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
