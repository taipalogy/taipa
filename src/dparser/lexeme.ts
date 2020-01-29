import { TonalSandhiMetaplasm, Lexeme, LexemeMaker } from '../lexeme';
import { TonalCombiningMorpheme, AssimiDirection } from './morpheme';
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme';
import { Allomorph, FreeAllomorph, CheckedAllomorph, TonalSoundTags, TonalLetterTags } from '../tonal/version2';
import { TonalSyllable } from '../tonal/morpheme';

//------------------------------------------------------------------------------

export class TonalDesinenceInflection extends TonalSandhiMetaplasm {
    apply(ms: Array<TonalCombiningMorpheme>): TonalWord[] {
        if (ms.length > 0 && ms[ms.length - 1]) {
            const last = ms[ms.length - 1];
            const syls = last.getForms();
            let rets = [];
            if (syls) {
                for (let i in syls) {
                    let wd = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));
                    wd.popSyllable();
                    wd.pushSyllable(syls[i]);
                    rets.push(wd);
                }
            }
            return rets;
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class TransfixInflection extends TonalSandhiMetaplasm {
    apply(ms: Array<TonalCombiningMorpheme>): TonalWord[] {
        const rets = [];
        if (ms.length > 0) {
            const tw = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));

            for (let i = 0; i < ms.length; i++) {
                const form = ms[i].getForms()[0];
                if (form) tw.replaceSyllable(i, form);
            }
            rets.push(tw);
        }

        return rets;
    }
}

//------------------------------------------------------------------------------

export class RegressiveAssimilation extends TonalSandhiMetaplasm {
    apply(ms: Array<TonalCombiningMorpheme>): TonalWord[] {
        let tw = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));

        if (ms.length > 1) {
            for (let i = 1; i < ms.length; i++) {
                if (
                    ms[i].sounds[0].name === TonalSoundTags.initial &&
                    (ms[i - 1].syllable.lastSecondLetter.literal === TonalLetterTags.t ||
                        ms[i - 1].syllable.lastSecondLetter.literal === TonalLetterTags.tt)
                ) {
                    tw.replaceSyllable(
                        i - 1,
                        ms[i - 1].getSoundChangeForm(ms[i].sounds[0], AssimiDirection.regressive)[0],
                    );
                } else {
                    const syls = ms[i - 1].getSoundChangeForm(ms[i].sounds[0], AssimiDirection.regressive);
                    if (syls.length) tw.replaceSyllable(i - 1, syls[0]);
                }
            }
        }

        return [tw];
    }
}

//------------------------------------------------------------------------------
// TODO: to be added to index
export class AgressiveAssimilation extends TonalSandhiMetaplasm {
    apply(ms: Array<TonalCombiningMorpheme>): TonalWord[] {
        if (ms.length > 1 && ms[ms.length - 2]) {
            const snds = ms[ms.length - 2].sounds;
            let wrd = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));
            if (
                snds[snds.length - 2].name == TonalSoundTags.nasalFinal &&
                ms[ms.length - 1].syllable.letters[0].literal === TonalLetterTags.a
            ) {
                // m, n, ng followed by -ay. pass the preceding nasal to get forms
                wrd.replaceSyllable(
                    wrd.syllables.length - 1,
                    ms[ms.length - 1].getSoundChangeForm(snds[snds.length - 2], AssimiDirection.agressive)[0],
                );
                return [wrd];
            } else {
                // duplifix. pass the preceding initial to get forms
                wrd.replaceSyllable(
                    wrd.syllables.length - 1,
                    ms[ms.length - 1].getSoundChangeForm(snds[0], AssimiDirection.agressive)[0],
                );
                return [wrd];
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------
// TODO: add to API
export class TonalSandhiLexeme extends Lexeme {
    word: TonalWord;
    otherForms: Array<TonalWord> = new Array(); // inflected or assimilated forms
    private tonalSymbleEnding: TonalSymbolEnding;

    constructor(private ms: Array<TonalCombiningMorpheme>, tim: TonalSandhiMetaplasm) {
        super();
        let isIStemWithX: boolean = false; // inflectional stem with x in the middle

        for (let i = 0; i < ms.length; i++) {
            if (ms[i] && ms[i].syllable.lastLetter.literal === TonalLetterTags.x) {
                if (
                    i < ms.length - 1 &&
                    ms[ms.length - 1].syllable.lastLetter.literal !== TonalLetterTags.y &&
                    ms[ms.length - 1].syllable.lastSecondLetter.literal !== TonalLetterTags.a
                ) {
                    if (ms[ms.length - 1].syllable.lastLetter.literal === TonalLetterTags.a) {
                        break;
                    } else {
                        // tonal x can't not appear in them middle of an inflectional stem
                        // if it is not preceding an ay or a
                        isIStemWithX = true;
                        break;
                    }
                }
            }
        }
        if (isIStemWithX) this.word = new TonalWord([]);
        else this.word = new TonalWord(ms.map(x => x.syllable));

        if (ms.length > 0) {
            if (ms[ms.length - 1].allomorph) {
                // tonal ending needs to be assigned to sandhi lexeme
                this.tonalSymbleEnding = this.assignTonalEnding(ms[ms.length - 1].allomorph);
            } else {
                this.tonalSymbleEnding = new TonalSymbolEnding();
            }
        } else {
            this.tonalSymbleEnding = new TonalSymbolEnding();
        }

        if (!isIStemWithX) {
            this.otherForms = this.assignWordForms(ms, tim);
        }
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

    getInflectionalEnding() {
        if (this.tonalSymbleEnding) return this.tonalSymbleEnding.allomorph.tonal.toString();
        return '';
    }

    private assignWordForms(ms: Array<TonalCombiningMorpheme>, ti: TonalSandhiMetaplasm): TonalWord[] {
        return ti.apply(ms);
    }

    getMorphemes() {
        // when external sandhi is required, member variable morphemes has to be exposed
        return this.ms;
    }

    assimilate(til: TonalSandhiLexeme) {
        const ms = til.getMorphemes();
        if (ms.length > 0) {
            const other_snds = ms[ms.length - 1].sounds;
            if (other_snds[other_snds.length - 1].name === TonalSoundTags.nasalFinal) {
                let wrd = new TonalWord(this.ms.map(x => new TonalSyllable(x.syllable.letters)));

                const s = other_snds[other_snds.length - 1];
                const syls = this.ms[this.ms.length - 1].getSoundChangeForm(s, AssimiDirection.agressive);

                wrd.popSyllable();
                wrd.pushSyllable(syls[0]);

                return wrd;
            }
        }
    }
}

//------------------------------------------------------------------------------

export class TonalSandhiLexemeMaker extends LexemeMaker {
    constructor(private tim: TonalSandhiMetaplasm) {
        super();
    }

    makeLexemes(ms: Array<TonalCombiningMorpheme>) {
        return this.make(ms);
    }

    protected make(ms: Array<TonalCombiningMorpheme>) {
        return new TonalSandhiLexeme(ms, this.tim);
    }
}
