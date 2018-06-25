function createAsyncCallback( cb ){
    setTimeout(cb,0);
}

async function promises(){
    return new Promise( (resolve, reject) => {
        setTimeout(function(){
            resolve('resolved');
        },0);
    });
}


async function rejection(){
    return new Promise( (resolve, reject) => {
        setTimeout(function(){
            reject('reject');
        },0);
    });
}

module.exports = {
    createAsyncCallback,
    promises,
    rejection
}