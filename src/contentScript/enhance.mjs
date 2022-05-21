function defaultBoldMarker(word) {
    return "<span class=\"steve000-read-extension\">" + word + "</span>";
}

export function enhanceWord(word, boldMarker) {
    const length = Math.max(Math.ceil(word.length / 2), 1);
    if (!boldMarker) {
        boldMarker = defaultBoldMarker;
    }
    var newWord = [];
    for (var i = 0; i < word.length; i++) {
        newWord.push(word.charAt(i));
        if (i + 1 == length) {
            newWord = [boldMarker(newWord.join(''))];
        }
    }
    return newWord.join('')
}

function readHtmlTag(text, i) {
    let tagWord = [];
    let inProperty = null;
    while (i < text.length) {
        let char = text.charAt(i);
        tagWord.push(char);
        if (char === '\"' || char === '\'') {
            if (!inProperty) {
                //starting a property, ignore any '>' characters
                inProperty = char;
            } else if (char === inProperty) {
                //end of property
                inProperty = null;
            }
        } else if (!inProperty && char === '>') {
            break;
        }
        i++;
    }
    return tagWord.join('');
}

function readHtmlEntity(text, i) {
    let tagWord = [];
    while (i < text.length) {
        tagWord.push(text.charAt(i));
        if (text.charAt(i) === ';') {
            break;
        }
        i++;
    }
    return tagWord.join('');
}

export function enhanceParagraph(text, boldMarker) {
    let char = null;
    let words = [];
    let wordCharacters = [];
    if (!boldMarker) {
        boldMarker = defaultBoldMarker;
    }
    for (var i = 0; i < text.length; i++) {
        char = text.charAt(i);
        const ascii = char.charCodeAt(0);
        if ((ascii >= 65 && ascii < 91) || (ascii >= 97 && ascii < 123)) {
            //LETTER, add to current word
            wordCharacters.push(char);
            continue;
        } else {
            //we consider this the end of previous word (if there is one)
            if (wordCharacters.length !== 0) {
                words.push(enhanceWord(wordCharacters.join(''), boldMarker));
                wordCharacters = [];
            }
            if (char === '<') {
                const htmlTag = readHtmlTag(text, i);
                words.push(htmlTag);
                i += htmlTag.length - 1;
            } else if (char === '&') {
                const htmlEntity = readHtmlEntity(text, i);
                words.push(htmlEntity);
                i += htmlEntity.length - 1;
            } else {
                words.push(char);
            }
        }
    }
    if (wordCharacters.length > 0) {
        words.push(enhanceWord(wordCharacters.join(''), boldMarker));
    }
    return words.join("");
}