#!/usr/bin/env node
const { parseArgs } = require('node:util');
const wordplex = require('./index');

const usage = `Usage: wordplex <pattern> [--option]

Generate words according to pattern CVC (generates: bab ...) or word google (generates baabba ...)

Options:
      --help     Show help
      --version  Show version number
  -v, --verbose  Run with verbose logging
  -s, --similar  Provide similar word instead of pattern. Will generate similar words.
      --prefix   Set text to be added to the beggining of all generated texts
      --suffix   Set text to be added to the end of all generated texts`;

let values, positionals;
try {
    ({ values, positionals } = parseArgs({
        options: {
            help: { type: 'boolean' },
            version: { type: 'boolean' },
            verbose: { type: 'boolean', short: 'v' },
            similar: { type: 'boolean', short: 's' },
            prefix: { type: 'string' },
            suffix: { type: 'string' },
        },
        allowPositionals: true,
    }));
} catch (err) {
    console.error(err.message)
    console.error(usage)
    process.exit(1)
}

if (values.help) {
    console.log(usage)
    process.exit(0)
}

if (values.version) {
    console.log(require('../package.json').version)
    process.exit(0)
}

const pattern = positionals[0]
if (!pattern) {
    console.error(usage)
    process.exit(1)
}

if (values.verbose) console.info(`generate words using format: ${pattern}`)
if (values.prefix) {
    if (values.verbose) console.info(`setting prefix to: ${values.prefix}`)
    wordplex.setPrefix(values.prefix)
}

if (values.suffix) {
    if (values.verbose) console.info(`setting suffix to: ${values.suffix}`)
    wordplex.setSuffix(values.suffix)
}

if (values.similar) {
    wordplex.similar(pattern, function (word) {
        console.log(word)
    })
} else {
    wordplex.generate(pattern, function (word) {
        console.log(word)
    })
}
