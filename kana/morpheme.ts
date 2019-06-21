import { AlphabeticGrapheme } from '../grapheme'
import { Syllable, MatchedPattern } from '../morpheme'
import { MorphemeMaker } from '../morpheme'
import { RomanizedKana, SetOfInitialConsonants, SetOfVowels } from './kana'
import { Syllabary } from '../morpheme'
import { AlphabeticLetter } from '../grapheme'

//------------------------------------------------------------------------------
//  Kana Syllable
//------------------------------------------------------------------------------

export class KanaSyllable extends Syllable {}

//------------------------------------------------------------------------------
//  Kana Inputing Morpheme
//------------------------------------------------------------------------------

export class KanaLemmatizationMorpheme {
    syllable: KanaSyllable;

    constructor(syllable: KanaSyllable) {
        this.syllable = syllable;
    }
}

//------------------------------------------------------------------------------
//  syllabifyKana
//------------------------------------------------------------------------------

function syllabifyKana(letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) {
    syllabary.setFirstLetter(letters[beginOfSyllable].literal)
    let arraysOfLetters: Array<AlphabeticLetter[]> = new Array()

    for(let m in syllabary.list) {
        let min = Math.min(letters.length-beginOfSyllable, syllabary.list[m].length);
        if(syllabary.list[m].length == min) {
            for(let n = 0; n < min; n++) {
                if(syllabary.list[m][n] != undefined) {
                    if(letters[beginOfSyllable+n].literal === syllabary.list[m][n].getLiteral()) {
                        if(n+1 == min) {
                            // copy the matched letters
                            let arr: AlphabeticLetter[] = new Array
                            for(let q = 0; q < min; q++) {
                                arr[q] = letters[beginOfSyllable+q];
                            }
                            arraysOfLetters.push(arr)
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }

    let mp = new MatchedPattern();
    if(arraysOfLetters.length == 1) {
        // only one matched
        // copy the matched letters
        for(let q = 0; q < arraysOfLetters[0].length; q++) {
            mp.letters[q] = letters[beginOfSyllable+q];
        }
        return mp
    }

    if(arraysOfLetters.length > 1) {
        let longerEntry: number = -1 // length of the longest matched entry
        let shorterEntry: number = -1
    
        if(arraysOfLetters[0].length > arraysOfLetters[1].length) {
            longerEntry = 0
            shorterEntry = 1
        } else {
            longerEntry = 1
            shorterEntry = 0
        }
        
        if(letters.length-beginOfSyllable == arraysOfLetters[longerEntry].length) {
            // return the shorter one
            for(let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
                mp.letters[q] = letters[beginOfSyllable+q];
            }
            return mp
        }

        // look ahead for 1 letter
        if(letters.length-beginOfSyllable == arraysOfLetters[longerEntry].length+1) {
            if(letters[beginOfSyllable+arraysOfLetters[longerEntry].length].literal.search(new RegExp(new SetOfInitialConsonants().toString())) == 0) {
                // consonant-ending
                // return the longer one
                for(let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable+q];
                }
            } else {
                // vowel ending
                // return the shorter one
                for(let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable+q];
                }
            }
            return mp
        }

        // look ahead for 2 letters
        if(letters.length-beginOfSyllable > arraysOfLetters[longerEntry].length+1) {
            if(new SetOfVowels().beginWith(letters[beginOfSyllable+arraysOfLetters[longerEntry].length].literal) == true) {
                // return the shorter one
                for(let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable+q];
                }
                return mp
            }
            // return the longer one
            for(let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
                mp.letters[q] = letters[beginOfSyllable+q];
            }
        }
    }

    return mp
}

//------------------------------------------------------------------------------
//  Kana Morpheme Maker
//------------------------------------------------------------------------------

export class KanaLemmatizationMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    romanizedKana: RomanizedKana

    constructor(gs: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
        this.romanizedKana = new RomanizedKana()
    }

    create(syllable: Syllable) { return new KanaLemmatizationMorpheme(syllable) }

    createArray() { return new Array<KanaLemmatizationMorpheme>() }

    makeInputingMorphemes() {
        return this.make(this.preprocess(), this.romanizedKana, syllabifyKana);
    }
}
