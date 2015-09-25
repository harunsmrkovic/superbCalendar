'use strict';

describe('Directive: superbCalendar', function () {

  // load the directive's module
  beforeEach(module('superbCalendarApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<superb-calendar></superb-calendar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the superbCalendar directive');
  }));
});
