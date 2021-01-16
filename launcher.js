#!/usr/bin/env node
const Player = require('./play.js');
const parseArg = require('./lib/parseArguments');

const config = parseArg(process.argv.slice(2));
const src = config.src;
const options = {};



return Player(src)
    .on('data', (data) => {
        process.stdout.write(data);
    })
    .on('end', () => {
        process.exit(0);
    });