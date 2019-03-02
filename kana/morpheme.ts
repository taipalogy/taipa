import { AlphabeticLetter, AlphabeticGrapheme } from '../grapheme'
import { Syllable, ToneSandhiSyllable } from '../morpheme'
import { MorphemeMaker } from '../morphememaker'
import { ListOfLexicalRoots } from '../lexicalroot';
import { RomanizedKana } from './kana'

//------------------------------------------------------------------------------
//  Kana Syllable
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Kana Inputing Morpheme
//------------------------------------------------------------------------------

export class KanaInputingMorpheme {
    syllable: ToneSandhiSyllable;

    constructor(syllable: ToneSandhiSyllable) {
        this.syllable = syllable;
    }
}

//------------------------------------------------------------------------------
//  Kana Morpheme Maker
//------------------------------------------------------------------------------

export class KanaInputingMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    
    constructor(gs: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
    }

    create(syllable: ToneSandhiSyllable) { return new KanaInputingMorpheme(syllable) }

    createArray() { return new Array<KanaInputingMorpheme>() }

    makeInputingMorphemes() {
        return this.make(this.preprocess(), new RomanizedKana());
    }
}
