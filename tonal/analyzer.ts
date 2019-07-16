import { Analyzer } from '../analyzer'
import { TonalLemmatizationLexemeMaker } from './lexeme'
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme'
import { lowerLettersOfTonal } from './version2';
import { TonalUncombiningMorphemeMaker, TonalUncombiningForms, TonalUncombiningMorpheme } from './morpheme'

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
        let tmm = new TonalUncombiningMorphemeMaker(graphemes, new TonalUncombiningForms());
        return tmm.makeMorphemes(); 
    }

    getLexicalAnalysisResults(str: string)
    getLexicalAnalysisResults(ms: Array<TonalUncombiningMorpheme>)
    getLexicalAnalysisResults(x: string | Array<TonalUncombiningMorpheme>) {
        let morphemes: Array<TonalUncombiningMorpheme> = []
        if(typeof x == "object") {
            morphemes = x
        } else if(typeof x == "string") {
            morphemes = this.getMorphologicalAnalysisResults(x)
        }

        // Lexeme Maker
        let tllm = new TonalLemmatizationLexemeMaker(morphemes);
        return tllm.makeLexemes()
    }
}
