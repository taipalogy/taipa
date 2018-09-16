
import { AlphabeticGrapheme } from './grapheme'
import { Syllables } from './morpheme'


//------------------------------------------------------------------------------
//  ToneSandhiSyllableMatcher
//------------------------------------------------------------------------------

export class ToneSandhiMorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    constructor(graphemes: Array<AlphabeticGrapheme>) {
        this.graphemes = new Array();
        this.graphemes = graphemes;
    }

    makeMorpheme() {
        let ss = new Syllables();
        let morphemes = ss.process(this.graphemes);
        return morphemes;
    }
}
  