import { TonalSyllable, TonalUncombiningMorpheme } from './morpheme'
import { Word, LexemeMaker, TonalLemmatizingMetaplasm, Lexeme } from '../lexeme'
import { freeAllomorphUncombiningRules } from './version2'
import { FreeAllomorph, CheckedAllomorph, Allomorph } from './version2'
import { TonalAffix } from './version2'

//------------------------------------------------------------------------------
//  Tonal Metaplasm
//------------------------------------------------------------------------------

class TonalAdverbLemmatization extends TonalLemmatizingMetaplasm {}
class TonalPronounLemmatization extends TonalLemmatizingMetaplasm {}
class TonalParticleLemmatization extends TonalLemmatizingMetaplasm {}
class TonalZeroLemmatization extends TonalLemmatizingMetaplasm {}
export class TonalLemmatization extends TonalLemmatizingMetaplasm {
    apply(word: TonalWord, morphemes: Array<TonalUncombiningMorpheme>, inflectionalEnding: InflectionalEnding) {
  
        return  this.populateLemmata(word, morphemes, inflectionalEnding)
    }

    private replaceLastSyllable(word: TonalWord, morphemes: Array<TonalUncombiningMorpheme>) {
        let wd = new TonalWord(word.syllables);
        wd.popSyllable();
        wd.pushSyllable(morphemes[morphemes.length-1].apply()[0])
        return wd;
    }

    private getLemmas(word: TonalWord, morphemes: Array<TonalUncombiningMorpheme>, inflectionalEnding: InflectionalEnding): Array<TonalWord> {
        if(inflectionalEnding != null) {
            if(inflectionalEnding instanceof FreeInflectionalEnding) {
                if(inflectionalEnding.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(word, morphemes)];
                } else if(inflectionalEnding.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length-1].apply()
                    //console.log(arr)
                    for(let key in arr) {
                        let wd = new TonalWord(word.syllables);
                        wd.popSyllable();
                        wd.pushSyllable(arr[key]);
                        ret.push(wd);
                    }
                    return ret;
                }
            } else if(inflectionalEnding instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable(word, morphemes)];
            }
        }

        return [];
    }

    private populateLemmata(word: TonalWord, morphemes: Array<TonalUncombiningMorpheme>, inflectionalEnding: InflectionalEnding) {
        let lemmata: Array<TonalWord> = new Array();

        // turn morphemes into lemmas
        let lms = this.getLemmas(word, morphemes, inflectionalEnding);
        if(lms.length > 0) {
            for(let key in lms) {
                lemmata.push(lms[key]);
            }
        }
        return lemmata
    }
}

//------------------------------------------------------------------------------
//  Inflectional Ending
//------------------------------------------------------------------------------

class Ending {}

export class InflectionalEnding extends Ending {
    affix: TonalAffix = new TonalAffix()
    getLiteral() {
        return this.affix.getLiteral()
    }
}

export class FreeInflectionalEnding extends InflectionalEnding {
    baseAffixes: Array<TonalAffix> = new Array();
}

export class CheckedInflectionalEnding extends InflectionalEnding {}

export class TonalSymbolEnding extends Ending {
    allomorph: Allomorph = new Allomorph()
    getLiteral() {
        return this.allomorph.getLiteral()
    }
}

export class FreeTonalEnding extends TonalSymbolEnding {}

export class CheckedTonalEnding extends TonalSymbolEnding {}

//------------------------------------------------------------------------------
//  Tonal Word
//------------------------------------------------------------------------------

export class TonalWord extends Word {
    syllables: Array<TonalSyllable>;
    constructor(syllables?: Array<TonalSyllable>) {
        super();
        this.syllables = new Array<TonalSyllable>();
        if(syllables != undefined) {
            let len = syllables.length;
            for(var i = 0; i < len; i++) {
                this.pushSyllable(syllables[i]);
            }
        }
    }
}

//------------------------------------------------------------------------------
//  Tonal Lexeme
//------------------------------------------------------------------------------

export abstract class LemmatizationLexeme extends Lexeme {
    abstract word: Word
}

export class TonalLemmatizationLexeme extends LemmatizationLexeme {
    word: TonalWord
    lemmata: Array<TonalWord> = new Array()
    inflectionalEnding: InflectionalEnding
    metaplasm: TonalLemmatizingMetaplasm = new TonalZeroLemmatization()

    constructor(word: TonalWord, ms: Array<TonalUncombiningMorpheme>, tl: TonalLemmatization) {
        // TODO: parameter word may be redundant
        super()
        this.word = word;
        if(ms.length > 0) {
            if(ms[ms.length-1].allomorph) {
                this.inflectionalEnding = this.assignInflectionalEnding(ms[ms.length-1].allomorph);
            } else {
                this.inflectionalEnding = new InflectionalEnding()
            }
        } else {
            this.inflectionalEnding = new InflectionalEnding()
        }
        this.lemmata = tl.apply(this.word, ms, this.inflectionalEnding)
    }

    getLemmata() {
        // this must be called after populateLemmata is called
        return this.lemmata
    }

    getInflectionalEnding() {
        if(this.inflectionalEnding) return this.inflectionalEnding.getLiteral()
        return ''
    }

    private assignInflectionalEnding(allomorph: Allomorph) {
        let inf: InflectionalEnding = new InflectionalEnding()
        // change allomorph to affix
        if(allomorph instanceof FreeAllomorph) {
            let fie = new FreeInflectionalEnding();
            fie.affix.tonal = allomorph.tonal;
            for(let key in freeAllomorphUncombiningRules.get(allomorph.getLiteral())) {
                let a = new TonalAffix();
                a.tonal = freeAllomorphUncombiningRules.get(allomorph.getLiteral())[key];
                fie.baseAffixes.push(a);
            }
            inf = fie;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cie = new CheckedInflectionalEnding();
            cie.affix.tonal = allomorph.tonal;
            inf = cie
        }
        // this word is already in base form, and its last syllable is checked tone
        return inf
    }
}

//------------------------------------------------------------------------------
//  Tonal Lexeme Maker
//------------------------------------------------------------------------------

export class TonalLemmatizationLexemeMaker extends LexemeMaker {
    morphemes: Array<TonalUncombiningMorpheme>;

    constructor(morphemes: Array<TonalUncombiningMorpheme>, ) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalLemmatizationLexeme(new TonalWord(syllables), this.morphemes, new TonalLemmatization());
    }

    postprocess(tl: TonalLemmatizationLexeme) {

        let lexemes: Array<TonalLemmatizationLexeme> = new Array();

        lexemes.push(tl);

        return lexemes
    }
}

