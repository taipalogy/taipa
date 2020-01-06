import { TonalInflectingMetaplasm, Lexeme, Word, LexemeMaker } from '../lexeme';
import { TonalCombiningMorpheme } from './morpheme';
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme';
import { TonalSyllable } from '../tonal/morpheme';
import { Allomorph, FreeAllomorph, CheckedAllomorph } from '../tonal/version2';

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

export class TonalInflexionLexeme extends Lexeme {
    word: TonalWord; // base word
    otherForms: Array<TonalWord> = new Array(); // inflected or may be derived forms
    private tse: TonalSymbolEnding;

    constructor(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm) {
        super();
        this.word = new TonalWord(ms.map(it => it.syllable));

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

//------------------------------------------------------------------------------

export class TonalInflexionLexemeMaker extends LexemeMaker {
    constructor(private tim: TonalInflectingMetaplasm) {
        super();
    }

    makeLexemes(ms: Array<TonalCombiningMorpheme>) {
        return this.make(ms);
    }

    protected make(ms: Array<TonalCombiningMorpheme>) {
        return new TonalInflexionLexeme(ms, this.tim);
    }
}
