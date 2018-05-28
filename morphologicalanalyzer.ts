
import { AlphabeticLetter, Letters, Characters } from './metadata';
import { State } from './lexicalanalyzer';
import { Context } from "./context";
import { Character } from './metadata';
import { Syllable, ToneSandhiSyllable, Syllables } from './syllables';

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

export class ToneSandhiMorphologicalAnalyzer {
    letters: Array<AlphabeticLetter>;

    constructor(letters: Array<AlphabeticLetter>) {
        this.letters = new Array();
        this.letters = letters;
    }

    analyze() {
        let ss = new Syllables();
        console.log(this.letters);
        let syllables = ss.match(this.letters);
        console.log(syllables);
        console.log(syllables[0].literal);
        return syllables;
    }
}
  