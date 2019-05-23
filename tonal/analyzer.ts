import { Analyzer } from '../analyzer'
import { TonalLexemeMaker } from './lexeme'
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { lowerLettersOfTonal } from './version2';
import { NoSuccess, Success } from '../result'
import { TonalMorphemeMaker } from './morpheme'

//------------------------------------------------------------------------------
//  Tonal Analyzer
//------------------------------------------------------------------------------

export class TonalAnalyzer extends Analyzer {
    getGraphemicAnalysisResults(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    getMorphologicalAnalysisResults(str: string)
    getMorphologicalAnalysisResults(gs: Array<AlphabeticGrapheme>)
    getMorphologicalAnalysisResults(x) {
        let graphemes
        let g_results
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
             g_results = this.getGraphemicAnalysisResults(x)
             if(g_results.result instanceof NoSuccess) {
                 return g_results
             }
             graphemes = g_results.graphemes
        }

        // Morpheme Maker
        let timm = new TonalMorphemeMaker(graphemes);
        return timm.makeCombinedMorphemes(); 
    }

    getLexicalAnalysisResults(str: string) {
        let m_results = this.getMorphologicalAnalysisResults(str)
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
