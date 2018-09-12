
import { AlphabeticGrpheme } from './grapheme'
import { Syllables } from './morpheme'


//------------------------------------------------------------------------------
//  ToneSandhiSyllableMatcher
//------------------------------------------------------------------------------

export class ToneSandhiMorphemeMaker {
    graphemes: Array<AlphabeticGrpheme>;
    constructor(graphemes: Array<AlphabeticGrpheme>) {
        this.graphemes = new Array();
        this.graphemes = graphemes;
    }

    makeMorpheme() {
        let ss = new Syllables();
        let morphemes = ss.match(this.graphemes);
        return morphemes;
    }
}
  