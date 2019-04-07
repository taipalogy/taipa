import { GraphemeMaker } from '../graphememaker'
import { KanaInputingMorphemeMaker } from './morpheme'
import { lowerLettersOfKana } from './kana'
import { Turner } from '../system'
import { AlphabeticGrapheme } from '../grapheme'

//------------------------------------------------------------------------------
//  Kana Turner
//------------------------------------------------------------------------------

export class KanaTurner extends Turner {
    turnIntoGraphemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfKana);
        return gm.makeGraphemes();
    }

    turnIntoMorphemes(str: string) {
        let output = this.turnIntoGraphemes(str)
        let graphemes = output.graphemes

        // Morpheme Maker
        let kimm = new KanaInputingMorphemeMaker(graphemes);
        return kimm.makeInputingMorphemes();
    }

    test() {}

    getMorphologicalAnalyzingResults(str: string)
    getMorphologicalAnalyzingResults(gs: Array<AlphabeticGrapheme>)
    getMorphologicalAnalyzingResults(x) {
        let graphemes
        let output
        if(typeof x == "object") {
            graphemes = x
        } else if(typeof x == 'string') {
             output = this.turnIntoGraphemes(x)
             graphemes = output.graphemes
        }

        // Morpheme Maker
        let kimm = new KanaInputingMorphemeMaker(graphemes);
        let results = kimm.makeInputingMorphemes();
        return results
    }
}
