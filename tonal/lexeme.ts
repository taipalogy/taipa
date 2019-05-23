import { TonalInputingMorphemeMaker, TonalSyllable, TonalInputingMorpheme} from './morpheme'
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { Sound } from '../grapheme'
import { Analyzer } from '../analyzer'
import { lowerLettersOfTonal } from './version2';
import { NoSuccess, Success } from '../result'

import { Word, LexemeMaker, Lexeme, Metaplasm } from '../lexeme'
import { freeAllomorphUncombiningRules } from './version2'
import { FreeAllomorph, CheckedAllomorph, Allomorph } from './version2'
import { TonalAffix } from './version2'

//------------------------------------------------------------------------------
//  Tonal Metaplasm
//------------------------------------------------------------------------------

class TonalMetaplasm extends Metaplasm {
    apply(word: TonalWord, morphemes: Array<TonalInputingMorpheme>) {}
}

class TonalCaseDeclension extends TonalMetaplasm {}
class TonalAdverbialInflexion extends TonalMetaplasm {}
class TonalParticleInflexion extends TonalMetaplasm {}

class TonalInflexion extends TonalMetaplasm {}
class TonalLemmatization extends TonalMetaplasm {

    apply(word: TonalWord, morphemes: Array<TonalInputingMorpheme>): { lemmata: Array<TonalWord>, inflectionalEnding: string } {
        let ie: InflectionalEnding = null
        if(morphemes.length > 0) {
            if(morphemes[morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to combined lexeme
                ie = this.assignInflectionalEnding(morphemes[morphemes.length-1].allomorph);
            }
        }
        
        return { inflectionalEnding: this.getInflectionalEnding(ie), lemmata: this.getBaseForms(this.populateLemmata(word, morphemes, ie)) }
    }

    getInflectionalEnding(ie: InflectionalEnding) {
        if(ie == null) return ''
        return ie.getLiteral()
    }

    getBaseForms(lemmas: Array<TonalWord>) {
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

    private replaceLastSyllable(word: TonalWord, morphemes: Array<TonalInputingMorpheme>) {
        let wd = new TonalWord(word.syllables);
        wd.popSyllable();
        wd.pushSyllable(morphemes[morphemes.length-1].getBaseForms()[0]);
        return wd;
    }

    private getLemmas(word: TonalWord, morphemes: Array<TonalInputingMorpheme>, ie: InflectionalEnding): Array<TonalWord> {
        if(ie != null) {
            if(ie instanceof FreeInflectionalEnding) {
                if(ie.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(word, morphemes)];
                } else if(ie.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length-1].getBaseForms();
                    //console.log(arr)
                    for(let key in arr) {
                        let wd = new TonalWord(word.syllables);
                        wd.popSyllable();
                        wd.pushSyllable(arr[key]);
                        ret.push(wd);
                    }
                    return ret;
                }
            } else if(ie instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable(word, morphemes)];
            }
        }

        return [];
    }

    private populateLemmata(word: TonalWord, morphemes: Array<TonalInputingMorpheme>, ie: InflectionalEnding) {
        let lemmata: Array<TonalWord> = new Array();

        // turn morphemes into lemmas
        let lms = this.getLemmas(word, morphemes, ie);
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
    //private inflectionalEnding: InflectionalEnding = null
    //private lemmata: Array<TonalWord>
    metaplasm: TonalMetaplasm

    constructor(word: TonalWord) {
        super()
        this.word = word;
    }

    apply(ms: Array<TonalInputingMorpheme>): any {
        this.metaplasm = new TonalLemmatization()
        return this.metaplasm.apply(this.word, ms)
    }

}

//------------------------------------------------------------------------------
//  Tonal Lexeme Maker
//------------------------------------------------------------------------------

export class TonalLexemeMaker extends LexemeMaker {
    morphemes: Array<TonalInputingMorpheme>;

    constructor(morphemes: Array<TonalInputingMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeTonalLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalLexeme(new TonalWord(syllables));
    }

    postprocess(tsil: TonalLexeme) {
        let applied = tsil.apply(this.morphemes)

        let lexemes: Array<TonalLexeme> = new Array();

        lexemes.push(tsil);

        return { lexemes: lexemes, lemmata: applied.lemmata, inflectionalEnding: applied.inflectionalEnding }
    }
}

//------------------------------------------------------------------------------
//  Tonal Analyzer
//------------------------------------------------------------------------------

export class TonalAnalyzer extends Analyzer {
    getDataOfGraphemicAnalysis(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    getDataOfMorphologicalAnalysis(str: string)
    getDataOfMorphologicalAnalysis(gs: Array<AlphabeticGrapheme>)
    getDataOfMorphologicalAnalysis(x) {
        let graphemes
        let g_results
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
             g_results = this.getDataOfGraphemicAnalysis(x)
             if(g_results.result instanceof NoSuccess) {
                 return g_results
             }
             graphemes = g_results.graphemes
        }

        // Morpheme Maker
        let timm = new TonalInputingMorphemeMaker(graphemes);
        return timm.makeCombinedMorphemes(); 
    }

    getDataOfLexicalAnalysis(str: string) {
        let m_results = this.getDataOfMorphologicalAnalysis(str)
        let morphemes
        if(m_results.result instanceof Success) {
            morphemes = m_results.morphemes
        } else morphemes = []

        // Lexeme Maker
        let tlm = new TonalLexemeMaker(morphemes);
        let l_results = tlm.makeTonalLexemes()
        return { lexemes: l_results.lexemes, lemmata: l_results.lemmata, inflectionalEnding: l_results.inflectionalEnding, arraysOfSounds: m_results.arraysOfSounds }
    }
}
