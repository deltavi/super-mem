'use strict';
var assert = require('assert');
var chai = require("chai");
var expect = chai.expect;
var superMem = require('../index');

suite('super-mem', function () {
  suite('#memoryUsage()', function () {
    test('should return node memory usage', function () {
      const mem = superMem.memoryUsage();
      const exMem = expect(mem);
      console.info(JSON.stringify(mem, null, 4));
      assert.equal(Object.keys(mem).length, 8);
      exMem.to.have.property('rss').to.be.a('number');
      exMem.to.have.property('heapTotal').to.be.a('number');
      exMem.to.have.property('heapUsed').to.be.a('number');
      exMem.to.have.property('external').to.be.a('number');

      //Human Readable
      exMem.to.have.property('rssHR').to.be.a('string');
      exMem.to.have.property('heapTotalHR').to.be.a('string');
      exMem.to.have.property('heapUsedHR').to.be.a('string');
      exMem.to.have.property('externalHR').to.be.a('string');
    });
  });

  suite('#printMemoryStatus()', function () {
    test('should print memory status', function () {
      superMem.printMemoryStatus();
    });
  });

  suite('#printObject()', function () {
    test('should print a test object', function () {
      superMem.printObject("Test 1", { t: 1 });
      superMem.printObject("Test 2", "test");
    });
  });
});