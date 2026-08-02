const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'w'];
const vowels = ['a', 'e', 'i', 'y', 'o', 'u'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const chip = letters.filter(l => !['a', 'e', 'i', 'o', 'u', 'v'].includes(l));
const western = letters.filter(l => !['j', 'k', 'q', 'u', 'v', 'w', 'x', 'y', 'z'].includes(l));
const anything = [...letters, ...numbers, '-'];

// Repetition groups: the same letter always repeats one value within a word,
// different letters of the same family must hold different values.
const repetitionGroups = {
    A: 'letter', B: 'letter', H: 'letter', K: 'letter',
    D: 'number', E: 'number', F: 'number', G: 'number',
    M: 'vowel', O: 'vowel',
    U: 'consonant', X: 'consonant',
};
const groupSets = {
    letter: letters,
    number: numbers,
    vowel: vowels,
    consonant: consonants,
};
let _format = 'VC';
let _suffix = '';
let _prefix = '';

function reset() {
    setSuffix('');
    setPrefix('');
    setFormat('VC');
    return this
}

function setPrefix(p) {
    _prefix = p;
    return this
}

function setSuffix(s) {
    _suffix = s;
    return this
}

function setFormat(format) {
    if (!format) {
        return this;
    }
    if (isPositiveInteger(format)) {
        format = format.toString()
    }
    _format = format
    return this
}

function setFormatByWord(word = null) {
    if (word == null) {
        setFormat('');
        return this
    }

    if (isPositiveInteger(word)) {
        word = word.toString()
    }
    let new_format = '';
    word.split("").map(function (a) {
        if (isPositiveInteger(a)) {
            new_format += '#'
        }
        if (vowels.includes(a.toLowerCase())) {
            new_format += 'V'
        }
        if (consonants.includes(a.toLowerCase())) {
            new_format += 'C'
        }
    });
    setFormat(new_format);
    return this
}

function getFormat() {
    return _format;
}

function similar(word = null, cb = null) {
    setFormatByWord(word);
    return go(cb)
}

function generate(format = null, cb = null) {
    setFormat(format);
    return go(cb)
}

function go(cb) {
    let tokens = getTokens();
    if (tokens.length == 0) {
        return []
    }
    return fill_position(tokens, 0, "", {}, [], cb);
}

function getTokens() {
    let tokens = [];
    _format.split("").map(function (letter) {
        if (letter == '^') {
            return
        }
        if (repetitionGroups[letter]) {
            tokens.push({rep: letter, family: repetitionGroups[letter]})
            return
        }
        switch (letter) {
            case 'C':
                tokens.push({chars: consonants})
                break;
            case 'V':
                tokens.push({chars: vowels})
                break;
            case 'L':
                tokens.push({chars: letters})
                break;
            case 'P':
                tokens.push({chars: chip})
                break;
            case 'W':
                tokens.push({chars: western})
                break;
            case 'N':
            case '#':
                tokens.push({chars: numbers})
                break;
            case '*':
                tokens.push({chars: anything})
                break;
            default:
                tokens.push({chars: [letter]})
        }
    });
    return tokens
}

function fill_position(tokens, position, partial, bindings, result, cb = null) {
    if (position == tokens.length) {
        var word = _prefix + partial + _suffix;
        if (typeof cb === "function") {
            cb(word)
        } else {
            result.push(word)
        }
        return result
    }
    let token = tokens[position];
    if (token.family) {
        if (bindings[token.rep] !== undefined) {
            fill_position(tokens, position + 1, partial + bindings[token.rep], bindings, result, cb)
        } else {
            let used = Object.keys(bindings)
                .filter(key => repetitionGroups[key] == token.family)
                .map(key => bindings[key]);
            groupSets[token.family].forEach(function (character) {
                if (used.includes(character)) {
                    return
                }
                let extended = Object.assign({}, bindings);
                extended[token.rep] = character;
                fill_position(tokens, position + 1, partial + character, extended, result, cb)
            })
        }
    } else {
        token.chars.forEach(character =>
            fill_position(tokens, position + 1, partial + character, bindings, result, cb)
        )
    }
    return result
}

function isPositiveInteger(n) {
    return n >>> 0 === parseFloat(n);
}

module.exports = {
    consonants,
    vowels,
    numbers,
    generate,
    similar,
    reset,
    setSuffix,
    setPrefix,
    setFormat,
    getFormat,
};