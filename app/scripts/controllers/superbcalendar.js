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
    $scope.currentYear = $scope.initialDate.getFullYear();
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

      // rule out excluded dates as unavailable
      if($scope.excludedDates){
        angular.forEach($scope.excludedDates, function(eDate){
          var startingDateTS = Date.parse(eDate.startDate);
          var endingDateTS = Date.parse(eDate.endDate);

          if(eDate.date){
            startingDateTS = Date.parse(eDate.date);
            endingDateTS = startingDateTS;
          }

          var dayInQ;
          angular.forEach(dates, function(day){
            dayInQ = Date.parse(day.date);
            if(startingDateTS <= dayInQ && dayInQ <= endingDateTS){
              day.unavailable = true;
            }
          });
        });
      }

      return dates;
    }

    function clearSelectedDates(){
      $scope.selectedDates = [];
      angular.forEach($scope.calendar, function(month){
        angular.forEach(month, function(day){
          day.selected = false;
          day.inRange = false;
        });
      });
    }

    // initialization of calendar (only the initial month is generated)
    $scope.calendar = {};
    $scope.calendar[$scope.currentYear+'-'+$scope.currentMonth] = rawDaysInMonth($scope.currentMonth, $scope.currentYear);

    // ranges are initialized here and this object shall be used when sending them to API
    $scope.$watchCollection('selectedDates', function(ranges){
      angular.forEach(ranges, function(range){
        // js date
        if((range.startDate && range.endDate) || range.date){
          var startingDateTS = Date.parse(range.startDate);
          var endingDateTS = Date.parse(range.endDate);

          if(range.date){
            startingDateTS = Date.parse(range.date);
            endingDateTS = startingDateTS;
          }
          else {
            // safe check to see if user misbehaved and switched places for start and end date :)
            if(startingDateTS > endingDateTS){
              var tempDate = startingDateTS;
              startingDateTS = endingDateTS;
              endingDateTS = tempDate;
              tempDate = undefined;
            }
          }

          // go through calendar and apply in-range flag wherever aplicable
          angular.forEach($scope.calendar, function(month){
            var dayInQ;
            angular.forEach(month, function(day){
              dayInQ = Date.parse(day.date);
              if(startingDateTS === dayInQ || endingDateTS === dayInQ){
                day.selected = true;
              }
              else if(startingDateTS < dayInQ && dayInQ < endingDateTS){
                day.inRange = true;
              }
            });
          });
        }
      });
    });

    $scope.showPrevMonth = function(){
      $scope.currentMonth--;
      if($scope.currentMonth === 0){
        $scope.currentYear--;
        $scope.currentMonth = 12;
      }
      if(!$scope.calendar[$scope.currentYear+'-'+$scope.currentMonth]) {$scope.calendar[$scope.currentYear+'-'+$scope.currentMonth] = rawDaysInMonth($scope.currentMonth, 2015);}
    };

    $scope.showNextMonth = function(){
      $scope.currentMonth++;
      if($scope.currentMonth === 13){
        $scope.currentYear++;
        $scope.currentMonth = 1;
      }
      if(!$scope.calendar[$scope.currentYear+'-'+$scope.currentMonth]) {$scope.calendar[$scope.currentYear+'-'+$scope.currentMonth] = rawDaysInMonth($scope.currentMonth, 2015);}
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
      else if(date.unavailable){
        return;
      }

      // managing range
      if($scope.selectedDates){
        // if no multiple range is supported, and some is already selected, clear it!
        if(!$scope.multipleDates && $scope.selectedDates.length >= 1){
          clearSelectedDates();
        }

        // make the range selection
        if($scope.allowRange && !$scope.rangeStartDate){
          date.selected = true;
          $scope.rangeStartDate = date;
        }
        else {
          // either not a range (because start and end are same) or no range allowed, hence single date
          if(($scope.allowRange && $scope.rangeStartDate.date === date.date) || !$scope.allowRange){
            // check, if this date is already defined, now delete it
            var alreadyPushed = $scope.selectedDates.indexOf(date);
            if(~alreadyPushed){
              $scope.selectedDates.splice(alreadyPushed, 1);
              date.selected = false;
            }
            else {
              $scope.selectedDates.push(date);
            }
          }
          // last date of range (push it!)
          else {
            $scope.selectedDates.push({startDate: $scope.rangeStartDate.date, endDate: date.date});
          }
          delete $scope.rangeStartDate;
        }
      }
    };

    $scope.hoveringDate = function(date){
      if($scope.selectedDates && $scope.rangeStartDate){
        $scope.hoveringOnDay = date;
      }
    };
  });
