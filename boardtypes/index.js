var fs = require('fs');
var R =require('ramda');

function loadBoardTypes() {
    return fs.readdirSync('./boardtypes')
        .filter(e => e.slice(-9) == "-board.js")
        .map(e => './' + e)
        .map(require)
        .reduce((acc, cur) => R.assoc(cur.type, cur, acc), {});
}

module.exports = loadBoardTypes();