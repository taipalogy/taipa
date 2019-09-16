import { TonalInflectingMetaplasm, Lexeme, Word, LexemeMaker } from '../lexeme';
import { TonalCombiningMorpheme } from './morpheme';
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme';
import { TonalSyllable } from '../tonal/morpheme';
import { Allomorph, FreeAllomorph, CheckedAllomorph } from '../tonal/version2';

//------------------------------------------------------------------------------
//  Tonal Metaplasm
//------------------------------------------------------------------------------

export class TonalInflexion extends TonalInflectingMetaplasm {
    apply(word: TonalWord, ms: Array<TonalCombiningMorpheme>, tse: TonalSymbolEnding): TonalWord[] {
        if (tse) {
            let last = ms[ms.length - 1];
            let slbs = last.getForms();
            let rets = [];
            for (let i in slbs) {
                let wd = new TonalWord(word.syllables);
                wd.popSyllable();
                wd.pushSyllable(slbs[i]);
                rets.push(wd);
            }
            return rets;
        }
        return [];
    }
}

//------------------------------------------------------------------------------
//  Tonal Inflection Lexeme
//------------------------------------------------------------------------------

export class InflexionLexeme extends Lexeme {
    word: Word = new Word(); // base word
    otherForms: Array<Word> = [];
}

export class TonalInflexionLexeme extends InflexionLexeme {
    //word: TonalWord; // base word
    otherForms: Array<TonalWord> = new Array(); // inflected or may be derived forms
    private tse: TonalSymbolEnding;

    constructor(word: TonalWord, ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm) {
        super();
        this.word = word;

        if (ms.length > 0) {
            if (ms[ms.length - 1].allomorph) {
                // tonal ending needs to be assigned to sandhi lexeme
                this.tse = this.assignTonalEnding(ms[ms.length - 1].allomorph);
            } else {
                this.tse = new TonalSymbolEnding();
            }
        } else {
            this.tse = new TonalSymbolEnding();
        }

        this.otherForms = this.assignWordForms(ms, tim);
    }

    private assignTonalEnding(allomorph: Allomorph) {
        let tse: TonalSymbolEnding = new TonalSymbolEnding();

        if (allomorph instanceof FreeAllomorph) {
            // replace the tonal ending
            let fte = new FreeTonalEnding();
            fte.allomorph = allomorph;
            tse = fte;
        } else if (allomorph instanceof CheckedAllomorph) {
            // append the tonal of the tonal ending
            let cte = new CheckedTonalEnding();
            cte.allomorph = allomorph;
            tse = cte;
        }
        return tse;
    }

    private assignWordForms(ms: Array<TonalCombiningMorpheme>, ti: TonalInflectingMetaplasm): TonalWord[] {
        return ti.apply(<TonalWord>this.word, ms, this.tse);
    }
}

export class DummyLexeme extends InflexionLexeme {
    word: Word = new Word();
    otherForms = [];
    constructor() {
        super();
    }
}

//------------------------------------------------------------------------------
//  Tonal Inflexion Lexeme Maker
//------------------------------------------------------------------------------

export class TonalInflexionLexemeMaker extends LexemeMaker {
    morphemes: Array<TonalCombiningMorpheme>;

    constructor(morphemes: Array<TonalCombiningMorpheme>, private tim: TonalInflectingMetaplasm) {
        super();
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    preprocess() {
        let syllables: Array<TonalSyllable> = new Array();
        for (let key in this.morphemes) {
            syllables.push(this.morphemes[key].syllable);
        }

        return syllables;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()));
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalInflexionLexeme(new TonalWord(syllables), this.morphemes, this.tim);
    }

    postprocess(tl: TonalInflexionLexeme) {
        let lexemes: Array<TonalInflexionLexeme> = new Array();

        lexemes.push(tl);

        return lexemes;
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
