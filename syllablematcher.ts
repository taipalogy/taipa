
import { AlphabeticLetter } from './metadata'
import { Syllables } from './syllable'


//------------------------------------------------------------------------------
//  ToneSandhiSyllableMatcher
//------------------------------------------------------------------------------

export class ToneSandhiSyllableMatcher {
    letters: Array<AlphabeticLetter>;

    constructor(letters: Array<AlphabeticLetter>) {
        this.letters = new Array();
        this.letters = letters;
    }

    match() {
        let ss = new Syllables();
        console.log(this.letters);
        let syllables = ss.match(this.letters);
        console.log(syllables);
        console.log(syllables[0].literal);
        return syllables;
    }
}
  