import { LexemeMaker, Lexeme } from '../lexeme';
import { TonalCombiningMorpheme, TonalSoundChangingMorpheme } from './morpheme';
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme';
import { Allomorph, FreeAllomorph, CheckedAllomorph, TonalSoundTags, TonalLetterTags } from '../tonal/version2';
import { TonalSyllable } from '../tonal/morpheme';
import { Sound } from '../grapheme';
import { TonalInflectionMetaplasm } from '../tonal/metaplasm';
import { AssimiDirection } from './metaplasm';

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

export class TonalAssimilationLexeme implements Lexeme {
    word: TonalWord;
    private forms: Array<TonalWord> = new Array();

    constructor(private morphemes: Array<TonalSoundChangingMorpheme>, metaplasm: TonalInflectionMetaplasm) {
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
