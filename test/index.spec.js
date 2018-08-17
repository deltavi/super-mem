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
      // assert.equal(Object.keys(mem).length, 8);
      exMem.to.have.property('rss').to.be.a('number');
      exMem.to.have.property('heapTotal').to.be.a('number');
      exMem.to.have.property('heapUsed').to.be.a('number');
      //exMem.to.have.property('external').to.be.a('number');

      //Human Readable
      exMem.to.have.property('rssHR').to.be.a('string');
      exMem.to.have.property('heapTotalHR').to.be.a('string');
      exMem.to.have.property('heapUsedHR').to.be.a('string');
      //exMem.to.have.property('externalHR').to.be.a('string');
    });
  });

  suite('#osMemory()', function () {
    test('should return OS memory', function () {
      const mem = superMem.osMemory();
      const exMem = expect(mem);
      console.info(JSON.stringify(mem, null, 4));
      assert.equal(Object.keys(mem).length, 4);
      exMem.to.have.property('totalmem').to.be.a('number');
      exMem.to.have.property('freemem').to.be.a('number');

      //Human Readable
      exMem.to.have.property('totalmemHR').to.be.a('string');
      exMem.to.have.property('freememHR').to.be.a('string');
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
      superMem.printObject("Object to print", { value: "text 1" });
    });
  });
});