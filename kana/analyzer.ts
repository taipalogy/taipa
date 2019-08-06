import { GraphemeMaker } from '../grapheme'
import { KanaUncombiningMorphemeMaker, KanaUncombiningMorpheme } from './morpheme'
import { lowerLettersOfKana } from './kana'
import { Analyzer } from '../analyzer'
import { AlphabeticGrapheme } from '../grapheme'
import { KanaCombiningMetaplasm } from '../morpheme';

//------------------------------------------------------------------------------
//  Kana Analyxer
//------------------------------------------------------------------------------

export class KanaAnalyzer extends Analyzer {
    getGraphemicAnalysisResults(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfKana);
        return gm.makeGraphemes();
    }

    getMorphologicalAnalysisResults(str: string): KanaUncombiningMorpheme[]
    getMorphologicalAnalysisResults(gs: Array<AlphabeticGrapheme>): KanaUncombiningMorpheme[]
    getMorphologicalAnalysisResults(x: string | Array<AlphabeticGrapheme>) {
        let graphemes: Array<AlphabeticGrapheme> = []
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
            graphemes = this.getGraphemicAnalysisResults(x)
        }

        // Morpheme Maker
        let kimm = new KanaUncombiningMorphemeMaker(graphemes, new KanaCombiningMetaplasm());
        return kimm.makeInputingMorphemes();
    }
}
