import { TonalSyllable, TonalUncombiningMorpheme } from './morpheme';
import { Word, LexemeMaker, TonalBaseMetaplasm, Lexeme } from '../lexeme';
import { FreeAllomorph, CheckedAllomorph, Allomorph, TonalLetterTags } from './version2';
import { TonalAffix } from './version2';

class TonalZeroLemmatization extends TonalBaseMetaplasm {}
export class TonalLemmatization extends TonalBaseMetaplasm {
    apply(morphemes: Array<TonalUncombiningMorpheme>, inflectionalEnding: InflectionalEnding) {
        return this.populateLemmata(morphemes, inflectionalEnding);
    }

    private getLemmas(
        morphemes: Array<TonalUncombiningMorpheme>,
        inflectionalEnding: InflectionalEnding,
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
    constructor(syllables?: Array<TonalSyllable>) {
        super();
        this.syllables = new Array<TonalSyllable>();
        if (syllables != undefined) {
            let len = syllables.length;
            for (var i = 0; i < len; i++) {
                this.pushSyllable(syllables[i]);
            }
        }
    }
}

//------------------------------------------------------------------------------

export class TonalBaseLexeme extends Lexeme {
    word: TonalWord;
    private lemmata: Array<TonalWord> = new Array(); // lexical forms. underlying forms
    private inflectionalEnding: InflectionalEnding;

    constructor(ms: Array<TonalUncombiningMorpheme>, tl: TonalLemmatization) {
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
                this.inflectionalEnding = this.assignInflectionalEnding(ms[ms.length - 1].allomorph);
            } else {
                this.inflectionalEnding = new InflectionalEnding();
            }
        } else {
            this.inflectionalEnding = new InflectionalEnding();
        }

        if (!isIStemWithX) {
            this.lemmata = tl.apply(ms, this.inflectionalEnding);
        }
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

export class TonalBaseLexemeMaker extends LexemeMaker {
    constructor() {
        super();
    }

    makeLexemes(ms: Array<TonalUncombiningMorpheme>) {
        return this.make(ms);
    }

    protected make(ms: Array<TonalUncombiningMorpheme>) {
        return new TonalBaseLexeme(ms, new TonalLemmatization());
    }
}
