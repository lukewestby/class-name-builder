# ClassNameBuilder [![Build Status](https://travis-ci.org/lukewestby/class-name-builder.svg?branch=master)](https://travis-ci.org/lukewestby/class-name-builder)

A small, chainable, immutable utility for building up class name strings in
application logic. Great for use with React's `className` property or Angular's
`ng-class` directive. Improves code readability by avoiding large, complex sets
of nested conditional statements when generating class names in templates or
application code.

## Installation

```
npm install class-name-builder
```

```
jspm install npm:class-name-builder
```

If you would like support for another ecosystem, please open an issue or submit
a PR.

## Example

```javascript
import ClassNameBuilder from 'class-name-builder';

let condition = true;
let otherCondition = false;

const classNames = ClassNameBuilder
  .create()
  .always('example awesome-example')
  .if(condition, 'condition')
  .if(otherCondition, 'other-condition')
  .else(['not-other-condition', 'array'])
  .toString();

console.log(classNames);
// "example awesome-example condition not-other-condition array"
```

## API

### Static methods

* `create(): ClassNameBuilder` : creates a new, empty instance of
`ClassNameBuilder`. `ClassNameBuilder` has no constructor, so this is the only
way to create an instance.

### Instance methods

* `always(value: string | Array<string>): ClassNameBuilder`: creates a new
instance of `ClassNameBuilder` with the given values. If the value is a string,
multiple class names can be included by separating them with one or more spaces,
similar to the `class` HTML attribute. Duplicate class names will be removed in
the case of both a space-separated string and an array.
* `if(condition: any, value: string | Array<string>): ClassNameBuilder`:
creates a new instance of `ClassNameBuilder` with the passed in `value` only
included if the condition is truthy.
* `else(value: string | Array<string>): ClassNameBuilder`: creates a new
instance of `ClassNameBuilder` with the passed in `value` only if the condition
for the preceding `if()` call was falsey. Will throw an error if called without
an immediately preceding call to `if()`.
* `merge(other: ClassNameBuilder): ClassNameBuilder`: creates a new instance of
`ClassNameBuilder` with class names from the passed in instance mixed in with
those in the calling instance.
* `toString(): string`: returns the class names represented by the instance as a
space-separated string.

## Development

```
npm install -g gulp && npm install
```

To bundle with `browserify` and `babelify`:
```
gulp build
```

To run the unit tests with `karma`:
```
gulp test
```
