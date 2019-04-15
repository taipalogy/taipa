import { AlphabeticGrapheme } from '../grapheme'
import { Syllable, MatchedPattern } from '../morpheme'
import { MorphemeMaker } from '../morphememaker'
import { RomanizedKana, SetOfInitialConsonants, SetOfFinalConsonants, SetOfVowels } from './kana'
import { Syllabary } from '../system'
import { AlphabeticLetter } from '../grapheme'

//------------------------------------------------------------------------------
//  Kana Syllable
//------------------------------------------------------------------------------

export class KanaSyllable  extends Syllable {}

//------------------------------------------------------------------------------
//  Kana Inputing Morpheme
//------------------------------------------------------------------------------

export class KanaLemmaMorpheme {
    syllable: Syllable;

    constructor(syllable: Syllable) {
        this.syllable = syllable;
    }
}

function syllabifyKana(letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) {
    syllabary.setFirstLetter(letters[beginOfSyllable].literal)
    let arraysOfLetters: Array<AlphabeticLetter[]> = new Array()

    for(let m in syllabary.list) {
        let min = Math.min(letters.length-beginOfSyllable, syllabary.list[m].length);
        if(syllabary.list[m].length == min) {
            for(let n = 0; n < min; n++) {
                if(syllabary.list[m][n] != undefined) {
                    if(letters[beginOfSyllable+n].literal === syllabary.list[m][n].getLiteral()) {
                        //console.log(syllabary.list[m])
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

    let maxLen = 0
    for(let i in arraysOfLetters) {
        if(arraysOfLetters[i].length > maxLen) {
            maxLen = arraysOfLetters[i].length
        } 
    }

    //console.log(arraysOfLetters)

    let mp = new MatchedPattern();
    // look ahead for 1 letter
    if(letters.length-beginOfSyllable >= maxLen+1) {
        if(letters[maxLen].literal.search(new RegExp(new SetOfInitialConsonants().toString())) == 0) {
        } else {
        }
    }

    console.log(mp.letters)
    return mp
}

//------------------------------------------------------------------------------
//  Kana Morpheme Maker
//------------------------------------------------------------------------------

export class KanaLemmaMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    
    constructor(gs: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
    }

    create(syllable: Syllable) { return new KanaLemmaMorpheme(syllable) }

    createArray() { return new Array<KanaLemmaMorpheme>() }

    makeInputingMorphemes() {
        return this.make(this.preprocess(), new RomanizedKana(), syllabifyKana);
    }
}
