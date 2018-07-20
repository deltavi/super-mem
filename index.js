'use strict';

const prettyBytes = require('pretty-bytes');
const repeat = require('repeat-string');

/**
 * Returns an object describing the memory usage of the Node.js process measured in bytes and human readable format
 * 
 * @param {boolean} [hrOnly] Human readable format only, default `false`
 * @returns {object} Memory usage object, e.g.:
 ```json
{
  "rss": 42360832,
  "heapTotal": 35254272,
  "heapUsed": 16044848,
  "external": 108125,
  "rssHR": "42.4 MB",
  "heapTotalHR": "35.3 MB",
  "heapUsedHR": "16 MB",
  "externalHR": "108 kB"
}
```
 */
exports.memoryUsage = function (hrOnly) {
  const mem = process.memoryUsage();
  var memOut;
  var hrEnding = 'HR';
  if (hrOnly) {
    memOut = {};
    hrEnding = '';
  } else {
    memOut = mem;
  }
  const keys = Object.keys(mem);
  keys.forEach(key => {
    memOut[key + hrEnding] = prettyBytes(mem[key]);
  });
  return memOut;
};


/**
 * Print the memory status on console
 * 
 * @param {string} [decorator] Optional string to create header and footer, default `"-"`
 */
exports.printMemoryStatus = function (decorator) {
  decorator = decorator || '-';
  const dec = repeat(decorator, 20);
  const header = dec + ' Memory Status ' + dec;
  const footer = repeat(decorator, header.length);
  console.log(header);
  exports.printObject('Process memory usage', exports.memoryUsage(true));
  console.log(footer);
};

/**
 * Print the object passed on console
 * @param  {string} label Label to print as header
 * @param  {object} object Object to print
 */
exports.printObject = function (label, object) {
  console.log(' • ' + label + ':');
  Object.keys(object).forEach(key => {
    console.log('    ' + key + ' = ' + object[key]);
  }); 
};
