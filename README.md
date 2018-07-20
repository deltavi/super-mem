# ![super-mem](docs/super-mem.png) Super Mem

Utility to manage Node.js memory

## Install

    npm install super-mem

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [memoryUsage](#memoryusage)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [printMemoryStatus](#printmemorystatus)
    -   [Parameters](#parameters-1)
-   [printObject](#printobject)
    -   [Parameters](#parameters-2)

### memoryUsage

Returns an object describing the memory usage of the Node.js process measured in bytes and human readable format

#### Parameters

-   `hrOnly` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Human readable format only, default `false`

#### Examples

```javascript
Result:
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

Returns **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Memory usage object

### printMemoryStatus

Print the memory status on console

#### Parameters

-   `decorator` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Optional string to create header and footer, default `"-"`

### printObject

Print the object passed on console

#### Parameters

-   `label` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Label to print as header
-   `object` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object to print
