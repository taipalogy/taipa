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
        let graphemes = this.turnIntoGraphemes(str)

        // Morpheme Maker
        let kimm = new KanaInputingMorphemeMaker(graphemes);
        return kimm.makeInputingMorphemes();
    }
}
