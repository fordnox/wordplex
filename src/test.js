const test = require('ava');

const wordplex = require('./index');

test('count Vowels', t => {
    t.is(wordplex.vowels.length, 6)
});

test('count Consonants', t => {
    t.is(wordplex.consonants.length, 20)
});

test('count Numbers', t => {
    t.is(wordplex.numbers.length, 10)
});

test('default Format', t => {
    t.is(wordplex.getFormat(), 'VC')
});

test('set Format', t => {
    wordplex.setFormat('CVV');
    t.pass()
});

test('setPrefix', t => {
    wordplex.setPrefix('i');
    t.pass()
});

test('setSuffix', t => {
    wordplex.setSuffix('ing');
    t.pass()
});

test('test default generate', t => {
    let result = wordplex.reset().generate();
    t.is(result[0], 'ab');
    t.is(result[result.length - 1], 'uw');
    t.is(result.length, 120);
});

test('test generate with format', t => {
    let result = wordplex.reset().generate('CV');
    t.is(result[0], 'ba');
    t.is(result[result.length - 1], 'wu');
    t.is(result.length, 120);
});

test('test numbers generate', t => {
    let result = wordplex.reset().generate('#');
    t.is(result[0], '1');
    t.is(result[result.length - 1], '0');
    t.is(result.length, 10);
});

test('test Suffix And Prefix', t => {
    let result = wordplex.reset().setPrefix('hi-').setSuffix('.com').generate('#');
    t.is(result[0], 'hi-1.com');
    t.is(result[result.length - 1], 'hi-0.com');
    t.is(result.length, 10);
});

test('test generate similar words to some word', t => {
    let result = wordplex.reset().similar('google');
    t.is(wordplex.getFormat(), 'CVVCCV');
    t.is(result[0], 'baabba');
    t.is(result[result.length - 1], 'wuuwwu');
    t.is(result.length, 1728000);
});

test('test generate similar uppercase', t => {
    wordplex.reset().similar('HelL0');
    t.is(wordplex.getFormat(), 'CVCC#');
});

test('test invalid format', t => {
    wordplex.reset().generate('now');
    t.is(wordplex.getFormat(), 'now');
});

test('test every format is valid', t => {
    wordplex.reset().generate('nocvcw');
    t.is(wordplex.getFormat(), 'nocvcw');
});

test('callback generate', t => {
    let result = [
        'test-1',
        'test-2',
        'test-3',
        'test-4',
        'test-5',
        'test-6',
        'test-7',
        'test-8',
        'test-9',
        'test-0',
    ];
    let i = 0;
    wordplex.reset().setPrefix('test-').generate('#', function (word) {
        t.is(word, result[i]);
        i++;
    });
    t.pass();
});

test('callback similar number', t => {
    let i = 0;
    wordplex.reset().similar('3', function (word) {
        if (i < 1) {
            t.is(word, '1');
        }
        i++;
    });
    t.pass();
});

test('callback similar', t => {
    let result = [
        'test-1',
        'test-2',
        'test-3',
        'test-4',
        'test-5',
        'test-6',
        'test-7',
        'test-8',
        'test-9',
        'test-0',
    ];
    let i = 0;
    wordplex.reset().setPrefix('test-').similar('0', function (word) {
        t.is(word, result[i]);
        i++;
    });
    t.pass();
});

test('callback similar case sensitive', t => {
    let result = [
        'bibi',
        'bici',
        'bidi',
        'bifi',
        'bigi',
        'bihi',
        'biji',
        'biki',
        'bili',
        'bimi',
        'bini',
        'bipi',
        'biqi',
        'biri',
        'bisi',
        'biti',
        'bivi',
        'bixi',
        'bizi',
        'biwi',
        'cibi'
    ];
    let i = 0;
    wordplex.reset().generate('CiCi', function (word) {
        if (i < result.length) {
            t.is(word, result[i]);
        }
        i++;
    });
    t.pass();
});
