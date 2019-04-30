import { TonalInputingMorphemeMaker, TonalSyllable, TonalInputingMorpheme} from './morpheme'
import { LexemeMaker } from '../lexeme'
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { Analyzer, Sound } from '../system'
import { lowerLettersOfTonal } from './version2';
import { NoSuccess, Success } from '../result'

//import { TonalLemmaLexeme } from '../lexeme'
import { Word, FreeInflectionalEnding, CheckedInflectionalEnding, InflectionalEnding, 
    InputingLexemeMaker } from '../lexeme'
import { freeAllomorphUncombiningRules } from './version2'
import { FreeAllomorph, CheckedAllomorph, Allomorph } from '../system'
import { TonalAffix } from '../morpheme'

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
//  Tonal Inputing Lexeme
//------------------------------------------------------------------------------

export class TonalInputingLexeme {
    word: TonalWord
    private inflectionalEnding: InflectionalEnding = null
    private lemmata: Array<TonalWord>

    constructor(word: TonalWord) {
        this.word = word;
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
        
        //console.debug(allomorph.tonal)
        //console.debug(this.inflectionalEnding.getLiteral())
    }

    getInflectionalEnding() {
        if(this.inflectionalEnding == null) return ''
        return this.inflectionalEnding.getLiteral()
    }

    getBaseForms() {
        // this must be called after populateLemmata is called
        if(this.lemmata == null) return []
        return this.lemmata 
    }
    
    private replaceLastSyllable(morphemes: Array<TonalInputingMorpheme>) {
        let word = new TonalWord(this.word.syllables);
        word.popSyllable();
        word.pushSyllable(morphemes[morphemes.length-1].getBaseForms()[0]);
        return word;
    }

    private getLemmas(morphemes: Array<TonalInputingMorpheme>): Array<TonalWord> {
        if(this.inflectionalEnding != null) {
            if(this.inflectionalEnding instanceof FreeInflectionalEnding) {
                if(this.inflectionalEnding.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(morphemes)];
                } else if(this.inflectionalEnding.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length-1].getBaseForms();
                    //console.log(arr)
                    for(let key in arr) {
                        let word = new TonalWord(this.word.syllables);
                        word.popSyllable();
                        word.pushSyllable(arr[key]);
                        ret.push(word);
                    }
                    return ret;
                }
            } else if(this.inflectionalEnding instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable(morphemes)];
            }
        }

        return [];
    }

    populateLemmata(morphemes: Array<TonalInputingMorpheme>) {
        this.lemmata = new Array();

        // turn morphemes into lemmas
        let lms = this.getLemmas(morphemes);
        //console.log(tmp.length)
        if(lms.length > 0) {
            for(let key in lms) {
                //console.log(bfs[key].literal)
                this.lemmata.push(lms[key]);
            }
        }

    }
}

//------------------------------------------------------------------------------
//  Tonal Inputing Lexeme Maker
//------------------------------------------------------------------------------

export class TonalInputingLexemeMaker extends InputingLexemeMaker {
    morphemes: Array<TonalInputingMorpheme>;

    constructor(morphemes: Array<TonalInputingMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeTonalLemmaLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalInputingLexeme(new TonalWord(syllables));
    }

    postprocess(tsil: TonalInputingLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // inflectional ending needs to be assigned to combined lexeme
                tsil.assignInflectionalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        // lemmata needs to be populated for combined lexeme
        tsil.populateLemmata(this.morphemes);

        let lexemes: Array<TonalInputingLexeme> = new Array();

        lexemes.push(tsil);

        return lexemes
    }
}

//------------------------------------------------------------------------------
//  Tonal Analyzer
//------------------------------------------------------------------------------

export class TonalAnalyzer extends Analyzer {
    arraysOfSounds: Array<Sound[]> = new Array()

    getDataOfGraphemicAnalysis(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    getDataOfMorphologicalAnalysis(str: string)
    getDataOfMorphologicalAnalysis(gs: Array<AlphabeticGrapheme>)
    getDataOfMorphologicalAnalysis(x) {
        let graphemes
        let g_data
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
             g_data = this.getDataOfGraphemicAnalysis(x)
             if(g_data.result instanceof NoSuccess) {
                 return g_data
             }
             graphemes = g_data.graphemes
        }

        // Morpheme Maker
        //let tsimm = new TonalCombinedMorphemeMaker(graphemes);
        let timm = new TonalInputingMorphemeMaker(graphemes);
        let m_data = timm.makeCombinedMorphemes();
        this.arraysOfSounds = m_data.arraysOfSounds
        return m_data
    }

    getDataOfLexicalAnalysis(str: string) {
        let m_data = this.getDataOfMorphologicalAnalysis(str)
        let morphemes
        if(m_data.result instanceof Success) {
            morphemes = m_data.morphemes
        } else morphemes = []

        //console.info(morphemes)
        // Lexeme Maker
        let tsilm = new TonalInputingLexemeMaker(morphemes);
        return tsilm.makeTonalLemmaLexemes();
    }
}
