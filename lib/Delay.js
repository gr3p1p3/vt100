const stream = require('stream');

function sleep(ms) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

class Delay extends stream.Transform {

    constructor(ms, props) {
        super(props);
        this._ms = ms;
    }

    /**
     *
     * @param chunk
     * @param encoding
     * @param done
     * @private
     */
    async _transform(chunk, encoding, done) {
        const self = this;
        await sleep(self._ms);
        self.push(chunk); //emitting data
        done();
    }
}


module.exports = Delay;