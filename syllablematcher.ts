
import { AlphabeticLetter } from './metadata'
import { Syllables } from './syllable'

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------
/*
export class MorphologicalAnalyzerRegex {
    nonNasalInitialLettersRegexp: RegExp;
    nasalInitialLettersRegexp: RegExp;
    medialLettersRegexp: RegExp;
    nasalLettersRegexp: RegExp;
    neutralFinalLettersRegexp: RegExp;
    checkedFinalLettersRegexp: RegExp;
    freeToneMarkLettersRegexp: RegExp;
    checkedToneMarkLettersRegexp: RegExp;
    neutralToneMarkLettersRegexp: RegExp;
*/

//------------------------------------------------------------------------------
//  ToneSandhiMorphologicalAnalyzer
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
  