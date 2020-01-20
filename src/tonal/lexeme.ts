import { TonalSyllable, TonalUncombiningMorpheme } from './morpheme';
import { Word, LexemeMaker, TonalLemmatizingMetaplasm, Lexeme } from '../lexeme';
import { freeAllomorphUncombiningRules, ZeroTonal } from './version2';
import { FreeAllomorph, CheckedAllomorph, Allomorph } from './version2';
import { TonalAffix } from './version2';

class TonalZeroLemmatization extends TonalLemmatizingMetaplasm {}
export class TonalLemmatization extends TonalLemmatizingMetaplasm {
    apply(morphemes: Array<TonalUncombiningMorpheme>, inflectionalEnding: InflectionalEnding) {
        return this.populateLemmata(morphemes, inflectionalEnding);
    }

    private replaceLastSyllable(morphemes: Array<TonalUncombiningMorpheme>) {
        let wd = new TonalWord(morphemes.map(x => x.syllable));
        wd.popSyllable();
        wd.pushSyllable(morphemes[morphemes.length - 1].getForms()[0]);
        return wd;
    }

    private getLemmas(
        morphemes: Array<TonalUncombiningMorpheme>,
        inflectionalEnding: InflectionalEnding,
    ): Array<TonalWord> {
        if (inflectionalEnding) {
            if (inflectionalEnding instanceof FreeInflectionalEnding) {
                if (inflectionalEnding.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(morphemes)];
                } else if (inflectionalEnding.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length - 1].getForms();
                    //console.log(arr)
                    for (let key in arr) {
                        let wd = new TonalWord(morphemes.map(x => x.syllable));
                        wd.popSyllable();
                        wd.pushSyllable(arr[key]);
                        ret.push(wd);
                    }
                    return ret;
                }
            } else if (inflectionalEnding instanceof CheckedInflectionalEnding) {
                if (inflectionalEnding.affix.tonal.toString() === '') return [];
                return [this.replaceLastSyllable(morphemes)];
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

export class FreeInflectionalEnding extends InflectionalEnding {
    // TODO: affixes may be redundant, since we can do the same with getForms()
    // TODO: rename baseAffixes to affixes
    // TODO: this class may be redundant
    baseAffixes: Array<TonalAffix> = new Array();
}

export class CheckedInflectionalEnding extends InflectionalEnding {
    // TODO: this class may be redundant
}

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

export class TonalLemmatizationLexeme extends Lexeme {
    word: TonalWord;
    private lemmata: Array<TonalWord> = new Array(); // lexical forms. underlying forms
    private inflectionalEnding: InflectionalEnding;

    constructor(ms: Array<TonalUncombiningMorpheme>, tl: TonalLemmatization) {
        super();
        this.word = new TonalWord(ms.map(it => it.syllable));

        if (ms.length > 0) {
            if (ms[ms.length - 1].allomorph) {
                this.inflectionalEnding = this.assignInflectionalEnding(ms[ms.length - 1].allomorph);
            } else {
                this.inflectionalEnding = new InflectionalEnding();
            }
        } else {
            this.inflectionalEnding = new InflectionalEnding();
        }
        this.lemmata = tl.apply(ms, this.inflectionalEnding);
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
            const tnls = freeAllomorphUncombiningRules.get(allomorph.toString());
            for (let key in tnls) {
                let a = new TonalAffix();
                a.tonal = tnls[key];
                fie.baseAffixes.push(a);
            }
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

    makeLexemes(ms: Array<TonalUncombiningMorpheme>) {
        return this.make(ms);
    }

    protected make(ms: Array<TonalUncombiningMorpheme>) {
        return new TonalLemmatizationLexeme(ms, new TonalLemmatization());
    }
}
