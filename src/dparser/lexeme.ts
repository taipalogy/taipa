import { TonalInflectingMetaplasm, Lexeme, LexemeMaker } from '../lexeme';
import { TonalCombiningMorpheme } from './morpheme';
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme';
import { Allomorph, FreeAllomorph, CheckedAllomorph, TonalSoundTags, TonalLetterTags } from '../tonal/version2';
import { TonalSyllable } from '../tonal/morpheme';

//------------------------------------------------------------------------------

export class TonalDesinenceInflection extends TonalInflectingMetaplasm {
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

export class TransfixInflection extends TonalInflectingMetaplasm {
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
                    tw.replaceSyllable(i-1, ms[i-1].getSoundChangeForm(ms[i].sounds[0])[0]);
                } else {
                    const syls = ms[i-1].getSoundChangeForm(ms[i].sounds[0]);
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

export class TonalInflectionLexeme extends Lexeme {
    word: TonalWord;
    otherForms: Array<TonalWord> = new Array(); // inflected or assimilated forms
    private tse: TonalSymbolEnding;

    constructor(private ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm) {
        super();
        this.word = new TonalWord(ms.map(x => x.syllable));

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

    getMorphemes() {
        // when external sandhi is required, member variable morphemes has to be exposed
        return this.ms;
    }

    assimilate(til: TonalInflectionLexeme) {
        const ms = til.getMorphemes();
        const other_snds = ms[ms.length-1].sounds;
        if(other_snds[other_snds.length-1].name === TonalSoundTags.nasalFinal) {
            let wrd = new TonalWord(this.ms.map(x => new TonalSyllable(x.syllable.letters)));

            const s = other_snds[other_snds.length-1]
            const syls = this.ms[this.ms.length-1].getSoundChangeForm(s);

            wrd.popSyllable();
            wrd.pushSyllable(syls[0]);

            return wrd;
        }
    }
}

//------------------------------------------------------------------------------

export class TonalInflectionLexemeMaker extends LexemeMaker {
    constructor(private tim: TonalInflectingMetaplasm) {
        super();
    }

    makeLexemes(ms: Array<TonalCombiningMorpheme>) {
        return this.make(ms);
    }

    protected make(ms: Array<TonalCombiningMorpheme>) {
        return new TonalInflectionLexeme(ms, this.tim);
    }
}
