import { TonalInflectingMetaplasm, Lexeme, LexemeMaker } from '../lexeme';
import { TonalCombiningMorpheme } from './morpheme';
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme';
import { Allomorph, FreeAllomorph, CheckedAllomorph, TonalSoundTags, TonalLetterTags } from '../tonal/version2';
import { TonalSyllable } from '../tonal/morpheme';

//------------------------------------------------------------------------------

export class TonalDesinenceInflexion extends TonalInflectingMetaplasm {
    apply(ms: Array<TonalCombiningMorpheme>, tse: TonalSymbolEnding): TonalWord[] {
        if (tse) {
            const last = ms[ms.length - 1];
            const slbs = last.getForms();
            let rets = [];
            for (let i in slbs) {
                let wd = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));
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

export class TransfixInflexion extends TonalInflectingMetaplasm {
    apply(ms: Array<TonalCombiningMorpheme>, tse: TonalSymbolEnding): TonalWord[] {
        let rets = [];
        let tw = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));

        for(let i = 0; i < ms.length; i++) {
            tw.replaceSyllable(i, ms[i].getForms()[0])
        }
        rets.push(tw);

        return rets;
    }
}

//------------------------------------------------------------------------------

export class RegressiveAssimilation extends TonalInflectingMetaplasm {
    apply(ms: Array<TonalCombiningMorpheme>, tse: TonalSymbolEnding): TonalWord[] {
        let rets = [];
        let tw = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));

        if(ms.length > 1) {
            for(let i = 1; i < ms.length; i++) {
                if(ms[i].sounds[0].name === TonalSoundTags.initial
                    && (ms[i-1].sounds[ms[i-1].sounds.length-2].toString() === TonalLetterTags.t
                        || ms[i-1].sounds[ms[i-1].sounds.length-2].toString() === TonalLetterTags.tt)) {
                    tw.replaceSyllable(i-1, ms[i-1].getForms(ms[i].sounds[0])[0]);
                } else {
                    // console.log(ms[i-1])
                    const syls = ms[i-1].getForms(ms[i].sounds[0]);
                    if(syls.length)
                        tw.replaceSyllable(i-1, syls[0]);
                }
            }
        }
        rets.push(tw);

        return rets;
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
        return ti.apply(ms, this.tse);
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
