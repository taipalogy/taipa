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
    doGraphemicAnalysis(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfKana);
        return gm.makeGraphemes();
    }

    doMorphologicalAnalysis(str: string): KanaUncombiningMorpheme[]
    doMorphologicalAnalysis(gs: Array<AlphabeticGrapheme>): KanaUncombiningMorpheme[]
    doMorphologicalAnalysis(x: string | Array<AlphabeticGrapheme>) {
        let graphemes: Array<AlphabeticGrapheme> = []
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
            graphemes = this.doGraphemicAnalysis(x)
        }

        // Morpheme Maker
        let kimm = new KanaUncombiningMorphemeMaker(graphemes, new KanaCombiningMetaplasm());
        return kimm.makeInputingMorphemes();
    }
}
