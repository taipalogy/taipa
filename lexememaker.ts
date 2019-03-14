import { TonalCombinedMorpheme, ToneSandhiSyllable, ToneSandhiRootMorpheme, Syllable, Morpheme } from './morpheme'
import { TonalLemmaLexeme, ToneSandhiInflectionLexeme, TonalWord, DummyLexeme, Word, ToneSandhiLexeme, SandhiFormLexeme } from './lexeme'
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiRootMorphemeMaker, TonalCombinedMorphemeMaker, CombiningFormMorphemeMaker } from './morphememaker'
import { Tonal, Sound, Turner } from './system';
import { lowerLettersOfTonal } from './version2';
import { AlphabeticGrapheme } from './grapheme';

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

abstract class LexemeMaker {
    abstract morphemes

    preprocess() {
        // extract syllables from morphemes. concatenate syllables into a word.
        // wrap the word in a lexeme. use morephemes to populate lemmata of a lexeme.
        // assign inflectinal affix to a lexeme.
        // push the lexeme into an array of lexemes.
        // unpack morphemes and take syllables out from them
        let syllables: Array<ToneSandhiSyllable> = new Array();
        for(let key in this.morphemes) {
            syllables.push(this.morphemes[key].syllable);
        }

        return syllables
    }

    abstract make(syllables: Array<Syllable>)
}

abstract class InflectiveLexemeMaker extends LexemeMaker {
    abstract postprocess(tsl: ToneSandhiLexeme)
}

export abstract class LemmaLexemeMaker extends LexemeMaker {
    abstract postprocess(tsil: TonalLemmaLexeme)
}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme Maker
//------------------------------------------------------------------------------

export class TonalLemmaLexemeMaker extends LemmaLexemeMaker {
    morphemes: Array<TonalCombinedMorpheme>;

    constructor(morphemes: Array<TonalCombinedMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeTonalLemmaLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new TonalLemmaLexeme(new TonalWord(syllables));
    }

    postprocess(tsil: TonalLemmaLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to combined lexeme
                tsil.assignInflectionalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        // lemmata needs to be populated for combined lexeme
        tsil.populateLemmata(this.morphemes);

        let lexemes: Array<TonalLemmaLexeme> = new Array();

        lexemes.push(tsil);

        return lexemes
    }
}

export class TonalInflectionLexemeMaker extends InflectiveLexemeMaker {
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
        return new ToneSandhiInflectionLexeme(new TonalWord(syllables));
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

class TonalInflectedLexemeMaker extends TonalInflectionLexemeMaker {
    tonal: Tonal

    constructor(morphemes: Array<ToneSandhiRootMorpheme>, tm?: Tonal) {
        super(morphemes)
        //this.morphemes = new Array();
        //this.morphemes = morphemes;
        if(tm != undefined) {
            this.tonal = tm
        }
    }

    makeSandhiLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<ToneSandhiSyllable>) {
        return new SandhiFormLexeme(new TonalWord(syllables));
    }

    postprocess(tspl: SandhiFormLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to sandhi lexeme
                tspl.assignTonalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        tspl.populateSandhiForm(this.morphemes, this.tonal)

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

//------------------------------------------------------------------------------
//  Lexeme Turner
//------------------------------------------------------------------------------

export class TonalTurner extends Turner {
    arraysOfSounds: Array<Sound[]> = new Array()

    turnIntoGraphemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    turnIntoMorphemes(str: string);
    turnIntoMorphemes(gs: Array<AlphabeticGrapheme>)
    turnIntoMorphemes(x) {
        let graphemes
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
             graphemes = this.turnIntoGraphemes(x)
        }

        // Morpheme Maker
        let tsimm = new TonalCombinedMorphemeMaker(graphemes);
        let obj = tsimm.makeCombinedMorphemes();
        this.arraysOfSounds = obj.arraysOfSounds
        return obj.morphemes
    }
    
    turnIntoLexemes(str: string) {
        let morphemes = this.turnIntoMorphemes(str)

        // Lexeme Maker
        let tsilm = new TonalLemmaLexemeMaker(morphemes);
        return tsilm.makeTonalLemmaLexemes();
    }
}

export class TurningIntoInflectionLexeme {
    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new ToneSandhiRootMorphemeMaker(graphemes);
        let obj = tsmm.makeRootMorphemes();

        // Lexeme Maker
        let tslm = new TonalInflectionLexemeMaker(obj.morphemes);
        let lexemes = tslm.makeInflectionLexemes();

        return lexemes;
    }
}

export class TurningIntoSandhiForm extends TurningIntoInflectionLexeme {
    tonal: Tonal

    constructor (tm: Tonal) {
        super()
        this.tonal = tm
    }

    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new CombiningFormMorphemeMaker(graphemes);
        let morphemes = tsmm.makeCombiningMorphemes(); // only the last morpheme is used

        // Lexeme Maker
        let tslm = new TonalInflectedLexemeMaker(morphemes, this.tonal);
        let lexemes = tslm.makeSandhiLexemes();

        return lexemes;
    }
}
