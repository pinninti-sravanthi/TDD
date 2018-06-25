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