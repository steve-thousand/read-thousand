export function enhanceWord(word) {
    const length = Math.max(Math.ceil(word.length / 2), 1);
    const newWord = ["<b>"];
    for (var i = 0; i < word.length; i++) {
        newWord.push(word.charAt(i));
        if (i + 1 == length) {
            newWord.push("</b>");
        }
    }
    return newWord.join('')
}

function readElementTag(text, i) {
    let tagWord = [];
    while (i < text.length) {
        tagWord.push(text.charAt(i));
        if (text.charAt(i) === '>') {
            break;
        }
        i++;
    }
    return tagWord.join('');
}

export function enhanceParagraph(text) {
    let char = null;
    let words = [];
    let wordCharacters = [];
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
                words.push(enhanceWord(wordCharacters.join('')));
                wordCharacters = [];
            }
            if (char === '<') {
                const htmlTag = readElementTag(text, i);
                words.push(htmlTag);
                i += htmlTag.length - 1;
            } else {
                words.push(char);
            }
        }
    }
    if (wordCharacters.length > 0) {
        words.push(enhanceWord(wordCharacters.join('')));
    }
    return words.join("");
}