
import { AlphabeticGrpheme } from './grapheme'
import { Syllables } from './morpheme'


//------------------------------------------------------------------------------
//  ToneSandhiSyllableMatcher
//------------------------------------------------------------------------------

export class ToneSandhiSyllableTransformer {
    //letters: Array<AlphabeticLetter>;
    graphemes: Array<AlphabeticGrpheme>;
/*
    constructor(letters: Array<AlphabeticLetter>) {
        this.letters = new Array();
        this.letters = letters;
    }
*/
    constructor(graphemes: Array<AlphabeticGrpheme>) {
        this.graphemes = new Array();
        this.graphemes = graphemes;
    }

    transform() {
        let ss = new Syllables();
        //console.log(this.letters);
        console.log(this.graphemes);
        //let syllables = ss.match(this.letters);
        let graphemes = ss.match(this.graphemes);
        //console.log(syllables);
        console.log(graphemes);
        //console.log(syllables[0].literal);
        //return syllables;
        return graphemes;
    }
}
  