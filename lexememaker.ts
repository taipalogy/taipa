
import { ToneSandhiInputingMorpheme, ToneSandhiSyllable, ToneSandhiParsingMorpheme, Syllable  } from './morpheme'
import { ToneSandhiInputingLexeme, ToneSandhiWord, DummyLexeme, Word, ToneSandhiLexeme } from './lexeme'
import { ToneSandhiParsingLexeme } from './rulebasedtagger';
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiParsingMorphemeMaker, ToneSandhiMorphemeMaker } from './morphememaker'

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

abstract class LexemeMaker {
    abstract morphemes

    preprocess() {
        // extract syllables from morphemes. concatenate syllables into a word.
        // wrap the word in a lexeme. use morephemes to populate lemmata of a lexeme.
        // assign inflectinal affix to a lexeme.
        // push the lexeme into an array of lexeme.
        // unpack morphemes and take syllables out from them
        let syllables: Array<ToneSandhiSyllable> = new Array();
        for(let key in this.morphemes) {
            syllables.push(this.morphemes[key].syllable);
        }

        return syllables
    }

    abstract make(syllables: Array<Syllable>)

    abstract postprocess(tsl: ToneSandhiLexeme)
}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme Maker
//------------------------------------------------------------------------------

export class ToneSandhiInputingLexemeMaker extends LexemeMaker {
    morphemes: Array<ToneSandhiInputingMorpheme>;

    constructor(morphemes: Array<ToneSandhiInputingMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new ToneSandhiInputingLexeme(new ToneSandhiWord(syllables));
    }

    postprocess(tsil: ToneSandhiInputingLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to inputing lexeme
                tsil.assignInflectionalEnding(this.morphemes[this.morphemes.length-1].allomorph);
                //console.log("pos got assigned inflectional affix")
            }
        }

        // lemmata needs to be populated for inputing lexeme
        tsil.populateLemmata(this.morphemes);

        let lexemes: Array<ToneSandhiInputingLexeme> = new Array();
        lexemes.push(tsil);

        return lexemes
    }
}

export class ToneSandhiParsingLexemeMaker extends LexemeMaker {
    morphemes: Array<ToneSandhiParsingMorpheme>;

    constructor(morphemes: Array<ToneSandhiParsingMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeParsingLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new ToneSandhiParsingLexeme(new ToneSandhiWord(syllables));
    }

    postprocess(tspl: ToneSandhiParsingLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to parsing lexeme
                tspl.assignTonalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        let lexemes: Array<ToneSandhiParsingLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
}

export class DummyLexemeMaker {
    makeLexeme(str: string) {
        let l = new DummyLexeme();
        l.word = new Word();
        l.word.literal = str;
        return l;
    }
}

class InflectiveLexemeMaker {}
class AgglutinativeLexemeMaker {}

//------------------------------------------------------------------------------
//  Lexeme Turner
//------------------------------------------------------------------------------

export class TurningIntoInputingLexeme {
    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new ToneSandhiMorphemeMaker(graphemes);
        let morphemes = tsmm.makeMorphemes();

        // Lexeme Maker
        let tslm = new ToneSandhiInputingLexemeMaker(morphemes);
        let lexemes = tslm.makeLexemes();

        return lexemes;
    }
}

export class TurningIntoParsingLexeme {
    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new ToneSandhiParsingMorphemeMaker(graphemes);
        let morphemes = tsmm.makeParsingMorphemes();

        // Lexeme Maker
        let tslm = new ToneSandhiParsingLexemeMaker(morphemes);
        let lexemes = tslm.makeParsingLexemes();

        return lexemes;
    }
}
