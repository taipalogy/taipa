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
        let tmm = new TonalLemmatizationMorphemeMaker(graphemes, new TonalUncombiningForms());
        return tmm.makeMorphemes(); 
    }

    getLexicalAnalysisResults(str: string)
    getLexicalAnalysisResults(ms: Array<TonalLemmatizationMorpheme>)
    getLexicalAnalysisResults(x: string | Array<TonalLemmatizationMorpheme>) {
        let morphemes
        let m_results
        if(typeof x == "object") {
            morphemes = x
        } else if(typeof x == "string") {
            //m_results = this.getMorphologicalAnalysisResults(x)
            morphemes = this.getMorphologicalAnalysisResults(x)
            //if(m_results.result instanceof Success) {
            //    morphemes = m_results.morphemes
            //} else morphemes = []
        }

        // Lexeme Maker
        let tlm = new TonalLemmatizationLexemeMaker(morphemes);
        //let l_results = tlm.makeLexemes()
        let lexemes = tlm.makeLexemes()
        //return { lexemes: l_results.lexemes, lemmata: l_results.lemmata, inflectionalEnding: l_results.inflectionalEnding }
        return lexemes
    }
}
