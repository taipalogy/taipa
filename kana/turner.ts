import { GraphemeMaker } from '../graphememaker'
import { KanaInputingMorphemeMaker } from './morpheme'
import { lowerLettersOfKana } from './kana'
import { Turner } from '../system'

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
}
