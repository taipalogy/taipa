
import { AlphabeticGrpheme } from './grapheme'
import { Syllables } from './morpheme'


//------------------------------------------------------------------------------
//  ToneSandhiSyllableMatcher
//------------------------------------------------------------------------------

export class ToneSandhiSyllableWrapper {
    graphemes: Array<AlphabeticGrpheme>;
    constructor(graphemes: Array<AlphabeticGrpheme>) {
        this.graphemes = new Array();
        this.graphemes = graphemes;
    }

    transform() {
        let ss = new Syllables();
        let graphemes = ss.match(this.graphemes);
        return graphemes;
    }
}
  