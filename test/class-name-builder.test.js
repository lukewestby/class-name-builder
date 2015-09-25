import test from 'tape';
import ClassNameBuilder from '../src/class-name-builder.js';

test('create()', (t) => {
  t.plan(1);

  const className = ClassNameBuilder
    .create()
    .toString();

  t.equal(className, '', 'it should return an empty string from a fresh instance');
});

test('always()', (t) => {

  t.test('basic usage', (t) => {
    t.plan(1);

    const className = ClassNameBuilder
      .create()
      .always('blue')
      .toString();

    t.equal(className, 'blue', 'it should return the given class names when called with always');
  });

  t.test('array input', (t) => {
    t.plan(1);

    const className = ClassNameBuilder
        .create()
        .always(['blue', 'green'])
        .toString();

    t.equal(className, 'blue green', 'it should accept an array of class names');
  });

  t.test('string splitting', (t) => {
    t.plan(1);

    const className = ClassNameBuilder
        .create()
        .always('blue      green')
        .toString();

    t.equal(className, 'blue green', 'it should split strings on spaces');
  });

  t.test('deduping', (t) => {
    t.plan(1);

    const className = ClassNameBuilder
        .create()
        .always('blue green blue')
        .toString();

    t.equal(className, 'blue green', 'it should remove duplicates');
  });
});

test('if()', (t) => {
  t.plan(1);

  const className = ClassNameBuilder
      .create()
      .if(true, 'true')
      .if(false, 'false')
      .toString();

  t.equal(className, 'true', 'it should return a class name under an if statement only if the condition is true');
});

test('else()', (t) => {

  t.test('false if() value', (t) => {
    t.plan(1);

    const className = ClassNameBuilder
      .create()
      .if(false, 'false').else('true')
      .toString();

    t.equal(className, 'true', 'it should return a class name under the else branch of an if statement if the condition is false');
  });

  t.test('true if() value', (t) => {
    t.plan(1);

    const className = ClassNameBuilder
        .create()
        .if(true, 'true').else('false')
        .toString();

    t.equal(className, 'true', 'it should not return a class name under an else branch if the condition is true');
  });

  t.test('incorrect usage', (t) => {
    t.plan(1);

    const badUsage = () => {
      ClassNameBuilder
          .create()
          .else('not gonna work');
    };

    t.throws(badUsage, 'it should throw an error if else is called before if');
  });
});

test('merge()', (t) => {

  t.test('basic usage', (t) => {
    t.plan(1);

    const firstBuilder = ClassNameBuilder.create().always('first');
    const secondBuilder = ClassNameBuilder.create().always('second');
    const mergedBuilder = firstBuilder.merge(secondBuilder);
    const className = mergedBuilder.toString();

    t.equal(className, 'first second', 'it should include class names from one builder into another');
  });

  t.test('incorrect usage', (t) => {
    t.plan(1);

    const builder = ClassNameBuilder.create();
    const badUsage = () => builder.merge(1);

    t.throws(badUsage, 'it should throw if something other than a ClassNameBuilder is passed')
  })
});
