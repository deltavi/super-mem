'use strict';
var assert = require('assert');
var chai = require("chai");
var expect = chai.expect;
var superMem = require('../index');

suite('super-mem', function () {
  suite('#memoryUsage()', function () {
    test('should return the node memory usage', function () {
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
    test('should return the OS memory', function () {
      const mem = superMem.osMemory();
      const exMem = expect(mem);
      console.info(JSON.stringify(mem, null, 4));
      assert.equal(Object.keys(mem).length, 4);
      exMem.to.have.property('totalMem').to.be.a('number');
      exMem.to.have.property('freeMem').to.be.a('number');

      //Human Readable
      exMem.to.have.property('totalMemHR').to.be.a('string');
      exMem.to.have.property('freeMemHR').to.be.a('string');
    });
  });

  suite('#printMemoryStatus()', function () {
    test('should print the memory status', function () {
      superMem.printMemoryStatus();
    });
  });

  suite('#convertObjInHumanReadableFormat()', function () {
    test('should return the converted object', function () {
      const mem = superMem.convertObjInHumanReadableFormat({ mem1: 1000 });
      const exMem = expect(mem);
      console.info(JSON.stringify(mem, null, 4));
      assert.equal(Object.keys(mem).length, 2);
      exMem.to.have.property('mem1').to.be.a('number');
      exMem.to.have.property('mem1HR').to.be.a('string');
      assert.equal(mem.mem1, 1000);
      assert.equal(mem.mem1HR, '1 kB');
    });
    test('should return the converted object, only in human readable format', function () {
      const mem = superMem.convertObjInHumanReadableFormat({ mem1: 1000 }, true);
      const exMem = expect(mem);
      console.info(JSON.stringify(mem, null, 2));
      assert.equal(Object.keys(mem).length, 1);
      exMem.to.have.property('mem1').to.be.a('string');
      assert.equal(mem.mem1, '1 kB');
    });
  });

  suite('#printObject()', function () {
    test('should print the test object', function () {
      superMem.printObject("Test 1", { t: 1 });
      superMem.printObject("Object to print", { value: "text 1" });
    });
  });

  suite('#sizeOf()', function () {
    test('should return the size of the object', function () {
      const obj = { test: '0123456789' };
      for (var i = 0; i < 10; i++) {
        obj.test += obj.test;
      }
      const res = superMem.sizeOf(obj);
      console.log(JSON.stringify(res, null, 2));
      assert.equal(res.size, 20488);
      assert.equal(res.sizeHR, '20.5 kB');
    });
  });
});