const fs = require('fs');

const Throttle = require('throttle'); //TODO implement own throttle

const DEFAULT_OPT = {limit: 1200, clearBefore: true};

/**
 *
 * @param {String} filePath -
 * @param {Object} [options] -
 * @returns {ReadableStream}
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
        .pipe(new Throttle(options.limit));
}

module.exports = stream;