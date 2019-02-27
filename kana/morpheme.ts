import { AlphabeticLetter, AlphabeticGrapheme } from '../grapheme'
import { Syllable } from '../morpheme'
import { MorphemeMaker } from '../morphememaker'

//------------------------------------------------------------------------------
//  Kana Syllable
//------------------------------------------------------------------------------

export class KanaSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;
}

//------------------------------------------------------------------------------
//  Kana Inputing Morpheme
//------------------------------------------------------------------------------

export class KanaInputingMorpheme {}

//------------------------------------------------------------------------------
//  Kana Morpheme Maker
//------------------------------------------------------------------------------
/*
export class KanaInputingMorphemeMaker extends MorphemeMaker {

}
*/