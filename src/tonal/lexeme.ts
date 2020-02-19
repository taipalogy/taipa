import { TonalSyllable, TonalUncombiningMorpheme } from './morpheme';
import { Word, LexemeMaker, TonalLemmatizationMetaplasm, Lexeme } from '../lexeme';
import { FreeAllomorph, CheckedAllomorph, Allomorph, TonalLetterTags } from './version2';
import { TonalAffix } from './version2';

export class TonalLemmatization extends TonalLemmatizationMetaplasm {
    apply(morphemes: Array<TonalUncombiningMorpheme>, inflectionalEnding: InflectionalEnding) {
        return this.populateLemmata(morphemes, inflectionalEnding);
    }

    private getLemmas(
        morphemes: Array<TonalUncombiningMorpheme>,
        inflectionalEnding: InflectionalEnding
    ): Array<TonalWord> {
        if (inflectionalEnding) {
            if (inflectionalEnding instanceof FreeInflectionalEnding) {
                const ret = [];
                const arr = morphemes[morphemes.length - 1].getForms();

                for (let key in arr) {
                    const wrd = new TonalWord(morphemes.map(x => x.syllable));
                    wrd.popSyllable();
                    wrd.pushSyllable(arr[key]);
                    ret.push(wrd);
                }
                return ret;
            } else if (inflectionalEnding instanceof CheckedInflectionalEnding) {
                if (morphemes[morphemes.length - 1].getForms().length == 0) return [];
                const wrd = new TonalWord(morphemes.map(x => x.syllable));
                wrd.popSyllable();
                wrd.pushSyllable(morphemes[morphemes.length - 1].getForms()[0]);
                return [wrd];
            }
        }

        return [];
    }

    private populateLemmata(morphemes: Array<TonalUncombiningMorpheme>, inflectionalEnding: InflectionalEnding) {
        let lemmata: Array<TonalWord> = new Array();

        // turn morphemes into lemmas
        let lms = this.getLemmas(morphemes, inflectionalEnding);
        if (lms.length > 0) {
            for (let key in lms) {
                lemmata.push(lms[key]);
            }
        }
        return lemmata;
    }
}

//------------------------------------------------------------------------------

class Ending {}

export class InflectionalEnding extends Ending {
    affix: TonalAffix = new TonalAffix(); // the affix of this word
    toString() {
        return this.affix.toString();
    }
}

export class FreeInflectionalEnding extends InflectionalEnding {}

export class CheckedInflectionalEnding extends InflectionalEnding {}

export class TonalSymbolEnding extends Ending {
    allomorph: Allomorph = new Allomorph();
    toString() {
        return this.allomorph.toString();
    }
}

export class FreeTonalEnding extends TonalSymbolEnding {}

export class CheckedTonalEnding extends TonalSymbolEnding {}

//------------------------------------------------------------------------------

export class TonalWord extends Word {
    syllables: Array<TonalSyllable>;
    constructor(syllables: Array<TonalSyllable>) {
        super();
        this.syllables = new Array<TonalSyllable>();
        if (syllables != undefined) {
            let len = syllables.length;
            for (let i = 0; i < len; i++) {
                this.pushSyllable(syllables[i]);
            }
        }
    }
}

//------------------------------------------------------------------------------

export class TonalLemmatizationLexeme extends Lexeme {
    word: TonalWord;
    private lemmata: Array<TonalWord> = new Array(); // lexical forms. underlying forms
    private inflectionalEnding: InflectionalEnding;

    constructor(morphemes: Array<TonalUncombiningMorpheme>, metaplasm: TonalLemmatization) {
        super();

        if (morphemes.length == 0) this.word = new TonalWord([]);
        else this.word = new TonalWord(morphemes.map(x => x.syllable));

        if (morphemes.length > 0) {
            if (morphemes[morphemes.length - 1].allomorph) {
                this.inflectionalEnding = this.assignInflectionalEnding(morphemes[morphemes.length - 1].allomorph);
            } else {
                this.inflectionalEnding = new InflectionalEnding();
            }
        } else {
            this.inflectionalEnding = new InflectionalEnding();
        }

        if (morphemes.length > 0) this.lemmata = metaplasm.apply(morphemes, this.inflectionalEnding);
    }

    getLemmata() {
        // this must be called after populateLemmata is called
        return this.lemmata;
    }

    getInflectionalEnding() {
        if (this.inflectionalEnding) return this.inflectionalEnding.toString();
        return '';
    }

    private assignInflectionalEnding(allomorph: Allomorph) {
        let infe: InflectionalEnding = new InflectionalEnding();
        // change allomorph to affix
        if (allomorph instanceof FreeAllomorph) {
            let fie = new FreeInflectionalEnding();
            fie.affix.tonal = allomorph.tonal;
            infe = fie;
        } else if (allomorph instanceof CheckedAllomorph) {
            let cie = new CheckedInflectionalEnding();
            cie.affix.tonal = allomorph.tonal;
            infe = cie;
        }
        // this word is already in base form, and its last syllable is checked tone
        return infe;
    }
}

//------------------------------------------------------------------------------

export class TonalLemmatizationLexemeMaker extends LexemeMaker {
    constructor() {
        super();
    }

    makeLexemes(morphemes: Array<TonalUncombiningMorpheme>) {
        return this.make(morphemes);
    }

    protected make(morphemes: Array<TonalUncombiningMorpheme>) {
        let isInflStemWithX: boolean = false; // inflectional stem with x in the middle
        /*
        if (morphemes) {
            isInflStemWithX = this.checkFifth(morphemes);
            if (isInflStemWithX) return new TonalLemmatizationLexeme([], new TonalLemmatization());
        }
*/
        return new TonalLemmatizationLexeme(morphemes, new TonalLemmatization());
    }
    /*
    private checkFifth(morphemes: Array<TonalUncombiningMorpheme>): boolean {
        for (let i = 0; i < morphemes.length; i++) {
            if (morphemes[i] && morphemes[i].syllable.lastLetter.literal === TonalLetterTags.x) {
                if (
                    i < morphemes.length - 1 &&
                    morphemes[morphemes.length - 1].syllable.lastLetter.literal !== TonalLetterTags.y &&
                    morphemes[morphemes.length - 1].syllable.lastSecondLetter.literal !== TonalLetterTags.a
                ) {
                    if (morphemes[morphemes.length - 1].syllable.lastLetter.literal === TonalLetterTags.a) {
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
    */
}
