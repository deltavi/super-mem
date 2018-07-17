var assert = require('assert');
var superMem = require('../index');

suite('super-mem', function() {
  suite('#memoryUsage()', function() {
    test('should return node memory usage', function() {
      assert.equal(Object.keys(superMem.memoryUsage()).length, 4);
    });
  });
});