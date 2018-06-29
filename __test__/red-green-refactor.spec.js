const { sum } = require('../src/red-green-refactor');
describe('red-green-refactor demo', function(){

    it('sum (1,4) to be equal 5', function(){
        expect(sum(1,4)).toBe(5);
    });
});