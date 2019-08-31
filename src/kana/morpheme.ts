import { AlphabeticGrapheme } from '../grapheme'
import { Syllable, MatchedPattern, Morpheme, KanaCombiningMetaplasm } from '../morpheme'
import { MorphemeMaker } from '../morpheme'
import { RomanizedKana, SetOfInitialConsonants, SetOfVowels, Hatsuon } from './kana'
import { Syllabary } from '../morpheme'
import { AlphabeticLetter } from '../grapheme'

//------------------------------------------------------------------------------
//  Kana Syllable
//------------------------------------------------------------------------------

export class KanaSyllable extends Syllable {}

//------------------------------------------------------------------------------
//  Kana Inputing Morpheme
//------------------------------------------------------------------------------

export class KanaUncombiningMorpheme extends Morpheme {
    syllable: KanaSyllable;
    metaplasm: KanaCombiningMetaplasm

    constructor(syllable: KanaSyllable, kcm: KanaCombiningMetaplasm) {
        super()
        this.syllable = syllable;
        this.metaplasm = kcm
    }
}

//------------------------------------------------------------------------------
//  syllabifyKana
//------------------------------------------------------------------------------

function syllabifyKana(letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) {
    let len = 0 // limit on the length of fetched syllables, hence the amount of syllables limited
    for(let l of letters) {
        len = len + l.characters.length
    }

    syllabary.setFirstLetter(letters[beginOfSyllable].literal, len)
    
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
    
        let index: number = 0
        for(let j=0; j<arraysOfLetters.length; j++) {
            if(arraysOfLetters[j].length > arraysOfLetters[index].length) {
                index = j
            }
        }
        if(index > 0) {
            longerEntry = index
            shorterEntry = 0
        } else {
            longerEntry = 0
            shorterEntry = 1
        }

        if(letters.length-beginOfSyllable == arraysOfLetters[longerEntry].length) {
            if(new Hatsuon().beginWith(arraysOfLetters[longerEntry][arraysOfLetters[longerEntry].length-1].literal)) {
                // return the longer one
                for(let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable+q];
                }
                return mp    
            }
            // return the shorter one
            for(let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
                mp.letters[q] = letters[beginOfSyllable+q];
            }
            return mp
        }

        // look ahead for 1 letter
        if(letters.length-beginOfSyllable == arraysOfLetters[longerEntry].length+1) {
            if(new SetOfInitialConsonants().beginWith(letters[beginOfSyllable+arraysOfLetters[longerEntry].length].literal) == true) {
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

export class KanaUncombiningMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: KanaCombiningMetaplasm

    constructor(gs: Array<AlphabeticGrapheme>, kcm: KanaCombiningMetaplasm) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
        this.metaplasm = kcm
    }

    createMorphemes() {
        return new Array<KanaUncombiningMorpheme>()
    }

    createMorpheme(msp: MatchedPattern, kcm: KanaCombiningMetaplasm) {
        return new KanaUncombiningMorpheme(new KanaSyllable(msp.letters), kcm)
    }

    makeInputingMorphemes() {
        return this.make(this.preprocess(), new RomanizedKana(), syllabifyKana);
    }
}
