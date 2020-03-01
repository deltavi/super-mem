'use strict';

const prettyBytes = require('pretty-bytes');
const repeat = require('repeat-string');
const sizeof = require('sizeof');
const os = require('os');

/**
 * @private
 * Returns an object with values in bytes and human readable format.
 * Note that it uses base-10. 
 * 
 * @param {Object} memoryObject Object to convert
 * @param {boolean} [hrOnly] Human readable format only, default `false`
 * @example
 * {
 *   "mem1": 1000,
 *   "mem1HR": "1 KB"
 * }
 */
exports.convertObjInHumanReadableFormat = function (memoryObject, hrOnly) {
  var memOut;
  var hrEnding = 'HR';
  if (hrOnly) {
    memOut = {};
    hrEnding = '';
  } else {
    memOut = memoryObject;
  }
  const keys = Object.keys(memoryObject);
  keys.forEach(key => {
    memOut[key + hrEnding] = prettyBytes(memoryObject[key]);
  });
  return memOut;
};

/**
 * Returns an object describing the memory usage of the Node.js process measured in bytes and human readable format.
 * Note that it uses base-10. 
 * 
 * @param {boolean} [hrOnly] Human readable format only, default `false`
 * @example
 * {
 *   "rss": 42360832,
 *   "heapTotal": 35254272,
 *   "heapUsed": 16044848,
 *   "external": 108125,
 *   "rssHR": "42.4 MB",
 *   "heapTotalHR": "35.3 MB",
 *   "heapUsedHR": "16 MB",
 *   "externalHR": "108 kB"
 * }
 */
exports.memoryUsage = function (hrOnly) {
  const mem = process.memoryUsage();
  return exports.convertObjInHumanReadableFormat(mem, hrOnly);
};

/**
 * Returns an object describing the OS memory measured in bytes and human readable format.
 * Note that it uses base-10. 
 * @param {boolean} [hrOnly] Human readable format only, default `false`
 * @example
 * {
 *     "totalMem": 17073917952,
 *     "freeMem": 11155980288,
 *     "totalMemHR": "17.1 GB",
 *     "freeMemHR": "11.2 GB"
 * }
 */
exports.osMemory = function (hrOnly) {
  const mem = {
    totalMem: os.totalmem(),
    freeMem: os.freemem()
  };
  return exports.convertObjInHumanReadableFormat(mem, hrOnly);
};


/**
 * Returns the size of the 'inputObject', measured in bytes and human readable format.
 * Note that it uses base-10. 
 * @param {Object} inputObject Object to measure the size
 * @param {boolean} [hrOnly] Human readable format only, default `false`
 * @example
 * {
 *   "size": 20488,
 *   "sizeHR": "20.5 kB"
 * }
 */
exports.sizeOf = function (inputObject, hrOnly) {
  const res = {
    size: sizeof.sizeof(inputObject)
  };
  return exports.convertObjInHumanReadableFormat(res, hrOnly);
};

/**
 * Print the memory status on console
 * 
 * @param {string} [decorator] Optional string to create header and footer, default `"-"`
 * @example
 * -------------------- Memory Status --------------------
 *  • Process memory usage:
 *     rss = 45.7 MB
 *     heapTotal = 35.8 MB
 *     heapUsed = 18.7 MB
 *  • OS memory:
 *     totalmem = 17.1 GB
 *     freemem = 11.1 GB
 * -------------------------------------------------------
 */
exports.printMemoryStatus = function (decorator) {
  decorator = decorator || '-';
  const dec = repeat(decorator, 20);
  const header = dec + ' Memory Status ' + dec;
  const footer = repeat(decorator, header.length);
  console.log(header);
  exports.printObject('Process memory usage', exports.memoryUsage(true));
  exports.printObject('OS memory', exports.osMemory(true));
  console.log(footer);
};

/**
 * Monitors the heap memory and if the heap used exceeds the `limitPerc`, it notifies this to the handling functions
 * @param {number} limitPerc Limit exceeded which the handling function is called
 * @param {number} [interval] Optional, time interval between memory reading, default `10000 ms`
 * @example 
 * const superMem = require('super-mem');
 * const heapObserver = new superMem.HeapObserver(80, 5000);
 * heapObserver.addHandler(function (mem, percentage) {
 *   console.log('HeapObserver MEM: ' + JSON.stringify(mem, null, 2));
 *   console.log('HeapObserver PERC: ' + parseInt(percentage) + ' %');
 * });
 * heapObserver.start();
 */
exports.HeapObserver = function (limitPerc, interval) {
  interval = interval || 10000; // default 10s
  const handlers = [];
  var task = null;

  this.start = function () {
    task = setInterval(function () {
      const mem = process.memoryUsage();
      const actualPerc = (100 / mem.heapTotal) * mem.heapUsed;
      if (actualPerc >= limitPerc) {
        for (var i = 0; i < handlers.length; i++) {
          handlers[i](mem, actualPerc); // call handler
        }
      }
    }, interval);
  };

  this.stop = function () {
    if (task) {
      clearInterval(task);
      task = null;
    }
  };

  this.addHandler = function (handler) {
    handlers.push(handler);
  };
};


/**
 * @private
 * Print the object passed on console
 * @param  {string} label Label to print as header
 * @param  {object} object Object to print
 * @example
 * printObject('Object to print', {value: 'text 1'});
 * Console:
 * 
 *  • Object to print:
 *     value = text 1
 */
exports.printObject = function (label, object) {
  console.log(' • ' + label + ':');
  Object.keys(object).forEach(key => {
    console.log('    ' + key + ' = ' + object[key]);
  });
};
