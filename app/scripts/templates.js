'use strict';

angular.module('superbCalendar').
run(['$templateCache', function($templateCache) {
  $templateCache.put('views/_calendar.html',
    '<div class="booking-calendar">\n' +
    '  <div class="days-wrap" ng-repeat="(monthNumber, month) in calendar" ng-show="monthNumber == currentMonth">\n' +
    '    <div class="day"><span>P<span class="hidden-xs">on</span></span></div>\n' +
    '    <div class="day"><span>U<span class="hidden-xs">to</span></span></div>\n' +
    '    <div class="day"><span>S<span class="hidden-xs">ri</span></span></div>\n' +
    '    <div class="day"><span>Č<span class="hidden-xs">et</span></span></div>\n' +
    '    <div class="day"><span>P<span class="hidden-xs">et</span></span></div>\n' +
    '    <div class="day"><span>S<span class="hidden-xs">ub</span></span></div>\n' +
    '    <div class="day"><span>N<span class="hidden-xs">ed</span></span></div>\n' +
    '    <br>\n' +
    '    <span ng-repeat="date in month" class="date {{(((date.date | unixtimestamp) > (rangeStartDate.date | unixtimestamp)) && ((date.date | unixtimestamp) < (hoveringOnDay.date | unixtimestamp))) ? \'hovered-in-range\' : \'\'}}" ng-class="{\n' +
    '        \'next-or-prev-month\': date.nextMonth || date.prevMonth,\n' +
    '        \'selected\': date.selected,\n' +
    '        \'in-range\': date.inRange\n' +
    '        }" ng-click="clickedDate(date)" ng-mouseover="hoveringDate(date)">\n' +
    '      <span>{{date.date | date: \'d\' }}</span>\n' +
    '    </span>\n' +
    '    <div class="clearfix"></div>\n' +
    '    <hr>\n' +
    '  </div>\n' +
    '</div>'
  );
}]);
