const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'w', 'y'];
const vowels = ['a', 'e', 'i', 'o', 'u'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
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
    _format = format;
    return this
}

function setFormatByWord(word = null) {
    if (word == null) {
        setFormat('')
        return this
    }

    var new_format = ''
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
    })
    setFormat(new_format)
    return this
}

function getFormat() {
    return _format;
}

function similar(word = null) {
    setFormatByWord(word)
    if (_format == '') {
        return []
    }
    var pattern = getPattern();
    return fill_position(pattern, 0, pattern.length, "", []);
}

function generate(format = null) {
    if (format !== null) {
        setFormat(format)
    }
    if (_format == '') {
        return []
    }
    var pattern = getPattern();
    return fill_position(pattern, 0, pattern.length, "", []);
}

function getPattern() {
    var pattern = [];
    _format.split("").map(function (a) {
        if (a.toLowerCase() == 'c') {
            pattern.push(consonants)
        }
        if (a.toLowerCase() == 'v') {
            pattern.push(vowels)
        }
        if (a == '#') {
            pattern.push(numbers)
        }
    });
    return pattern
}

function fill_position(pattern, position, length, partial, result) {
    if (position == length - 1) {
        pattern[position].forEach(character =>
            result.push(_prefix + partial + character + _suffix)
        )
    } else {
        pattern[position].forEach(character =>
            fill_position(pattern, position + 1, length, partial + character, result)
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