# WordPlex

## Installation

```
npm i --save wordplex
```


## Example script

```
const wordplex = require('wordplex');
var words = wordplex.generate('CVC');
console.log(words)
```

## Generating words

```
var words = wordplex.generate('VC');
console.log(words)
```

Result

```
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

```
var words = wordplex.similar('google');
console.log(words)
```

Result

```
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

```
var words = wordplex.generate('VC#');
console.log(words)
```

Result

```
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
```
var words = wordplex.setPrefix('my-').generate();
```

## Generating words with suffix
```
var words = wordplex.setSuffix('.com').generate();
```

## Reset generator to default values
```
var words = wordplex.reset().generate();

```



