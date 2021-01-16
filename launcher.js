#!/usr/bin/env node
const Player = require('./play.js');
const parseArg = require('./lib/parseArguments');

const config = parseArg(process.argv.slice(2));
const src = config.src;
const options = {fps: config.fps, clearBefore: config.clear || config.clearBefore};

return Player(src, options)
    .on('data', (data) => {
        process.stdout.write(data); //print text
    })
    .on('end', () => {
        process.exit(0); //close launcher
    });