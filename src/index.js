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
    if (_format == '') {
        return []
    }
    let pattern = getPattern();
    return fill_position(pattern, 0, pattern.length, "", [], cb);
}

function getPattern() {
    let pattern = [];
    _format.split("").map(function (letter) {
        switch (letter) {
            case 'C':
                pattern.push(consonants)
                break;
            case 'V':
                pattern.push(vowels)
                break;
            case '#':
                pattern.push(numbers)
                break;
            default:
                pattern.push([letter])
        }
    });
    return pattern
}

function fill_position(pattern, position, length, partial, result, cb = null) {
    if (position == length - 1) {
        pattern[position].forEach(function (character) {
                var word = _prefix + partial + character + _suffix;
                if (typeof cb === "function") {
                    cb(word)
                } else {
                    result.push(word)
                }
            }
        )
    } else {
        pattern[position].forEach(character =>
            fill_position(pattern, position + 1, length, partial + character, result, cb)
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