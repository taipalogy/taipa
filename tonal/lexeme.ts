import { TonalSyllable, TonalMorpheme, TonalUncombiningForms } from './morpheme'
import { Word, LexemeMaker, Lexeme, Metaplasm } from '../lexeme'
import { freeAllomorphUncombiningRules } from './version2'
import { FreeAllomorph, CheckedAllomorph, Allomorph } from './version2'
import { TonalAffix } from './version2'

//------------------------------------------------------------------------------
//  Tonal Metaplasm
//------------------------------------------------------------------------------

export class TonalMetaplasm extends Metaplasm {
    apply(word: TonalWord, morphemes: Array<TonalMorpheme>) {}
}

class TonalAdverbLemmatizing extends TonalMetaplasm {}
class TonalPronounLemmatizing extends TonalMetaplasm {}
class TonalParticleLemmatizing extends TonalMetaplasm {}
export class TonalLemmatization extends TonalMetaplasm {
    word: TonalWord
    morphemes: Array<TonalMorpheme>
    inflectionalEnding: InflectionalEnding = null

    apply(word: TonalWord, morphemes: Array<TonalMorpheme>): { lemmata: Array<TonalWord>, inflectionalEnding: string } {
        this.word = word
        this.morphemes = morphemes
        //let ie: InflectionalEnding = null
        if(morphemes.length > 0) {
            if(morphemes[morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to combined lexeme
                this.inflectionalEnding = this.assignInflectionalEnding(morphemes[morphemes.length-1].allomorph);
            }
        }
        
        return { inflectionalEnding: this.getInflectionalEnding(), lemmata: this.getLemmata(this.populateLemmata()) }
    }

    getInflectionalEnding() {
        if(this.inflectionalEnding == null) return ''
        return this.inflectionalEnding.getLiteral()
    }

    getLemmata(lemmas: Array<TonalWord>) {
        // this must be called after populateLemmata is called
        if(lemmas == null) return []
        return lemmas
    }

    private assignInflectionalEnding(allomorph: Allomorph) {
        let ie: InflectionalEnding = null
        // change allomorph to affix
        if(allomorph instanceof FreeAllomorph) {
            let fie = new FreeInflectionalEnding();
            fie.affix.tonal = allomorph.tonal;
            for(let key in freeAllomorphUncombiningRules.get(allomorph.getLiteral())) {
                let a = new TonalAffix();
                a.tonal = freeAllomorphUncombiningRules.get(allomorph.getLiteral())[key];
                fie.baseAffixes.push(a);
            }
            ie = fie;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cie = new CheckedInflectionalEnding();
            cie.affix.tonal = allomorph.tonal;
            ie = cie;
        }
        // when there is no inflectinal ending assigned, this word is already in base form
        // and its last syllable is checked tone
        
        return ie
    }

    private replaceLastSyllable() {
        let wd = new TonalWord(this.word.syllables);
        wd.popSyllable();
        wd.pushSyllable(this.morphemes[this.morphemes.length-1].apply()[0])
        return wd;
    }

    private getLemmas(): Array<TonalWord> {
        if(this.inflectionalEnding != null) {
            if(this.inflectionalEnding instanceof FreeInflectionalEnding) {
                if(this.inflectionalEnding.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable()];
                } else if(this.inflectionalEnding.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = this.morphemes[this.morphemes.length-1].apply()
                    //console.log(arr)
                    for(let key in arr) {
                        let wd = new TonalWord(this.word.syllables);
                        wd.popSyllable();
                        wd.pushSyllable(arr[key]);
                        ret.push(wd);
                    }
                    return ret;
                }
            } else if(this.inflectionalEnding instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable()];
            }
        }

        return [];
    }

    private populateLemmata() {
        let lemmata: Array<TonalWord> = new Array();

        // turn morphemes into lemmas
        let lms = this.getLemmas();
        //console.log(tmp.length)
        if(lms.length > 0) {
            for(let key in lms) {
                //console.log(lms[key].literal)
                lemmata.push(lms[key]);
            }
        }
        //for(let k of lemmata) console.log(k.literal)
        return lemmata
    }
}

//------------------------------------------------------------------------------
//  Inflectional Ending
//------------------------------------------------------------------------------

class Ending {}

export class InflectionalEnding extends Ending {
    affix: TonalAffix = null;
    getLiteral() {
        return this.affix.getLiteral()
    }
}

export class FreeInflectionalEnding extends InflectionalEnding {
    affix = new TonalAffix();
    baseAffixes: Array<TonalAffix> = new Array();
}

export class CheckedInflectionalEnding extends InflectionalEnding {
    affix = new TonalAffix();
}

export class TonalSymbolEnding extends Ending {
    allomorph: Allomorph = null
    getLiteral() {
        return this.allomorph.getLiteral()
    }
}

export class FreeTonalEnding extends TonalSymbolEnding {
    allomorph = null
    //sandhiAllomorph: Allomorph = new Allomorph()
}

export class CheckedTonalEnding extends TonalSymbolEnding {
    allomorph = null
}

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

export class TonalLexeme extends Lexeme {
    word: TonalWord

    constructor(word: TonalWord) {
        super()
        this.word = word;
    }

    apply(ms: Array<TonalMorpheme>, tm: TonalMetaplasm): any {
        return tm.apply(this.word, ms)
    }
}

//------------------------------------------------------------------------------
//  Tonal Lexeme Maker
//------------------------------------------------------------------------------

export class TonalLemmatizationLexemeMaker extends LexemeMaker {
    morphemes: Array<TonalMorpheme>;

    constructor(morphemes: Array<TonalMorpheme>, ) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalLexeme(new TonalWord(syllables));
    }

    postprocess(tl: TonalLexeme) {
        let applied = tl.apply(this.morphemes, new TonalLemmatization())

        let lexemes: Array<TonalLexeme> = new Array();

        lexemes.push(tl);

        return { lexemes: lexemes, lemmata: applied.lemmata, inflectionalEnding: applied.inflectionalEnding }
    }
}

