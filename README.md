# Introduction
A ES6 library for working with periods.

# Install
```
npm -i
```

# Example
```
var a = new Period(new Date('2022-04-16T00:00:00.000Z'), new Date('2022-04-16T01:00:00.000Z'));
var b = new Period(new Date('2022-04-16T01:00:00.000Z'), new Date('2022-04-16T02:00:00.000Z'));
a.join(b) // returns 2022-04-16T00:00:00.000Z - 2022-04-16T02:00:00.000
a.overlaps(b) // returns false
a.isConsequtive(b) // returns false
Period.merge([a,b]) // returns 2022-04-16T00:00:00.000Z - 2022-04-16T02:00:00.000
Period.sort([b,a]) // returns [a,b]
```
