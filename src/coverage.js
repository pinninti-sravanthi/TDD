/**
 * JEST is failing pretty badly with ES6 style import
 * 
 * Show examples about statements
 * Show examples about defined but not used functions
 * Show examples about branch control decision
 * @param {*} no = integer
 */
function isMultiplierOf10( no ){
	if( no%10 == 0 ){
		return true;
	} else {
		return false;
	}

	// 1. Statements
	// let uncoveredStatement = 'Uncovered Statement';
}

// 2. Unused functions
// function UnUsedFunction(){
// 	console.log('Simulating unused functions');
// }

module.exports = {
	isMultiplierOf10
}