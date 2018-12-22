
import { ToneSandhiInputingMorpheme, ToneSandhiSyllable, ToneSandhiRootMorpheme, Syllable, Rule  } from './morpheme'
import { ToneSandhiInputingLexeme, ToneSandhiInflectionLexeme, ToneSandhiWord, DummyLexeme, Word, ToneSandhiLexeme, SandhiFormLexeme } from './lexeme'
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiRootMorphemeMaker, ToneSandhiInputingMorphemeMaker, CombiningFormMorphemeMaker } from './morphememaker'
import { ToneMark } from './version1';

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

abstract class SuperLexemeMaker {
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
}

abstract class LexemeMaker extends SuperLexemeMaker{
    abstract postprocess(tsl: ToneSandhiLexeme)
}

abstract class InputingLexemeMaker extends SuperLexemeMaker {
    abstract postprocess(tsil: ToneSandhiInputingLexeme)
}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme Maker
//------------------------------------------------------------------------------

export class ToneSandhiInputingLexemeMaker extends InputingLexemeMaker {
    morphemes: Array<ToneSandhiInputingMorpheme>;

    constructor(morphemes: Array<ToneSandhiInputingMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeInputingLexemes() {
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

export class ToneSandhiInflectionLexemeMaker extends LexemeMaker {
    morphemes: Array<ToneSandhiRootMorpheme>;

    constructor(morphemes: Array<ToneSandhiRootMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeInflectionLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new ToneSandhiInflectionLexeme(new ToneSandhiWord(syllables));
    }

    postprocess(tspl: ToneSandhiInflectionLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
            }
        }

        let lexemes: Array<ToneSandhiInflectionLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
}

class SandhiFormLexemeMaker extends ToneSandhiInflectionLexemeMaker {
    toneMark: ToneMark

    constructor(morphemes: Array<ToneSandhiRootMorpheme>, tm?: ToneMark) {
        super(morphemes)
        //this.morphemes = new Array();
        //this.morphemes = morphemes;
        if(tm != undefined) {
            this.toneMark = tm
        }
    }

    makeSandhiLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new SandhiFormLexeme(new ToneSandhiWord(syllables));
    }

    postprocess(tspl: SandhiFormLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to sandhi lexeme
                tspl.assignTonalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        tspl.populateSandhiForm(this.morphemes, this.toneMark)

        let lexemes: Array<SandhiFormLexeme> = new Array();
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
        let tsmm = new ToneSandhiInputingMorphemeMaker(graphemes);
        let morphemes = tsmm.makeInputingMorphemes();

        // Lexeme Maker
        let tslm = new ToneSandhiInputingLexemeMaker(morphemes);
        let lexemes = tslm.makeInputingLexemes();

        return lexemes;
    }
}

export class TurningIntoInflectionLexeme {
    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new ToneSandhiRootMorphemeMaker(graphemes);
        let morphemes = tsmm.makeRootMorphemes();

        // Lexeme Maker
        let tslm = new ToneSandhiInflectionLexemeMaker(morphemes);
        let lexemes = tslm.makeInflectionLexemes();

        return lexemes;
    }
}

export class TurningIntoSandhiForm extends TurningIntoInflectionLexeme {
    toneMark: ToneMark

    constructor (tm: ToneMark) {
        super()
        this.toneMark = tm
    }

    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new CombiningFormMorphemeMaker(graphemes);
        let morphemes = tsmm.makeCombiningMorphemes(); // only the last morpheme is in combining form

        // Lexeme Maker
        let tslm = new SandhiFormLexemeMaker(morphemes, this.toneMark);
        let lexemes = tslm.makeSandhiLexemes();

        return lexemes;
    }
}
