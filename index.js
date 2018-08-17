'use strict';

const prettyBytes = require('pretty-bytes');
const repeat = require('repeat-string');
const os = require('os');

/**
 * @private
 * Returns an object with values in bytes and human readable format
 * 
 * @param {boolean} [hrOnly] Human readable format only, default `false`
 * @example
 * {
 *   "mem1": 17073917952,
 *   "mem1HR": "17.1 GB"
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
 * Returns an object describing the memory usage of the Node.js process measured in bytes and human readable format
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
 * Returns an object describing the OS memory measured in bytes and human readable format
 * 
 * @param {boolean} [hrOnly] Human readable format only, default `false`
 * @example
 * {
 *     "totalmem": 17073917952,
 *     "freemem": 11155980288,
 *     "totalmemHR": "17.1 GB",
 *     "freememHR": "11.2 GB"
 * }
 */
exports.osMemory = function (hrOnly) {
  const mem = {
    totalmem: os.totalmem(),
    freemem: os.freemem()
  };
  return exports.convertObjInHumanReadableFormat(mem, hrOnly);
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
