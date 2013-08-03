## d3 bucket ui

A drag & drop bucket to bucket UI. Uses d3 in a minor way since HTML5 Drag
and Drop doesn't work well on iOS.

## example

```js
var broker = bucket();
d3.selectAll('.bucket-deposit .bucket').call(broker.deposit());
d3.selectAll('.bucket-store .bucket-source').call(broker.store());
```
