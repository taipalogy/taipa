import { Lexicon, lexicon } from './lexicon';
import { Operand } from './expression';
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
    //sc: StateContext;

    constructor(letters: Array<AlphabeticLetter>) {
        this.letters = new Array();
        this.letters = letters;
        //this.sc = new StateContext();
        //this.sc.letters = letters;
    }

    analyze() {
        //this.sc.analyze();
        let ss = new Syllables(new Letters(new Characters()));
        console.log(this.letters);
        let syllables = ss.match(this.letters);
        //console.log(this.sc.syllables);
        //return this.sc.syllables;
        console.log(syllables);
        return syllables;
    }
}
  