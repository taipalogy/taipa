import { Word } from '../lexeme'
import { GraphemeMaker } from '../graphememaker'
import { InputingLexemeMaker } from '../lexememaker'
import { ToneSandhiSyllable } from '../morpheme'
import { AlphabeticGrapheme } from '../grapheme';
import { KanaInputingMorphemeMaker } from './morpheme'
import { lowerLettersOfKana } from './kana'

//------------------------------------------------------------------------------
//  Kana Word
//------------------------------------------------------------------------------
/*
export class KanaWord extends Word {
    syllables: Array<ToneSandhiSyllable>;
}
*/
//------------------------------------------------------------------------------
//  Kana Inputing Lexeme
//------------------------------------------------------------------------------
/*
export class KanaInputingLexeme {
}
*/
//------------------------------------------------------------------------------
//  Kana Lexeme Maker
//------------------------------------------------------------------------------
/*
export class KanaInputingLexemeMaker extends InputingLexemeMaker {
    constructor(morphemes: Array<ToneSandhiInputingMorpheme>) {
        super()
    }

    makeInputingLexemes() {
    }
}
*/
//------------------------------------------------------------------------------
//  Kana Turner
//------------------------------------------------------------------------------

export class KanaTurner {
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
/*
    turnIntoLexemes(str: string) {

        let morphemes = this.turnIntoMorphemes(str)

        // Lexeme Maker
        let kilm = new KanaInputingLexemeMaker(morphemes);
        return kilm.makeInputingLexemes();
    }
    */
}
