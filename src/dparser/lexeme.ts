import { TonalInflectionMetaplasm, Lexeme, LexemeMaker, TonalAssimilationMetaplasm, Word } from '../lexeme';
import { TonalCombiningMorpheme, AssimiDirection, TonalSoundChangingMorpheme } from './morpheme';
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme';
import {
    Allomorph,
    FreeAllomorph,
    CheckedAllomorph,
    TonalSoundTags,
    TonalLetterTags,
    NasalizationSound
} from '../tonal/version2';
import { TonalSyllable } from '../tonal/morpheme';
import { Sound } from '../grapheme';

//------------------------------------------------------------------------------

export class TonalDesinenceInflection extends TonalInflectionMetaplasm {
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

export class TransfixInflection extends TonalInflectionMetaplasm {
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

export class RegressiveInternal extends TonalAssimilationMetaplasm {
    apply(ms: Array<TonalSoundChangingMorpheme>): TonalWord[] {
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
                        ms[i - 1].changeSoundWith(ms[i].sounds[0], AssimiDirection.regressive)[0]
                    );
                } else {
                    const syls = ms[i - 1].changeSoundWith(ms[i].sounds[0], AssimiDirection.regressive);
                    if (syls.length) tw.replaceSyllable(i - 1, syls[0]);
                }
            }
        }

        return [tw];
    }
}

//------------------------------------------------------------------------------

export class AgressiveInternal extends TonalAssimilationMetaplasm {
    apply(ms: Array<TonalSoundChangingMorpheme>): TonalWord[] {
        if (ms.length > 1 && ms[ms.length - 2]) {
            const snds = ms[ms.length - 2].sounds;
            let wrd = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));

            if (snds.filter(x => x.name === TonalSoundTags.nasalization).length == 1) {
                // nasalization of vowels
                wrd.replaceSyllable(
                    wrd.syllables.length - 1,
                    ms[ms.length - 1].changeSoundWith(new NasalizationSound().sounds[0], AssimiDirection.agressive)[0]
                );
                return [wrd];
            }

            // duplifix. pass the preceding initial to get forms
            wrd.replaceSyllable(
                wrd.syllables.length - 1,
                ms[ms.length - 1].changeSoundWith(snds[0], AssimiDirection.agressive)[0]
            );
            return [wrd];
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class Epenthesis extends TonalAssimilationMetaplasm {
    // adding of nasal consonants. insertion
    apply(ms: Array<TonalSoundChangingMorpheme>): TonalWord[] {
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
                    ms[ms.length - 1].changeSoundWith(snds[snds.length - 2], AssimiDirection.agressive)[0]
                );
                return [wrd];
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class TonalInflectionLexeme extends Lexeme {
    word: TonalWord;
    private forms: Array<TonalWord> = new Array();
    private tonalSymbleEnding: TonalSymbolEnding;
    // TODO: should a member variable affixes be added and passed to metaplasm. check out member sounds in morpheme

    constructor(morphemes: Array<TonalCombiningMorpheme>, metaplasm: TonalInflectionMetaplasm) {
        super();

        if (morphemes.length == 0) this.word = new TonalWord([]);
        else this.word = new TonalWord(morphemes.map(x => x.syllable));

        if (morphemes.length > 0) {
            if (morphemes[morphemes.length - 1]) {
                // tonal ending needs to be assigned to sandhi lexeme
                this.tonalSymbleEnding = this.assignTonalEnding(morphemes[morphemes.length - 1].allomorph);
            } else {
                this.tonalSymbleEnding = new TonalSymbolEnding();
            }
        } else {
            this.tonalSymbleEnding = new TonalSymbolEnding();
        }

        if (morphemes.length > 0) this.forms = this.assignWordForms(morphemes, metaplasm);
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

    getTonalSymbol() {
        if (this.tonalSymbleEnding) return this.tonalSymbleEnding;
        return '';
    }

    private assignWordForms(ms: Array<TonalCombiningMorpheme>, ti: TonalInflectionMetaplasm): TonalWord[] {
        return ti.apply(ms);
    }

    getForms() {
        return this.forms;
    }
}

//------------------------------------------------------------------------------

export class TonalAssimilationLexeme extends Lexeme {
    word: TonalWord;
    private forms: Array<TonalWord> = new Array();

    constructor(private morphemes: Array<TonalSoundChangingMorpheme>, metaplasm: TonalInflectionMetaplasm) {
        super();

        if (morphemes.length == 0) this.word = new TonalWord([]);
        else this.word = new TonalWord(morphemes.map(x => x.syllable));

        if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
    }

    getForms() {
        // for internal samdhi
        return this.forms;
    }

    getMorphemes() {
        // when external sandhi is required, member variable morphemes has to be exposed
        return this.morphemes;
    }

    assimilateWith(til: TonalAssimilationLexeme, dir: AssimiDirection) {
        const ms = til.getMorphemes();
        let wrd = new TonalWord(this.morphemes.map(x => new TonalSyllable(x.syllable.letters)));
        if (ms.length > 0) {
            const adjacentSnds = ms[ms.length - 1].sounds;
            if (dir === AssimiDirection.agressive) {
                let s = new Sound();
                if (
                    adjacentSnds[adjacentSnds.length - 1].name === TonalSoundTags.freeTonal &&
                    adjacentSnds[adjacentSnds.length - 2].name === TonalSoundTags.nasalFinal
                ) {
                    s = adjacentSnds[adjacentSnds.length - 2];
                } else if (adjacentSnds[adjacentSnds.length - 1].name === TonalSoundTags.nasalFinal) {
                    s = adjacentSnds[adjacentSnds.length - 1];
                }
                const syls = this.morphemes[0].changeSoundWith(s, AssimiDirection.agressive);

                wrd.replaceSyllable(0, syls[0]);

                return [wrd];
            } else if (dir === AssimiDirection.regressive && adjacentSnds[0].name === TonalSoundTags.initial) {
                const s = adjacentSnds[0];
                const syls = this.morphemes[this.morphemes.length - 1].changeSoundWith(s, AssimiDirection.regressive);

                wrd.popSyllable();
                wrd.pushSyllable(syls[0]);

                return [wrd];
            }
        }

        return [];
    }
}

//------------------------------------------------------------------------------

export class TonalInflectionLexemeMaker extends LexemeMaker {
    constructor(private tim: TonalInflectionMetaplasm) {
        super();
    }

    makeLexemes(ms: Array<TonalCombiningMorpheme>) {
        return this.make(ms);
    }

    protected make(ms: Array<TonalCombiningMorpheme>) {
        let isInflStemWithX: boolean = false; // inflectional stem with x in the middle

        if (ms) {
            isInflStemWithX = this.checkFifth(ms);
            if (isInflStemWithX) return new TonalInflectionLexeme([], this.tim);
        }

        return new TonalInflectionLexeme(ms, this.tim);
    }

    private checkFifth(ms: Array<TonalCombiningMorpheme>): boolean {
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
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
