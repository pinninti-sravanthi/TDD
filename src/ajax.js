function getRequest(url){
    return $.get(url);
}

function printHelloWorld(){
    const url = 'https://httpbin.org/get?welcome=Hello World';
    return getRequest(url)
        .then( response => {
            // console.log('printHelloWorld = ', response );
            let { args } = response;
            $('#welcomePage').text(args.welcome);
        });
}


function mockedHelloWorld( callback ){
    const url = 'https://httpbin.org/get?welcome=Hello World';
    return getRequest(url)
        .then( callback );
}

module.exports = {
    getRequest,
    printHelloWorld,
    mockedHelloWorld
}