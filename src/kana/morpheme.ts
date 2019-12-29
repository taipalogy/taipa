import { AlphabeticGrapheme, Sound } from '../grapheme';
import { Syllable, MatchedPattern, Morpheme, KanaCombiningMetaplasm } from '../morpheme';
import { MorphemeMaker } from '../morpheme';
import { SetOfInitialConsonants, SetOfVowels, Hatsuon, hiragana_katakana, SetOfSemivowels, gailaigo } from './kana';
import { AlphabeticLetter } from '../grapheme';
import { KanaSoundGenerator } from './soundgen';

//------------------------------------------------------------------------------

export class KanaSyllable extends Syllable {}

//------------------------------------------------------------------------------

export class KanaUncombiningMorpheme extends Morpheme {
    syllable: KanaSyllable;
    metaplasm: KanaCombiningMetaplasm;

    constructor(syllable: KanaSyllable, kcm: KanaCombiningMetaplasm) {
        super();
        this.syllable = syllable;
        this.metaplasm = kcm;
    }
}

//------------------------------------------------------------------------------

function syllabifyKana(letters: Array<AlphabeticLetter>, beginOfSyllable: number) {
    let literal = '';
    let matched = '';
    let lookahead = '';
    let ltrs: Array<string> = new Array();
    let matchedLtrs: Array<string> = new Array();
    const sov = new SetOfVowels();

    for (let i = beginOfSyllable; i < letters.length; i++) {
        literal = literal + letters[i].literal;
        ltrs.push(letters[i].literal);
        if (hiragana_katakana.has(literal) || gailaigo.has(literal)) {
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
            if (i + 1 < letters.length) lookahead = letters[i + 1].literal; // look-ahead
        } else {
            if (literal.length == 3 && literal[0] === literal[1] && sov.beginWith(literal[2])) {
                // for consonant germination of sokuon
                matched = literal;
                ltrs.shift(); // shift the germinated consonants
                Object.assign(matchedLtrs, ltrs);
            }
        }
    }

    let list: Array<Sound[]> = new Array();
    if (matched.length > 0) {
        //console.log(matchedLtrs, lookahead)
        const ksg = new KanaSoundGenerator();
        list = ksg.generate(matchedLtrs, lookahead);
        // console.log(list)
    }

    let arraysOfLetters: Array<AlphabeticLetter[]> = new Array();

    for (let m in list) {
        let min = Math.min(letters.length - beginOfSyllable, list[m].length);
        if (list[m].length == min) {
            for (let n = 0; n < min; n++) {
                if (list[m][n] != undefined) {
                    if (letters[beginOfSyllable + n].literal === list[m][n].getLiteral()) {
                        if (n + 1 == min) {
                            // copy the matched letters
                            let arr: AlphabeticLetter[] = new Array();
                            for (let q = 0; q < min; q++) {
                                arr[q] = letters[beginOfSyllable + q];
                            }
                            arraysOfLetters.push(arr);
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }

    let mp = new MatchedPattern();
    if (arraysOfLetters.length == 1) {
        // only one matched
        // copy the matched letters
        for (let q = 0; q < arraysOfLetters[0].length; q++) {
            mp.letters[q] = letters[beginOfSyllable + q];
        }
        return mp;
    }

    if (arraysOfLetters.length > 1) {
        let longerEntry: number = -1; // length of the longest matched entry
        let shorterEntry: number = -1;

        let index: number = 0;
        for (let j = 0; j < arraysOfLetters.length; j++) {
            if (arraysOfLetters[j].length > arraysOfLetters[index].length) {
                index = j;
            }
        }
        if (index > 0) {
            longerEntry = index;
            shorterEntry = 0;
        } else {
            longerEntry = 0;
            shorterEntry = 1;
        }

        if (letters.length - beginOfSyllable == arraysOfLetters[longerEntry].length) {
            if (
                new Hatsuon().beginWith(arraysOfLetters[longerEntry][arraysOfLetters[longerEntry].length - 1].literal)
            ) {
                // return the longer one
                for (let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable + q];
                }
                return mp;
            }
            // return the shorter one
            for (let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
                mp.letters[q] = letters[beginOfSyllable + q];
            }
            return mp;
        }

        // look ahead for 1 letter
        if (letters.length - beginOfSyllable == arraysOfLetters[longerEntry].length + 1) {
            if (
                new SetOfInitialConsonants().beginWith(
                    letters[beginOfSyllable + arraysOfLetters[longerEntry].length].literal,
                ) == true
            ) {
                // consonant-ending
                // return the longer one
                for (let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable + q];
                }
            } else {
                // vowel ending
                // return the shorter one
                for (let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable + q];
                }
            }
            return mp;
        }

        // look ahead for 2 letters
        if (letters.length - beginOfSyllable > arraysOfLetters[longerEntry].length + 1) {
            if (
                new SetOfVowels().beginWith(letters[beginOfSyllable + arraysOfLetters[longerEntry].length].literal) ==
                    true ||
                new SetOfSemivowels().beginWith(
                    letters[beginOfSyllable + arraysOfLetters[longerEntry].length].literal,
                ) == true
            ) {
                // return the shorter one
                for (let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
                    mp.letters[q] = letters[beginOfSyllable + q];
                }
                return mp;
            }
            // return the longer one
            for (let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
                mp.letters[q] = letters[beginOfSyllable + q];
            }
        }
    }

    return mp;
}

//------------------------------------------------------------------------------

export class KanaUncombiningMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: KanaCombiningMetaplasm;

    constructor(gs: Array<AlphabeticGrapheme>, kcm: KanaCombiningMetaplasm) {
        super();
        this.graphemes = new Array();
        this.graphemes = gs;
        this.metaplasm = kcm;
    }

    createMorphemes() {
        return new Array<KanaUncombiningMorpheme>();
    }

    createMorpheme(msp: MatchedPattern, kcm: KanaCombiningMetaplasm) {
        return new KanaUncombiningMorpheme(new KanaSyllable(msp.letters), kcm);
    }

    makeInputingMorphemes() {
        const ltrs = this.preprocess();
        const ptrns = this.make(ltrs, syllabifyKana);
        const ms = this.postprocess(ptrns);

        // return ptrns;
        return ms;
    }
}
