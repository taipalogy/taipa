import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme'
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningForms, TonalCombiningMorpheme } from './morpheme'
import { lowerLettersOfTonal } from '../tonal/version2'
import { TonalInflexionLexemeMaker, TonalInflexionLexeme } from './lexeme'
import { TonalInflectingMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';

//------------------------------------------------------------------------------
//  Tonal Lexeme Analyzer
//------------------------------------------------------------------------------

export class TonalInflextionAnalyzer extends Analyzer {
    getGraphemicAnalysisResults(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    getMorphologicalAnalysisResults(str: string, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[]
    getMorphologicalAnalysisResults(gs: Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[]
    getMorphologicalAnalysisResults(x: string | Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm) {
        let graphemes: AlphabeticGrapheme[] = []
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
             graphemes = this.getGraphemicAnalysisResults(x)
        }

        // Morpheme Maker
        let tmm = new TonalCombiningMorphemeMaker(graphemes, tcm);
        return tmm.makeMorphemes(); 
    }

    getLexicalAnalysisResults(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm): TonalInflexionLexeme[]
    getLexicalAnalysisResults(x: string | Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm) {
        let morphemes: Array<TonalCombiningMorpheme> = []
        if(typeof x == "object") {
            morphemes = x
        }

        // Lexeme Maker
        let tllm = new TonalInflexionLexemeMaker(morphemes, tim);
        return tllm.makeLexemes()
    }
}
