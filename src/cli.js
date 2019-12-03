#!/usr/bin/env node
const wordplex = require('./index');
require('yargs') // eslint-disable-line
    .command({
        command: '$0 <pattern> [options]',
        desc: 'Generate words according to pattern CVC (generates: bab ...) or word google (generates baabba ...)',
        builder: (yargs) => yargs.default('pattern', 'CVC'),
        handler: (argv) => {
            if (argv.verbose) console.info(`generate words using format: ${argv.format}`)
            if (argv.prefix) {
                if (argv.verbose) console.info(`setting prefix to: ${argv.prefix}`)
                wordplex.setPrefix(argv.prefix)
            }

            if (argv.suffix) {
                if (argv.verbose) console.info(`setting suffix to: ${argv.prefix}`)
                wordplex.setSuffix(argv.suffix)
            }

            if (argv.similar) {
                wordplex.similar(argv.pattern, function (word) {
                    console.log(word)
                })
            } else {
                wordplex.generate(argv.pattern, function (word) {
                    console.log(word)
                })
            }
        },
    })

    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })

    .option('similar', {
        alias: 's',
        type: 'boolean',
        description: 'Provide similar word instead of pattern. Will generate similar words.'
    })

    .option('prefix', {
        type: 'string',
        description: 'Set text to be added to the beggining of all generated texts'
    })

    .option('suffix', {
        type: 'string',
        description: 'Set text to be added to the end of all generated texts'
    })

    .usage('Usage: $0 <pattern> [--option]')
    //.wrap(100)
    .argv