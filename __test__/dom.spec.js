require('./setup-lib-deps');
describe('DOM test cases examples ', function(){
    beforeAll(function(){
        // NOTE: After dom is initialized only, we have to setup event handlers or else it won't register
        // because there is no document available at that point of time.
        document.body.innerHTML = 
            `<div>
                <span id="username" />
                <button id="button" />
            </div>`;
    });

    it('Dom(#username) hide', function(){
        // Don't worry multiple require calls are faster because once cached
        // commonJs module system will give you cached module,
        // there is nothing wrong in requiring them again, which will not impact performance.
        const { hideUsername } = require('../src/dom.js');
        hideUsername();
        console.log(`Print the outerHTML : `, $('#username').get(0).outerHTML);
        expect($('#username').css('display')).toBe('none');
    });


    it('Dom(#username) show', function(){
        const { showUsername } = require('../src/dom.js');
        showUsername();
        console.log(`Print the outerHTML : `, $('#username').get(0).outerHTML);
        expect($('#username').css('display')).toBe('');
    });

    /**
     * Try to keep, one assertion condition per test, it will be difficult while debugging.
     * to find which expect was failing. for example, we have written like this.
     */
    it('Event listener example, whether callback is called with proper type',function(){
        const callback = jest.fn();
        $('#button').click(callback); // registering click handler
        $('#button').click();
        // console.log('First call ', callback.mock.calls[0]);
        // console.log('First argument ', callback.mock.calls[0][0]);
        expect(callback.mock.calls[0]).toBeDefined(); // first call to function
        expect(callback).toBeCalled(); // checking whether it has been called.
        expect(callback).toBeCalledWith( expect.objectContaining({
            type:'click'
          })); // Checking whether event type is of click.
    });

    /**
     * Try to keep, one assertion condition per test, it will be difficult while debugging.
     * to find which expect was failing. for example, we have written like this.
     */
    it('Event listener example, with modifications to DOM',function(){
        let expectedOutput = 'Kevin Mitnick';
        $('#button').click();
        expect($('#username').text()).toBe(expectedOutput);
    });
});