# WordPlex

[![travis build](https://img.shields.io/travis/fordnox/wordplex.svg?style=flat-square)](https://travis-ci.org/fordnox/wordplex)
[![version](https://img.shields.io/npm/v/wordplex.svg?style=flat-square)](https://www.npmjs.com/package/wordplex)
[![downloads](https://img.shields.io/npm/dm/wordplex.svg?style=flat-square)](https://npm-stat.com/charts.html?package=wordplex&from=2019-11-01)
[![MIT License](https://img.shields.io/npm/l/wordplex.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## Installation

Install for global use

```js
npm i -g wordplex
```

Install for use in project

```js
npm i --save wordplex
```


## CLI

```cli
wordplex --help
wordplex <pattern> [options]

Generate words according to pattern CVC (generates: bab ...) or word google
(generates baabba ...)

Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --verbose, -v  Run with verbose logging                              [boolean]
  --similar, -s  Provide similar word instead of pattern. Will generate similar
                 words.                                                [boolean]
  --prefix       Set text to be added to the beggining of all generated texts
                                                                        [string]
  --suffix       Set text to be added to the end of all generated texts [string]
  --pattern                                                     [default: "CVC"]
```

Generate all 3 letter .com domains in `CVC` format

```wordplex CVC --suffix=.com```

Generate all 4 letter .net domains in `CVCV` format

```wordplex CVCV --suffix=.net```

Generate words in format `CVC` (consonant vowel consonant)

```cli
$ wordplex CVC
bbb
bbc
bbd
bbf
bbg
bbh
bbj
bbk
bbl
bbm
...
```


```cli
$ wordplex look
```

Will generate words similar to `look` in `CVVC` format
```
baab
baac
baad
baaf
baag
baah
baaj
baak
baal
baam
...
```

## Example script

```js
const wordplex = require('wordplex');
wordplex.generate('CVC', function(word) {
    console.log(word)
});

```

Result

```cli
[ 'bab',
  'bac',
  'bad',
  'baf',
  'bag',
  'bah',
  'baj',
  'bak',
  'bal',
  'bam',
  'ban',
  'bap',
  'baq',
  ...
```

## Generating words

```js
var words = wordplex.generate('VC');
console.log(words)
```

Result

```cli
[ 'ab',
  'ac',
  'ad',
  'af',
  'ag',
  'ah',
  'aj',
  'ak',
  'al',
  'am',
  'an',
  ...
```

## Generating similar format words

```js
var words = wordplex.similar('google');
console.log(words)
```

Result generate words in `CVVCCV` format


```cli
[ 'baabba',
  'baabbe',
  'baabbi',
  'baabbo',
  'baabbu',
  'baabca',
  'baabce',
  'baabci',
  'baabco',
  'baabcu',
  'baabda',
  'baabde',
  ...
```

## Generating words with numbers

```js
var words = wordplex.generate('VC#');
console.log(words)
```

Result

```cli
[ 'ab1',
  'ab2',
  'ab3',
  'ab4',
  'ab5',
  'ab6',
  'ab7',
  'ab8',
  'ab9',
  'ab0',
  'ac1',
  'ac2',
  'ac3',
  ...
```

## Generating words with prefix

```js
var words = wordplex.setPrefix('my-').similar("dog");
console.log(words)
```

Result

```cli
[ 'my-bab',
  'my-bac',
  'my-bad',
  'my-baf',
  'my-bag',
  'my-bah',
  'my-baj',
  'my-bak',
  'my-bal',
  'my-bam',
  'my-ban',
  'my-bap',
  ...
```

## Generating words with suffix

```js
var words = wordplex.setSuffix('.com').generate('CVC');
console.log(words)
```

Result

```cli
[ 'bab.com',
  'bac.com',
  'bad.com',
  'baf.com',
  'bag.com',
  'bah.com',
  'baj.com',
  'bak.com',
  'bal.com',
  'bam.com',
  'ban.com',
  'bap.com',
  ...
```
  
## Reset generator to default values

```js
var words = wordplex.reset().generate();
console.log(words)
```

Result

```cli
[ 'ab',
  'ac',
  'ad',
  'af',
  'ag',
  'ah',
  'aj',
  'ak',
  ...
```

# Development

    npm i --dev
    npm test