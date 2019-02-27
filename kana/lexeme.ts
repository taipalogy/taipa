import { Word } from '../lexeme'
import { GraphemeMaker } from '../graphememaker'
import { InputingLexemeMaker } from '../lexememaker'
import { KanaSyllable } from './morpheme'
import { AlphabeticGrapheme } from '../grapheme';

//------------------------------------------------------------------------------
//  Kana Word
//------------------------------------------------------------------------------

export class KanaWord extends Word {
    syllables: Array<KanaSyllable>;
}

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
        let gm = new GraphemeMaker(str);
        return gm.makeGraphemes();
    }
/*
    turnIntoMorphemes(str: string) {
        let graphemes = this.turnIntoGraphemes(str)

        // Morpheme Maker
        let tsmm = new KanaInputingMorphemeMaker(graphemes);
        return tsmm.makeInputingMorphemes();
    }

    turnIntoLexemes(str: string) {

        let morphemes = this.turnIntoMorphemes(str)

        // Lexeme Maker
        let tslm = new KanaInputingLexemeMaker(morphemes);
        return tslm.makeInputingLexemes();
    }
    */
}
