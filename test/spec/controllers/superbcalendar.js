'use strict';

describe('Controller: SuperbcalendarCtrl', function () {

  // load the controller's module
  beforeEach(module('superbCalendarApp'));

  var SuperbcalendarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperbcalendarCtrl = $controller('SuperbcalendarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
