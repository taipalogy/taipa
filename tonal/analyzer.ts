import { Analyzer } from '../analyzer'
import { TonalLemmatizationLexemeMaker } from './lexeme'
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { lowerLettersOfTonal } from './version2';
import { NoSuccess, Success } from '../result'
import { TonalLemmatizationMorphemeMaker, TonalUncombiningForms, TonalLemmatizationMorpheme } from './morpheme'

//------------------------------------------------------------------------------
//  Tonal Analyzer
//------------------------------------------------------------------------------

export class TonalLemmatizationAnalyzer extends Analyzer {
    getGraphemicAnalysisResults(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    getMorphologicalAnalysisResults(str: string)
    getMorphologicalAnalysisResults(gs: Array<AlphabeticGrapheme>)
    getMorphologicalAnalysisResults(x: string | Array<AlphabeticGrapheme>) {
        let graphemes: AlphabeticGrapheme[] = []
        //let g_results
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
             graphemes = this.getGraphemicAnalysisResults(x)
        }

        // Morpheme Maker
        let tmm = new TonalLemmatizationMorphemeMaker(graphemes, new TonalUncombiningForms());
        return tmm.makeMorphemes(); 
    }

    getLexicalAnalysisResults(str: string)
    getLexicalAnalysisResults(ms: Array<TonalLemmatizationMorpheme>)
    getLexicalAnalysisResults(x: string | Array<TonalLemmatizationMorpheme>) {
        let morphemes: Array<TonalLemmatizationMorpheme> = []
        if(typeof x == "object") {
            morphemes = x
        } else if(typeof x == "string") {
            morphemes = this.getMorphologicalAnalysisResults(x)
        }

        // Lexeme Maker
        let tlm = new TonalLemmatizationLexemeMaker(morphemes);
        let lexemes = tlm.makeLexemes()
        return lexemes
    }
}
