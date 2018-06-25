const { createAsyncCallback, promises, rejection } = require('../src/async');
describe('Asynchronous testing', function(){
    it('Put things in event loop', function( done ){

        function callback() {
            console.log('Callback exection');
            expect(mockedCallback).toHaveBeenCalledTimes(1);
            done(); // finishes the test cases, which runs asynchornously.
        }

        // Wrapping jest to understand whether it is called and how many times.
        const mockedCallback =  jest.fn().mockImplementation(callback);
        createAsyncCallback(mockedCallback);
    });

    it('promises function, with done ', function( done ){
        promises()
            .then( function( ouput ){
                expect(ouput).toBe('resolved');
                done();
            });
    });

    it('promises function, with arrow functions ', function( done ){
        promises()
            .then( ouput => {
                expect(ouput).toBe('resolved');
                done();
            });
    });

    it('promises function, with async and await ', async function(){
        const ouput = await promises();
        expect(ouput).toBe('resolved');
    });

    it('handling rejections, with done', function( done ) {
        rejection()
            .catch( e => {
                expect(e).toBe('reject');
                done();
            });
    });

    it('handling rejections, with async and await', async function() {
        try {
            const ouput = await rejection();
        }
        catch(e){
            expect(e).toBe('reject');
        }
    });
});

