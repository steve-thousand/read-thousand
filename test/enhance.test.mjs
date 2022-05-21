import assert from 'assert';
import { enhanceWord, enhanceParagraph } from '../src/contentScript/enhance.mjs'

describe('enhance.js', function () {
    describe('#enhanceWord', function () {
        it('single letter word should be fully-wrapped in bold', function () {
            const enhancedWord = enhanceWord('a');
            assert.equal(enhancedWord, "<b>a</b>");
        });
        it('2 letter word should be half-wrapped in bold', function () {
            const enhancedWord = enhanceWord('ab');
            assert.equal(enhancedWord, "<b>a</b>b");
        });
        it('3 letter word should be 2-character-wrapped in bold', function () {
            const enhancedWord = enhanceWord('abc');
            assert.equal(enhancedWord, "<b>ab</b>c");
        });
        it('4 letter word should be half-wrapped in bold', function () {
            const enhancedWord = enhanceWord('abcd');
            assert.equal(enhancedWord, "<b>ab</b>cd");
        });
    });
    describe('#enhanceParagraph', function () {
        it('words should be split and enhanced', function () {
            const enhancedParagraph = enhanceParagraph('These are some words.');
            assert.equal(enhancedParagraph, "<b>The</b>se <b>ar</b>e <b>so</b>me <b>wor</b>ds.");
        });
        it('hyphenated-words should be treated as separate words', function () {
            const enhancedParagraph = enhanceParagraph('Hyphenated-word.');
            assert.equal(enhancedParagraph, "<b>Hyphe</b>nated-<b>wo</b>rd.");
        });
        it('parentheses are ignored', function () {
            const enhancedParagraph = enhanceParagraph('Hi there (whats up).');
            assert.equal(enhancedParagraph, "<b>H</b>i <b>the</b>re (<b>wha</b>ts <b>u</b>p).");
        });
        it('html tags are ignored', function () {
            const enhancedParagraph = enhanceParagraph('<span>some text</span>');
            assert.equal(enhancedParagraph, "<span><b>so</b>me <b>te</b>xt</span>");
        });
    });
});