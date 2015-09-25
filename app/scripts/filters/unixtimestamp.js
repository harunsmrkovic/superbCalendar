'use strict';

/**
 * @ngdoc filter
 * @name superbCalendarApp.filter:unixtimestamp
 * @function
 * @description
 * # unixtimestamp
 * Filter in the superbCalendarApp.
 */
angular.module('superbCalendarApp')
  .filter('unixtimestamp', function () {
    return function (input) {
      if(input){
        return new Date(input.replace(/-/g, '/')).getTime();
      }
    };
  });
