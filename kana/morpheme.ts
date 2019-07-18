import { AlphabeticGrapheme } from '../grapheme'
import { Syllable, MatchedPattern, Morpheme } from '../morpheme'
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

    constructor(syllable: KanaSyllable) {
        super()
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
    romanizedKana: RomanizedKana

    constructor(gs: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
        this.romanizedKana = new RomanizedKana()
    }

    make(letters: Array<AlphabeticLetter>, syllabary: Syllabary, syllabify: (letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) => MatchedPattern) {
        let morphemes = new Array<KanaUncombiningMorpheme>()

        let beginOfSyllable: number = 0;
        for(let i = 0; i < letters.length; i++) {
            
            let msp: MatchedPattern = new MatchedPattern();
            if(i-beginOfSyllable == 0) {
                
                msp = syllabify(letters, beginOfSyllable, syllabary)

                if(msp.matchedLength == 0) {
                    //console.log('no matched syllables found. the syllable might need to be added')
                }

                //console.log("matchedLen: %d", msp.matchedLength);
                //console.log(msp.pattern);
                //console.log(msp.letters)

                let tsm: KanaUncombiningMorpheme;
                if(msp.letters.length > 0) {
                    for(let j in msp.letters) {
                        //console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    tsm =  new KanaUncombiningMorpheme(new KanaSyllable(msp.letters))

                    morphemes.push(tsm);
                }

                beginOfSyllable += msp.matchedLength;
            }
            
            if(morphemes.length == 0) {
                //console.log('nothing matched')
            } else if(morphemes.length >= 1) {
                if(msp == undefined) break

                if(msp.matchedLength > 0) {
                    i += beginOfSyllable-i-1;
                }

            }
        }

        return morphemes
    }

    makeInputingMorphemes() {
        return this.make(this.preprocess(), this.romanizedKana, syllabifyKana);
    }
}
