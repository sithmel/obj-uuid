obj-uuid
========

### This module is deprecated
The main reason is because the name is very misleading

Important caveat: it does generate ids in the uuid format, but it is not universal. It is unique only for the current process

This module translate any object/js value to an unique identifier (string).
For objects it generate a random id and stores it in a WeakMap. So it is consistent within the same process and it can be easily garbage collected.

How to use it
-------------
```js
const objUUID = require('obj-uuid');
const a = {};
const b = {};
objUUID.getIdFromValue(a) === objUUID.getIdFromValue(a);
objUUID.getIdFromValue(a) !== objUUID.getIdFromValue(b);
```
You can get an id for an array of values:
```js
objUUID.getIdFromValues([a, b]) === objUUID.getIdFromValues([a, b]);
objUUID.getIdFromValues([a, b]) !== objUUID.getIdFromValues([b, a]);
```
Or for an object:
```js
objUUID.getIdFromAttributes({ a: a, b: b }) === objUUID.getIdFromAttributes({ b: b, a: a });
objUUID.getIdFromAttributes({ a: a, b: b }) !== objUUID.getIdFromAttributes({ a: a });
```
