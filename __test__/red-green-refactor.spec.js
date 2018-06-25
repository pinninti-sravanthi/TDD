const { sum } = require('../src/red-green-refactor');

describe('red-green-refactor demo', function(){
    it('Sum of (1,4) to equal 5', function(){
        expect(sum(1, 4)).toBe(5);
    });
});