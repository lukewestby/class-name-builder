import ClassNameBuilder from '../src/class-name-builder.js';

describe('ClassNameBuilder', () => {

    describe('create()', () => {

        it('should return an empty string from a fresh instance', () => {
            ClassNameBuilder
                .create()
                .toString()
                .should.equal('');
        });
    });

    describe('always()', () => {

        it('should return the given class names when called with always', () => {
            ClassNameBuilder
                .create()
                .always('blue')
                .toString()
                .should.equal('blue');
        });

        it('should accept an array of class names', () => {
            ClassNameBuilder
                .create()
                .always(['blue', 'green'])
                .toString()
                .should.equal('blue green');
        });

        it('should split strings on spaces', () => {
            ClassNameBuilder
                .create()
                .always('blue      green')
                .toString()
                .should.equal('blue green')
        });

        it('should remove duplicates', () => {
            ClassNameBuilder
                .create()
                .always('blue green blue')
                .toString()
                .should.equal('blue green');
        });
    });

    describe('if()', () => {

        it('should return a class name under an if statement only if the condition is true', () => {

            ClassNameBuilder
                .create()
                .if(true, 'true')
                .if(false, 'false')
                .toString()
                .should.equal('true');
        });
    });

    describe('else()', () => {

        it('should return a class name under the else branch of an if statement if the condition is false', () => {
            ClassNameBuilder
                .create()
                .if(false, 'false').else('true')
                .toString()
                .should.equal('true');
        });

        it('should not return a class name under an else branch if the condition is true', () => {
            ClassNameBuilder
                .create()
                .if(true, 'true').else('false')
                .toString()
                .should.equal('true');
        });

        it('should throw an error if else is called before if', () => {
            (() => {
                ClassNameBuilder
                    .create()
                    .else('not gonna work');
            }).should.throw;
        });
    });

    describe('merge()', () => {

        it('should include class names from one builder into another', () => {

            const firstBuilder = ClassNameBuilder.create().always('first');
            const secondBuilder = ClassNameBuilder.create().always('second');
            const mergedBuilder = firstBuilder.merge(secondBuilder);

            mergedBuilder
                .toString()
                .should.equal('first second');
        });

        it('should throw if something other than a ClassNameBuilder is passed', () => {

            const builder = ClassNameBuilder.create();

            (() => {
                builder.merge(1);
            }).should.throw;
        });
    });
});
