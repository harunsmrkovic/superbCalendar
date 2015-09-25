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
        initialDate: '@',
        ranges: '=',
        multipleDates: '@'
      },
      controller: 'superbCalendarCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
