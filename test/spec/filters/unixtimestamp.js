'use strict';

describe('Filter: unixtimestamp', function () {

  // load the filter's module
  beforeEach(module('superbCalendarApp'));

  // initialize a new instance of the filter before each test
  var unixtimestamp;
  beforeEach(inject(function ($filter) {
    unixtimestamp = $filter('unixtimestamp');
  }));

  it('should return the input prefixed with "unixtimestamp filter:"', function () {
    var text = 'angularjs';
    expect(unixtimestamp(text)).toBe('unixtimestamp filter: ' + text);
  });

});
