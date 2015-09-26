'use strict';

/**
 * @ngdoc overview
 * @name superbCalendarApp
 * @description
 * # superbCalendarApp
 *
 * Main module of the application.
 */
angular
  .module('superbCalendar', []);

'use strict';

/**
 * @ngdoc function
 * @name superbCalendarApp.controller:SuperbcalendarCtrl
 * @description
 * # SuperbcalendarCtrl
 * Controller of the superbCalendarApp
 */
angular.module('superbCalendar')
  .controller('superbCalendarCtrl', function($scope, $log){

    // if there is no initial date, use Today
    if(!$scope.initialDate){
      $scope.initialDate = new Date();
    }
    else {
      $scope.initialDate = new Date($scope.initialDate);
    }

    $scope.currentMonth = $scope.initialDate.getMonth()+1;
    $scope.monthsDuration = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    $scope.allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function rawDaysInMonth(m, y) {
      m = parseInt(m, 10);
      y = parseInt(y, 10);

      if ((y%4) === 0){
        $scope.monthsDuration[1] = 29;
      }

      var pm = new Date(y, (m - 1), 1);
      var zm = new Date(y, (m - 1), $scope.monthsDuration[m - 1]);
      var pm_day = (pm.getDay() === 0) ? 7 : pm.getDay();

      var dates = [];
      var tm, i;

      // days from previous month
      for (i = 0; i < (pm_day - 1); i++) {
        tm = (m === 1) ? 12 : m - 1;
        dates.unshift({
          date: [ (m === 1 ? (y - 1) : y), ('0'+(tm)).slice(-2), ('0'+($scope.monthsDuration[tm - 1] - i)).slice(-2) ].join('-'),
          prevMonth: true
        });
      }

      // days from current month
      for (i = 1; i <= $scope.monthsDuration[m - 1]; i++) {
        dates.push({
          date: [ y, ('0'+m).slice(-2), ('0'+i).slice(-2) ].join('-')
        });
      }

      // days from next month
      if (zm.getDay() > 0 && zm.getDay() < 7) {
        for (i = 1; i <= (7 - zm.getDay()); i++) {
          dates.push({
            date: [ (m === 12 ? (y + 1) : y), ('0'+(m === 12 ? 1 : (m + 1))).slice(-2), ('0'+i).slice(-2) ].join('-'),
            nextMonth: true
          });
        }
      }

      return dates;
    }

    function clearSelectedDays(){
      angular.forEach($scope.calendar, function(month){
        angular.forEach(month, function(day){
          day.selected = false;
        });
      });
    }

    function getMonthFromString(dateString){
      return parseInt(dateString.split('-')[1]);
    }

    // initialization of calendar (only the initial month is generated)
    $scope.calendar = {};
    $scope.calendar[$scope.currentMonth] = rawDaysInMonth($scope.currentMonth, 2015);

    // ranges are initialized here and this object shall be used when sending them to API
    $scope.$watchCollection('ranges', function(ranges){
      angular.forEach(ranges, function(range){
        // js date
        var startingDateTS = Date.parse(range.startDate);
        var endingDateTS = Date.parse(range.endDate);

        // month
        var startingMonth = getMonthFromString(range.startDate);
        var endingMonth = getMonthFromString(range.endDate);

        for(var mi = startingMonth; mi <= endingMonth; mi++){
          var dayInQ;
          angular.forEach($scope.calendar[mi], function(day){
            dayInQ = Date.parse(day.date);
            if(startingDateTS < dayInQ && dayInQ < endingDateTS){
              day.inRange = true;
            }
          });
        }
      });
    });

    $scope.showPrevMonth = function(){
      var followingMonth = $scope.currentMonth - 1;
      if(!$scope.calendar[followingMonth]) {$scope.calendar[followingMonth] = rawDaysInMonth(followingMonth, 2015);}
      $scope.currentMonth--;
    };

    $scope.showNextMonth = function(){
      var followingMonth = $scope.currentMonth + 1;
      if(!$scope.calendar[followingMonth]) {$scope.calendar[followingMonth] = rawDaysInMonth(followingMonth, 2015);}
      $scope.currentMonth++;
    };

    $scope.clickedDate = function(date){
      if(date.prevMonth){
        $scope.showPrevMonth();
        return;
      }
      else if(date.nextMonth) {
        $scope.showNextMonth();
        return;
      }

      // if multiple dates are not supported, clear all days
      if(!$scope.multipleDates){
        // clearSelectedDays();
      }

      // make it selected!
      date.selected = true;

      // managing range
      if($scope.ranges){
        if(!$scope.rangeStartDate){
          $scope.rangeStartDate = date;
        }
        else {
          date.selected = true;
          $scope.ranges.push({startDate: $scope.rangeStartDate.date, endDate: date.date});
          delete $scope.rangeStartDate;
        }
      }
    };

    $scope.hoveringDate = function(date){
      if($scope.range && $scope.rangeStartDate){
        $scope.hoveringOnDay = date;
      }
    };
  });

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

'use strict';

angular.module('superbCalendar').
run(['$templateCache', function($templateCache) {
  $templateCache.put('views/_calendar.html', '<div class="booking-calendar"><div class="days-wrap" ng-repeat="(monthNumber, month) in calendar" ng-show="monthNumber == currentMonth"><div class="day"><span>P<span class="hidden-xs">on</span></span></div><div class="day"><span>U<span class="hidden-xs">to</span></span></div><div class="day"><span>S<span class="hidden-xs">ri</span></span></div><div class="day"><span>Č<span class="hidden-xs">et</span></span></div><div class="day"><span>P<span class="hidden-xs">et</span></span></div><div class="day"><span>S<span class="hidden-xs">ub</span></span></div><div class="day"><span>N<span class="hidden-xs">ed</span></span></div><br><span ng-repeat="date in month" class="date {{(((date.date | unixtimestamp) > (rangeStartDate.date | unixtimestamp)) && ((date.date | unixtimestamp) < (hoveringOnDay.date | unixtimestamp))) ? \'hovered-in-range\' : \'\'}}" ng-class="{\'next-or-prev-month\': date.nextMonth || date.prevMonth, \'selected\': date.selected, \'in-range\': date.inRange}" ng-click="clickedDate(date)" ng-mouseover="hoveringDate(date)"><span>{{date.date | date: \'d\' }}</span></span><div class="clearfix"></div><hr></div></div>');
}]);

'use strict';

/**
 * @ngdoc filter
 * @name superbCalendarApp.filter:unixtimestamp
 * @function
 * @description
 * # unixtimestamp
 * Filter in the superbCalendarApp.
 */
angular.module('superbCalendar')
  .filter('unixtimestamp', function () {
    return function (input) {
      if(input){
        return new Date(input.replace(/-/g, '/')).getTime();
      }
    };
  });
