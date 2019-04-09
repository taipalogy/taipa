import { GraphemeMaker } from '../graphememaker'
import { KanaLemmaMorphemeMaker } from './morpheme'
import { lowerLettersOfKana } from './kana'
import { Analyser } from '../system'
import { AlphabeticGrapheme } from '../grapheme'
import { NoSuccess, Success } from '../result';

//------------------------------------------------------------------------------
//  Kana Turner
//------------------------------------------------------------------------------

export class KanaAnalyser extends Analyser {
    getDataOfGraphemicAnalysis(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfKana);
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
             if(g_data instanceof NoSuccess) {
                return g_data
            }
            graphemes = g_data.graphemes
        }

        // Morpheme Maker
        let kimm = new KanaLemmaMorphemeMaker(graphemes);
        let m_results = kimm.makeInputingMorphemes();
        return m_results
    }

    getDataOfLexicalAnalysis(str: string) {}
}
