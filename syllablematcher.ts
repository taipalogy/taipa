
import { Sound } from './grapheme'
import { Syllables } from './morpheme'


//------------------------------------------------------------------------------
//  ToneSandhiSyllableMatcher
//------------------------------------------------------------------------------

export class ToneSandhiSyllableMatcher {
    //letters: Array<AlphabeticLetter>;
    sounds: Array<Sound>;
/*
    constructor(letters: Array<AlphabeticLetter>) {
        this.letters = new Array();
        this.letters = letters;
    }
*/
    constructor(sounds: Array<Sound>) {
        this.sounds = new Array();
        this.sounds = sounds;
    }

    match() {
        let ss = new Syllables();
        //console.log(this.letters);
        console.log(this.sounds);
        //let syllables = ss.match(this.letters);
        let lexicalAffixes = ss.match(this.sounds);
        //console.log(syllables);
        console.log(lexicalAffixes);
        //console.log(syllables[0].literal);
        //return syllables;
        return lexicalAffixes;
    }
}
  