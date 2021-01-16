const fs = require('fs');

//my stream-transformers
const Splitter = require('./lib/Splitter');
const Delay = require('./lib/Delay');

const DEFAULT_OPT = {fps: 60, clearBefore: true};

/**
 *
 * @param {String} filePath -
 * @param {Object} [options] -
 * @returns {ReadStream}
 */
function stream(filePath = '', options) {
    options = {...DEFAULT_OPT, ...options};
    let inputStream;

    if (!process.stdin.isTTY) { //process was piped
        inputStream = process.stdin;
    }
    else if (filePath && typeof filePath === 'string') {
        inputStream = fs.createReadStream(filePath);
    }
    else {
        throw new Error('No input was given!');
    }

    if (options.clearBefore) {
        process.stdout.write('\x1B[2J'); //clearing console before starting
    }

    return inputStream
        .pipe(new Splitter('\r\n|\n')) //splitting each line
        .pipe(new Splitter('')) //splitting each char
        .pipe(new Delay(options.fps / 1000)); //animate
}

module.exports = stream;