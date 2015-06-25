(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.classNameBuilder = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _classNameBuilderProto;

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var classNameBuilderProto = (_classNameBuilderProto = {

    /**
     * Creates a builder which always includes the given class name or names
     * @param {string | Array<string>} value - the class name(s) to include
     * @returns {ClassNameBuilder} the new builder
     */
    always: function always(value) {
        var classNames = cleanClassNames(value);
        return createWithInternals({
            initialData: combine(this._data, classNames)
        });
    }

}, _defineProperty(_classNameBuilderProto, 'if', function _if(condition, value) {

    var classNames = condition ? combine(this._data, cleanClassNames(value)) : clone(this._data);

    return createWithInternals({
        initialData: classNames,
        acceptElse: true,
        condition: condition
    });
}), _defineProperty(_classNameBuilderProto, 'else', function _else(value) {

    if (!this._acceptElse) {
        throw new Error('cannot call else() without first calling if()');
    }

    var classNames = !this._condition ? combine(this._data, cleanClassNames(value)) : clone(this._data);

    return createWithInternals({
        initialData: classNames
    });
}), _defineProperty(_classNameBuilderProto, 'merge', function merge(other) {

    if (!classNameBuilderProto.isPrototypeOf(other)) {
        throw new Error('argument must be a ClassNameBuilder instance');
    }

    return createWithInternals({
        initialData: combine(this._data, other._data)
    });
}), _defineProperty(_classNameBuilderProto, 'toString', function toString() {
    return this._data.length ? this._data.join(' ') : '';
}), _classNameBuilderProto);

/**
 * Creates a new builder with an initial data array and optional flag for
 * allowing calls to `else()`
 * @param {{ acceptElse: boolean, initialData: Array<string> }}
 * @returns {ClassNameBuilder} the new builder
 */
function createWithInternals(_ref) {
    var _ref$acceptElse = _ref.acceptElse;
    var acceptElse = _ref$acceptElse === undefined ? false : _ref$acceptElse;
    var condition = _ref.condition;
    var initialData = _ref.initialData;

    var classNameBuilder = Object.create(classNameBuilderProto);
    classNameBuilder._acceptElse = acceptElse;
    classNameBuilder._data = initialData;
    classNameBuilder._condition = condition;
    return classNameBuilder;
}

/**
 * Creates an empty builder
 * @returns {ClassNameBuilder} the new builder
 */
function create() {
    return createWithInternals({
        initialData: []
    });
}

/**
 * Performs a concatenation and uniqueness reduction on two arrays
 * @param {Array} first - the first array to merge
 * @param {Array} second - the second array to merge
 * @returns {Array} the combined arrays
 */
function combine(first, second) {
    return unique(first.concat(second));
}

/**
 * Performaces a uniqueness reduction on an array
 * @param {Array} value - the array to reduce
 * @returns {Array} an array with unique values
 */
function unique(value) {
    return value.reduce(function (memo, current) {
        return memo.indexOf(current) !== -1 ? memo : memo.concat(current);
    }, []);
}

/**
 * Clones an array
 * @param {Array} value - the array to clone
 * @returns {Array} a clone of the original array
 */
function clone(value) {
    return value.slice(0);
}

/**
 * Converts class name input into an array of strings with space trimmed off
 * @param {string | Array<string>} value - the value to convert
 * @returns {Array<string>} the split and trimmed values
 */
function cleanClassNames(value) {
    var classNamesArray = isString(value) ? splitString(value) : value;
    var trimmedNamesArray = trimClassNames(classNamesArray);
    var uniqueNamesArray = unique(trimmedNamesArray);
    return uniqueNamesArray;
}

/**
 * Determines if a value is a string
 * @param {any} value - the value to inspect
 * @returns {boolean} whether `value` is a string
 */
function isString(value) {
    return typeof value === 'string';
}

/**
 * Splits a string on one or more spaces
 * @param {string} value - the string to split
 * @returns {Array<string>} the result of the split
 */
function splitString(value) {
    return value.split(/\s+/g);
}

/**
 * Trims the values of an array of strings
 * @param {Array<string>} value - the array of values to clean
 * @returns {Array<string>} the array of trimmed values
 */
function trimClassNames(value) {
    return value.map(function (item) {
        return item.trim();
    });
}

exports['default'] = { create: create };
module.exports = exports['default'];
/**
 * Creates a new builder which will include the given class name(s) if the
 * condition is truthy, or one which will pass through and allow a call to
 * `else()` otherwise
 * @param {any} condition - the object to evaluate as a boolean
 * @param {string | Array<string>} value - the class name(s) to include
 * @returns {ClassNameBuilder} the new builder
 */

/**
 * Creates a new builder which will include the given value if a call to
 * `if()` has not evaluated its condition to be truthy
 * @param {string | Array<string>} value - the class name(s) to include
 * @throws if called without calling `if()` immediately before
 * @returns {ClassNameBuilder} the new builder
 */

/**
 * Creates a new builder with class names from another builder merged in to
 * caller's class names.
 * @param {ClassNameBuilder} other - the builder to merge with
 * @throws if `other` is not an instance of `ClassNameBuilder`
 * @returns {ClassNameBuilder} the new builder with combined class names
 */

/**
 * Converts the builder to a string
 * @returns {string} space-delimitted values, or the empty string if empty
 */

},{}]},{},[1])(1)
});