#!/usr/bin/env node
const wordplex = require('./index');

const [, , ...args] = process.argv
if (args[0]) {
    wordplex.similar(args[0], function (word) {
        console.log(word)
    })
}