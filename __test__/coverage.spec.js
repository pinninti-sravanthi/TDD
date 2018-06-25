const { isMultiplierOf10 }  = require('../src/coverage');

test('100 divisible by 10, to equal true', () => {
    expect(isMultiplierOf10(100)).toBe(true);
});

// Branching testing
xtest('34 divisible by 10, to equal false', () => {
    expect(isMultiplierOf10(34)).toBe(false);
});