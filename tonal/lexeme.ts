import { TonalSyllable, TonalLemmatizationMorpheme } from './morpheme'
import { Word, LexemeMaker, Metaplasm, LemmatizationLexeme, TonalInflectingMetaplasm } from '../lexeme'
import { freeAllomorphUncombiningRules } from './version2'
import { FreeAllomorph, CheckedAllomorph, Allomorph } from './version2'
import { TonalAffix } from './version2'
import { Morpheme } from '../morpheme'

//------------------------------------------------------------------------------
//  Tonal Metaplasm
//------------------------------------------------------------------------------

class TonalAdverbLemmatization extends TonalInflectingMetaplasm {}
class TonalPronounLemmatization extends TonalInflectingMetaplasm {}
class TonalParticleLemmatization extends TonalInflectingMetaplasm {}
class TonalZeroLemmatization extends TonalInflectingMetaplasm {}
export class TonalLemmatization extends TonalInflectingMetaplasm {
    assignLemmata(word: TonalWord, morphemes: Array<TonalLemmatizationMorpheme>, inflectionalEnding: InflectionalEnding) {
/*
        let inflectionalEnding: InflectionalEnding = null
        if(morphemes.length > 0) {
            if(morphemes[morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to combined lexeme
                inflectionalEnding = this.assignInflectionalEnding(morphemes[morphemes.length-1].allomorph);
            }
        }
*/        
        return  this.populateLemmata(word, morphemes, inflectionalEnding)
    }
/*
    private getInflectionalEnding(inflectionalEnding: InflectionalEnding) {
        if(inflectionalEnding == null) return ''
        return inflectionalEnding.getLiteral()
    }
*/
/*
    private getLemmata(lemmas: Array<TonalWord>) {
        // this must be called after populateLemmata is called
        if(lemmas == null) return []
        return lemmas
    }
    */
/*
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
*/
    private replaceLastSyllable(word: TonalWord, morphemes: Array<TonalLemmatizationMorpheme>) {
        let wd = new TonalWord(word.syllables);
        wd.popSyllable();
        wd.pushSyllable(morphemes[morphemes.length-1].apply()[0])
        return wd;
    }

    private getLemmas(word: TonalWord, morphemes: Array<TonalLemmatizationMorpheme>, inflectionalEnding: InflectionalEnding): Array<TonalWord> {
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

    private populateLemmata(word: TonalWord, morphemes: Array<TonalLemmatizationMorpheme>, inflectionalEnding: InflectionalEnding) {
        let lemmata: Array<TonalWord> = new Array();

        // turn morphemes into lemmas
        let lms = this.getLemmas(word, morphemes, inflectionalEnding);
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

export class TonalLemmatizationLexeme extends LemmatizationLexeme {
    word: TonalWord
    lemmata: Array<TonalWord>
    inflectionalEnding: InflectionalEnding
    metaplasm

    constructor(word: TonalWord) {
        super()
        this.word = word;
    }

    assignLemmata(ms: Array<TonalLemmatizationMorpheme>, tm: TonalLemmatization): any {
        this.lemmata = tm.assignLemmata(this.word, ms, this.inflectionalEnding)
    }

    getLemmata() {
        // this must be called after populateLemmata is called
        if(this.lemmata == null) return []
        return this.lemmata
    }

    getInflectionalEnding() {
        if(this.inflectionalEnding == null) return ''
        return this.inflectionalEnding.getLiteral()
    }

    assignInflectionalEnding(allomorph: Allomorph) {
        // change allomorph to affix
        if(allomorph instanceof FreeAllomorph) {
            let fie = new FreeInflectionalEnding();
            fie.affix.tonal = allomorph.tonal;
            for(let key in freeAllomorphUncombiningRules.get(allomorph.getLiteral())) {
                let a = new TonalAffix();
                a.tonal = freeAllomorphUncombiningRules.get(allomorph.getLiteral())[key];
                fie.baseAffixes.push(a);
            }
            this.inflectionalEnding = fie;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cie = new CheckedInflectionalEnding();
            cie.affix.tonal = allomorph.tonal;
            this.inflectionalEnding = cie;
        }
        // when there is no inflectinal ending assigned, this word is already in base form
        // and its last syllable is checked tone
    }
}

//------------------------------------------------------------------------------
//  Tonal Lexeme Maker
//------------------------------------------------------------------------------

export class TonalLemmatizationLexemeMaker extends LexemeMaker {
    morphemes: Array<TonalLemmatizationMorpheme>;

    constructor(morphemes: Array<TonalLemmatizationMorpheme>, ) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalLemmatizationLexeme(new TonalWord(syllables));
    }

    postprocess(tl: TonalLemmatizationLexeme) {
        let inflectionalEnding: InflectionalEnding = null
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to combined lexeme
                tl.assignInflectionalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        tl.assignLemmata(this.morphemes, new TonalLemmatization())

        let lexemes: Array<TonalLemmatizationLexeme> = new Array();

        lexemes.push(tl);

        //return { lexemes: lexemes, lemmata: applied.lemmata, inflectionalEnding: applied.inflectionalEnding }
        return lexemes
    }
}

