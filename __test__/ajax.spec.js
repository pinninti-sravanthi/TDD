const $ = require('jquery');
const { getRequest, printHelloWorld } = require('../src/ajax');

describe('Ajax calls and mock test ', function(){
    beforeAll(function(){
        // NOTE: After dom is initialized only, we have to setup event handlers or else it won't register
        // because there is no document available at that point of time.
        document.body.innerHTML = 
            `<div>
                <span id="welcomePage" />
            </div>`;
    });

    it('GET request', function(done){
        const url = 'https://httpbin.org/get?welcome=Hello World';
        getRequest(url)
            .then( response => {
                // console.log(`output of reponse call `, response );
                let { args } = response;
                expect(args.welcome).toBe('Hello World');
                done();
            });
    });

    it.only('fetch manipulate DOM ', function(done){
        printHelloWorld()
            .then(() => {
                expect($('#welcomePage').text()).toBe('Hello World');
                done();
            });
    });

    it('Passing "callback()" to ajax request and printing "Hello World" in DOM ', function(done){
        const { mockedHelloWorld} = require('../src/ajax');
        let myCallback = response => {
            let { args } = response;
            $('#welcomePage').text(args.welcome);
        }

        mockedHelloWorld(myCallback)
            .then(() => {
                expect($('#welcomePage').text()).toBe('Hello World');
                done();
            });
    });

    it('AJAX mannual mock, mockedHelloWorld()', function(done) {
        // This is mannual mock
        // mannualMock: https://facebook.github.io/jest/docs/en/mock-function-api#mockfnmockimplementationfn
        mockedHelloWorld = jest.fn().mockImplementation( () => {
            return new Promise((resolve) => {
                resolve({
                    args:{
                        welcome: 'Hello World'
                    }
                });
            });
        });

        mockedHelloWorld()
        .then(() => {
            expect($('#welcomePage').text()).toBe('Hello World');
            done();
        });
    });


    it('AJAX auto mock, mockedHelloWorld()', function(done) {
        /**
         * 
         *  Below code, initiates the auto mock,
         *  in => "AJAX auto mock, mockedHelloWorld()" test case
         *  'mockedHelloWorld.mockImplmentation' wrapper made available automatically by jest
         *  which we can use it for testing purpose.
         *  
         *  mannualMock: https://facebook.github.io/jest/docs/en/mock-function-api#mockfnmockimplementationfn
         *  autoMock : https://facebook.github.io/jest/docs/en/tutorial-jquery
         * 
         */ 
        jest.mock('../src/ajax'); 
        const { mockedHelloWorld} = require('../src/ajax');

        let input = {
            args:{
                welcome: 'Hello World'
            }
        };

        let callback = response => {
                // console.log('printHelloWorld = ', response );
                let { args } = response;
                $('#welcomePage').text(args.welcome);
            }
        
        // Mock implementation.
        mockedHelloWorld.mockImplementation(() => {
            return new Promise((resolve) => {
                resolve(input);
            });
        });

        mockedHelloWorld()
        .then( callback ) // calls callback, appends dom.
        .then(() => {
            expect($('#welcomePage').text()).toBe('Hello World');
            done();
        });
    });
});