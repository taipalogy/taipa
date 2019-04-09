import { AlphabeticGrapheme } from '../grapheme'
import { Syllable, ToneSandhiSyllable } from '../morpheme'
import { MorphemeMaker } from '../morphememaker'
import { RomanizedKana } from './kana'

//------------------------------------------------------------------------------
//  Kana Syllable
//------------------------------------------------------------------------------

export class KanaSyllable  extends Syllable {}

//------------------------------------------------------------------------------
//  Kana Inputing Morpheme
//------------------------------------------------------------------------------

export class KanaLemmaMorpheme {
    syllable: Syllable;

    constructor(syllable: Syllable) {
        this.syllable = syllable;
    }
}

//------------------------------------------------------------------------------
//  Kana Morpheme Maker
//------------------------------------------------------------------------------

export class KanaLemmaMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    
    constructor(gs: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
    }

    create(syllable: Syllable) { return new KanaLemmaMorpheme(syllable) }

    createArray() { return new Array<KanaLemmaMorpheme>() }

    makeInputingMorphemes() {
        return this.make(this.preprocess(), new RomanizedKana());
    }
}
