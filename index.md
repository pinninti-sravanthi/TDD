What is testing?
> Software testing is an activity to check whether the actual results match the expected results and to ensure that the software system is Defect free. 

Why testing codes is so important?
- High quality product, will gain customer confidence
- Lower maintenance cost
- Reliable results


What is TDD buzzword about?
 
> Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: first the developer writes an (initially failing) automated test case that defines a desired improvement or new function, then produces the minimum amount of code to pass that test, and finally refactors the new code to acceptable standards.




Red-Green-Refactor to the rescue :) Three rules.

 * Create a unit tests that fails
 * Write production code that makes that test pass.
 * Clean up the mess you just made.

![RGR](http://2.bp.blogspot.com/-0VhKVflcwVk/Vegc2rea5cI/AAAAAAAAeeg/eTdKM2PPNY8/s1600/red_green_refactor.png)

 `Ex: sum of two numbers`  It's the easiest hello world kind of example for testing.

Testing Framework of choice:

 - Jest ( Facebook's own test suite )
 - Mocha ( Developers favorite test runner  )
 - Assertion, testing the outcomes with known inputs and expected outputs ` expect vs should `
 - Mock Libraries `( sinon - fake, spy, spies )`
 - code coverage `Istanbul - nyc `
 - Additional support for plugins for transpiling or using latest ES.Next features.
 
How to start fixing our Legacy codes to make it testable?
 - IIFE 
 ```javascript
  (function(){
    ... local scope
    ... closure and self contained
    
    function isMultiplierOf10(){
      if( no%10 == 0 ){
        return true;
       } else {
        return false;
       }
    }
   
    if( isMultiplierOf10(100) ){
       console.log('Yay!, it is divisible by 10');
    } else {
       console.log('Naaah...');
    }

  })()
  ```
  
 - Not-modular codes `import` or `require` in some other files.
 - Global declared and available in `window` root object.
 - Tighly coupled instead try using [PubSub Pattern](http://amplifyjs.com/api/pubsub/)
 
 
 Modules: 
 - By module we mean't a javascript file containing pure function which accepts input and return output
    ```javascript
    saved as multiplier.js
    
    function isMultiplierOf10(){
      if( no%10 == 0 ){
        return true;
       } else {
        return false;
       }
    }
    ```
 - Independent unit of codes which can be required in another module
     ```javascript
     ES6: 
     exports { isMultiplierOf10 };
       ( or )
     exports { isMultiplierOf10: isMultiplierOf10 };
      
     commonJs : module.exports { isMultiplierOf10 };
     ```
 - Import in our test suite and test them
    ```javascript
    import { isMultiplierOf10 } from 'multiplier.js'
    ( or )
    const { isMultiplierOf10 } = require('multiplier.js');
     
     isMultiplierOf10(100) is divisible by 10? Yes
     isMultiplierOf10(34) is divisible by 10? No
     
     
    ```
    
    Assertion Library: 
    - expect - TDD ( It's most common and looks more natural to me atleast :) )
    - should - BDD

    
    ```javascript
    expect(isMultiplierOf10(100)).to.be.equal(true);
    
    ( or )

    let input = 100;
    let expected = true;
    expect(isMultiplierOf10(input)).to.be.equal(expected);
    
    
    ```
    
    Other things to considered while choosing a framework.
    - Mock libraries ( `Reduce external resource calls ex: ajax calls to DB/server to get data`)
    - Plugin support ( `Babel, Typescript and Es.Next n ** 2 `)
    - Code Coverage
    
    ![code_coverage_1](http://images.sb.a-cti.com/testing/images/code_coverage_1.png)


Document Object Model (DOM):
```html
<div>
    <span id="username" />
    <button id="button" />
</div>

```

```javascript
dom.js

const $ = require('jquery');

function hideUsername(){
    $('#username').hide();
}

function showUsername(){
    $('#username').show();
}

function onClickChangeUserName( name ){
    $('#username').text(name);
}

$('#button').click(function() {
    console.log('NOTE: In test cases after injecting DOM only we have to require, or else event handlers will not register.');
    // For brevity, hard coded instead of remote call, similar example will be available in ajax examples
    onClickChangeUserName('Kevin Mitnick');
});

module.exports = {
    hideUsername,
    showUsername,
    onClickChangeUserName
}

```

JS-DOM for the rescue :

```javascript

const $ = require('jquery');

describe('DOM test cases examples ', function(){
    beforeAll(function(){
        document.body.innerHTML = 
            `<div>
                <span id="username" />
                <button id="button" />
            </div>`;
    });

    it('Dom(#username) hide', function(){
        const { hideUsername } = require('../src/dom.js');
        hideUsername();
        expect($('#username').css('display')).toBe('none');
    });

    it('Dom(#username) show', function(){
        const { showUsername } = require('../src/dom.js');
        showUsername();
        expect($('#username').css('display')).toBe('');
    });

 
    it('Event listener example, with modifications to DOM',function(){
        let expectedOutput = 'Kevin Mitnick';
        $('#button').click();
        expect($('#username').text()).toBe(expectedOutput);
    });
});
```

Asynchronous code:
- Testing remote api calls. `AJAX, Fetch`

```javascript
ajax.js

const $ = require('jquery');

// NOT TESTABLE
function printHelloWorld(){
    const url = 'https://httpbin.org/get?welcome=Hello World';
    $.get(url)
        .then( response => {
            let { args } = response;
            $('#welcomePage').text(args.welcome);
        });
}

( fix )

// TESTABLE
function printHelloWorld(){
    const url = 'https://httpbin.org/get?welcome=Hello World';
    return $.get(url)
        .then( response => {
            let { args } = response;
            $('#welcomePage').text(args.welcome);
        });
}

module.exports = { printHelloWorld }

or 

module.exports = { printHelloWorld: printHelloWorld }

```

```javascript
ajax.spec.js

it('Fetch and Append HelloWorld in DOM ', function( done ){
	printHelloWorld()
		.then(() => {
		  expect($('#welcomePage').text()).toBe('Hello World');
		  done();
		});
  });

it('Fetch and Append HelloWorld in DOM ', async function(){
	try {
	    await printHelloWorld();
	    let input = $('#welcomePage').text();
	    let expected = 'Hello World';
	    expect(input).toBe(expected);
	}
	catch(e){
	    throw e;
	}
});
```

Types of Testing :

- Unit Testing = Independent unit of codes, known input and expected output
- Integration Testing 
	- Interacting with DB
	- Interacting with a microservice ( two or more ) and how they behave or work together
- Functional Testing
	- They only verify the output of an action
	- Not only interacting but checks the output from DB, is it the expected result.
	- The difference is that an integration test may simply verify that you can query the database while a functional test would expect to get a specific value from the database
- End2End
	- User behavior with the software in a complete application environment.
	- can be hard to maintain when they're automated
	- It is recommended to have a few key end-to-end tests 
	- Rely more on lower level types of testing (unit and integration tests) to be able to quickly identify breaking changes.
```
ex: 
	- logging-in (easy)
	- email-notification (medium)
	- payments(hard)
```
- Goal:
	- when bad data or unexpected actions are performed
	- what would happen when a user makes a typo, tries to save an incomplete form or uses the wrong API
	- compromise data, get access to a resource they're not supposed to. 
	- A good testing suite should try to break your app and help understand its limit.


Code Coverage:
	 
- Statements : Each induvijual statements/line being called or executed.
- Branch
	- Code block and execution paths
	- When testing “if” statements, “true” and “false” outcomes must be covered
	- If only one of these paths has been tested, it is considered as “partial” coverage.
	- https://eslint.org/docs/developer-guide/code-path-analysis
	
    ![code_coverage_2](http://images.sb.a-cti.com/testing/images/code_coverage_2.png)
    ![code_coverage_3](http://images.sb.a-cti.com/testing/images/code_coverage_3.png)


### Further Reading :

- [Red-Green-Refactor](https://www.codecademy.com/articles/tdd-red-green-refactor)
- [TDD](https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html)
- [Types of Testing](https://www.atlassian.com/continuous-delivery/different-types-of-software-testing)
- [Code Coverage](https://www.atlassian.com/continuous-delivery/introduction-to-code-coverage)
- [Babel-yarn-webpack](https://medium.com/front-end-hacking/what-are-npm-yarn-babel-and-webpack-and-how-to-properly-use-them-d835a758f987)
