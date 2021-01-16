const StringDecoder = require('string_decoder').StringDecoder;
const stream = require('stream');

class Splitter extends stream.Transform {
    /**
     *
     * @param splitOn
     * @param props
     */
    constructor(splitOn = '', props) {
        props = {...{}, ...props};
        super(props);
        this._splitOn = splitOn;
        this.lastOne = '';
        this.decoder = new StringDecoder(props.encoding || 'utf8');
    }

    /**
     *
     * @param chunk
     * @param encoding
     * @param done
     * @private
     */
    _transform(chunk, encoding, done) {
        const self = this;

        self.lastOne += self.decoder.write(chunk);
        const lines = self.lastOne.split(self._splitOn);

        self.lastOne = lines.pop();

        for (const singleLine of lines) {
            self.push(singleLine); //emitting data
        }

        done();
    }

    _flush(done) {
        const self = this;
        self.lastOne += self.decoder.end();
        self.push(self.lastOne);
        done();
    }
}


module.exports = Splitter;