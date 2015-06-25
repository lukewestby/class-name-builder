const classNameBuilderProto = {

    /**
     * Creates a builder which always includes the given class name or names
     * @param {string | Array<string>} value - the class name(s) to include
     * @returns {ClassNameBuilder} the new builder
     */
    always(value) {
        const classNames = cleanClassNames(value);
        return createWithInternals({
            initialData: combine(this._data, classNames)
        });
    },

    /**
     * Creates a new builder which will include the given class name(s) if the
     * condition is truthy, or one which will pass through and allow a call to
     * `else()` otherwise
     * @param {any} condition - the object to evaluate as a boolean
     * @param {string | Array<string>} value - the class name(s) to include
     * @returns {ClassNameBuilder} the new builder
     */
    ['if'](condition, value) {

        const classNames = condition ?
            combine(this._data, cleanClassNames(value)) :
            clone(this._data);

        return createWithInternals({
            initialData: classNames,
            acceptElse: true,
            condition
        });
    },

    /**
     * Creates a new builder which will include the given value if a call to
     * `if()` has not evaluated its condition to be truthy
     * @param {string | Array<string>} value - the class name(s) to include
     * @throws if called without calling `if()` immediately before
     * @returns {ClassNameBuilder} the new builder
     */
    ['else'](value) {

        if(!this._acceptElse) {
            throw new Error('cannot call else() without first calling if()');
        }

        const classNames = (!this._condition) ?
            combine(this._data, cleanClassNames(value)) :
            clone(this._data);

        return createWithInternals({
            initialData: classNames
        });
    },

    /**
     * Creates a new builder with class names from another builder merged in to
     * caller's class names.
     * @param {ClassNameBuilder} other - the builder to merge with
     * @throws if `other` is not an instance of `ClassNameBuilder`
     * @returns {ClassNameBuilder} the new builder with combined class names
     */
    merge(other) {

        if(!classNameBuilderProto.isPrototypeOf(other)) {
            throw new Error('argument must be a ClassNameBuilder instance');
        }

        return createWithInternals({
            initialData: combine(this._data, other._data)
        });
    },

    /**
     * Converts the builder to a string
     * @returns {string} space-delimitted values, or the empty string if empty
     */
    toString() {
        return this._data.length ? this._data.join(' ') : '';
    }
};

/**
 * Creates a new builder with an initial data array and optional flag for
 * allowing calls to `else()`
 * @param {{ acceptElse: boolean, initialData: Array<string> }}
 * @returns {ClassNameBuilder} the new builder
 */
function createWithInternals({ acceptElse = false, condition, initialData }) {
    const classNameBuilder = Object.create(classNameBuilderProto);
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
    return value.reduce((memo, current) => {
        return memo.indexOf(current) !== -1 ? memo : memo.concat(current);
    }, []);
}

/**
 * Clones an array
 * @param {Array} value - the array to clone
 * @returns {Array} a clone of the original array
 */
function clone(value) {
    return value.slice(0)
}

/**
 * Converts class name input into an array of strings with space trimmed off
 * @param {string | Array<string>} value - the value to convert
 * @returns {Array<string>} the split and trimmed values
 */
function cleanClassNames(value) {
    const classNamesArray = isString(value) ? splitString(value) : value;
    const trimmedNamesArray = trimClassNames(classNamesArray);
    const uniqueNamesArray = unique(trimmedNamesArray);
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
    return value.map((item) => item.trim());
}

export default { create };
