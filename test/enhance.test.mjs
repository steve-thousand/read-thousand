import assert from 'assert';
import { enhanceWord, enhanceParagraph } from '../src/contentScript/enhance.mjs'

const boldMarker = function (word) {
    return "<b>" + word + "</b>";
}

describe('enhance.js', function () {
    describe('#enhanceWord', function () {
        it('single letter word should be fully-wrapped in bold', function () {
            const enhancedWord = enhanceWord('a', boldMarker);
            assert.equal(enhancedWord, "<b>a</b>");
        });
        it('2 letter word should be half-wrapped in bold', function () {
            const enhancedWord = enhanceWord('ab', boldMarker);
            assert.equal(enhancedWord, "<b>a</b>b");
        });
        it('3 letter word should be 2-character-wrapped in bold', function () {
            const enhancedWord = enhanceWord('abc', boldMarker);
            assert.equal(enhancedWord, "<b>ab</b>c");
        });
        it('4 letter word should be half-wrapped in bold', function () {
            const enhancedWord = enhanceWord('abcd', boldMarker);
            assert.equal(enhancedWord, "<b>ab</b>cd");
        });
    });
    describe('#enhanceParagraph', function () {
        it('words should be split and enhanced', function () {
            const enhancedParagraph = enhanceParagraph('These are some words.', boldMarker);
            assert.equal(enhancedParagraph, "<b>The</b>se <b>ar</b>e <b>so</b>me <b>wor</b>ds.");
        });
        it('hyphenated-words should be treated as separate words', function () {
            const enhancedParagraph = enhanceParagraph('Hyphenated-word.', boldMarker);
            assert.equal(enhancedParagraph, "<b>Hyphe</b>nated-<b>wo</b>rd.");
        });
        it('parentheses are ignored', function () {
            const enhancedParagraph = enhanceParagraph('Hi there (whats up).', boldMarker);
            assert.equal(enhancedParagraph, "<b>H</b>i <b>the</b>re (<b>wha</b>ts <b>u</b>p).");
        });
        it('html tags are ignored', function () {
            const enhancedParagraph = enhanceParagraph('<span>some text</span>', boldMarker);
            assert.equal(enhancedParagraph, "<span><b>so</b>me <b>te</b>xt</span>");
        });
        it('html entities are ignored', function () {
            const enhancedParagraph = enhanceParagraph('some&nbsp;text', boldMarker);
            assert.equal(enhancedParagraph, "<b>so</b>me&nbsp;<b>te</b>xt");
        });
        it('html tag strings are ignored', function () {
            const enhancedParagraph = enhanceParagraph('<img loading="lazy" src="..." alt="D[B] > D[A] + W[A, B]">', boldMarker);
            assert.equal(enhancedParagraph, '<img loading="lazy" src="..." alt="D[B] > D[A] + W[A, B]">');
        });
    });
});