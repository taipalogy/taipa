import { AlphabeticGrapheme, Sound, AlphabeticLetter } from '../unit';
import { Syllable, MatchedPattern, Morpheme } from '../unit';
import { MorphemeMaker } from '../maker';
import {
  hiraganaKatakana,
  gailaigo,
  initialConsonantsKana,
  vowelsKana,
  semivowelsKana,
  hatsuonsKana,
  KanaLetterTags,
  finalConsonantsKana,
  geminatedConsonantsKana,
} from './kana';
import { KanaPositionalLetterGenerator } from './lettergen';
import { KanaCombiningMetaplasm } from '../metaplasm';

export class KanaSyllable extends Syllable {}

/** A syllable. */
export class KanaUncombiningMorpheme extends Morpheme {
  syllable: KanaSyllable;
  sounds: Array<Sound>;

  constructor(
    syllable: KanaSyllable,
    sounds: Array<Sound>,
    kcm: KanaCombiningMetaplasm
  ) {
    super();
    this.syllable = syllable;
    this.sounds = new Array();
    this.sounds = sounds;
  }
}

function syllabifyKana(
  letters: Array<AlphabeticLetter>,
  beginOfSyllable: number
) {
  let literal = '';
  let matched = '';
  let lookAhead = '';
  let ltrs: Array<string> = new Array();
  let matchedLtrs: Array<string> = new Array();

  for (let i = beginOfSyllable; i < letters.length; i++) {
    literal = literal + letters[i].literal;
    ltrs.push(letters[i].literal);
    if (hiraganaKatakana.has(literal) || gailaigo.has(literal)) {
      matched = literal;
      Object.assign(matchedLtrs, ltrs);
      if (i + 1 < letters.length) lookAhead = letters[i + 1].literal; // look-ahead
    } else if (
      literal.length == 3 &&
      letters[0].literal === KanaLetterTags.ng &&
      vowelsKana.includes(letters[1].literal)
    ) {
      // ng-
      matched = literal;
      Object.assign(matchedLtrs, ltrs);
    } else if (
      ltrs.length == 3 &&
      (ltrs[0] === ltrs[1] ||
        (ltrs[0] === KanaLetterTags.t && ltrs[1] === KanaLetterTags.ch)) &&
      vowelsKana.includes(ltrs[2])
    ) {
      // initial sokuon. e.g. ggu, kku, ppa, etc.
      // when a final t followed by an initial ch
      matched = literal;
      Object.assign(matchedLtrs, ltrs);
      lookAhead = '';
    } else if (
      finalConsonantsKana.includes(lookAhead) &&
      i + 1 == letters.length
    ) {
      // final sokuon, not medial sokuon
      matched = literal;
      Object.assign(matchedLtrs, ltrs);
      lookAhead = '';
    } else if (
      geminatedConsonantsKana.includes(lookAhead) &&
      i + 1 < letters.length // there is at least one letter after look-ahead
    ) {
      // medial sokuon, not final sokuon
      if (
        initialConsonantsKana.includes(letters[i + 1].literal) &&
        (lookAhead === letters[i + 1].literal ||
          (lookAhead === KanaLetterTags.t &&
            letters[i + 1].literal === KanaLetterTags.ch))
      ) {
        // check if the letter after look-ahead is an initial consonant
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      } else if (
        vowelsKana.includes(letters[i + 1].literal) ||
        semivowelsKana.includes(letters[i + 1].literal)
      ) {
        // check if the letter after look-ahead is a vowel
        matched = literal.slice(0, literal.length - 1);
        ltrs.pop();
        Object.assign(matchedLtrs, ltrs);
      }
      lookAhead = '';
    } else if (hatsuonsKana.includes(lookAhead)) {
      if (
        vowelsKana.includes(letters[i + 1].literal) ||
        semivowelsKana.includes(letters[i + 1].literal)
      ) {
        // check if the letter after look-ahead is a vowel
        matched = literal.slice(0, literal.length - 1);
        ltrs.pop();
        Object.assign(matchedLtrs, ltrs);
      } else {
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      }
      lookAhead = '';
    }
  }

  let list: Array<Sound[]> = new Array();
  if (matched.length > 0) {
    // console.log(matchedLtrs, lookAhead);
    const ksg = new KanaPositionalLetterGenerator();
    list = ksg.generate(matchedLtrs, lookAhead);
    // console.log(list);
  }

  let arraysOfLetters: Array<AlphabeticLetter[]> = new Array();

  let mp = new MatchedPattern();
  let sounds = new Array<Sound>();

  for (let m in list) {
    let min = Math.min(letters.length - beginOfSyllable, list[m].length);
    if (list[m].length == min) {
      for (let n = 0; n < min; n++) {
        if (list[m][n] != undefined) {
          if (letters[beginOfSyllable + n].literal === list[m][n].toString()) {
            if (n + 1 == min) {
              // copy the matched letters
              let arr: AlphabeticLetter[] = new Array();
              for (let q = 0; q < min; q++) {
                arr[q] = letters[beginOfSyllable + q];
              }
              arraysOfLetters.push(arr);
              sounds = list[m];
            }
          } else {
            break;
          }
        }
      }
    }
  }

  if (arraysOfLetters.length == 1) {
    // only one matched
    // copy the matched letters
    for (let q = 0; q < arraysOfLetters[0].length; q++) {
      mp.letters[q] = letters[beginOfSyllable + q];
      mp.pattern[q] = sounds[q];
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

    if (
      letters.length - beginOfSyllable ==
      arraysOfLetters[longerEntry].length
    ) {
      if (
        hatsuonsKana.includes(
          arraysOfLetters[longerEntry][arraysOfLetters[longerEntry].length - 1]
            .literal
        )
      ) {
        // return the longer one
        for (let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
          mp.letters[q] = letters[beginOfSyllable + q];
          mp.pattern[q] = sounds[q];
        }
        return mp;
      }
      // return the shorter one
      for (let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
        mp.letters[q] = letters[beginOfSyllable + q];
        mp.pattern[q] = sounds[q];
      }
      return mp;
    }

    // look ahead for 1 letter
    if (
      letters.length - beginOfSyllable ==
      arraysOfLetters[longerEntry].length + 1
    ) {
      if (
        initialConsonantsKana.includes(
          letters[beginOfSyllable + arraysOfLetters[longerEntry].length].literal
        ) == true
      ) {
        // consonant-ending
        // return the longer one
        for (let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
          mp.letters[q] = letters[beginOfSyllable + q];
          mp.pattern[q] = sounds[q];
        }
      } else {
        // vowel ending
        // return the shorter one
        for (let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
          mp.letters[q] = letters[beginOfSyllable + q];
          mp.pattern[q] = sounds[q];
        }
      }
      return mp;
    }

    // look ahead for 2 letters
    if (
      letters.length - beginOfSyllable >
      arraysOfLetters[longerEntry].length + 1
    ) {
      if (
        vowelsKana.includes(
          letters[beginOfSyllable + arraysOfLetters[longerEntry].length].literal
        ) == true ||
        semivowelsKana.includes(
          letters[beginOfSyllable + arraysOfLetters[longerEntry].length].literal
        ) == true
      ) {
        // return the shorter one
        for (let q = 0; q < arraysOfLetters[shorterEntry].length; q++) {
          mp.letters[q] = letters[beginOfSyllable + q];
          mp.pattern[q] = sounds[q];
        }
        return mp;
      }
      // return the longer one
      for (let q = 0; q < arraysOfLetters[longerEntry].length; q++) {
        mp.letters[q] = letters[beginOfSyllable + q];
        mp.pattern[q] = sounds[q];
      }
    }
  }

  return mp;
}

export class KanaUncombiningMorphemeMaker extends MorphemeMaker {
  private metaplasm: KanaCombiningMetaplasm;

  constructor(kcm: KanaCombiningMetaplasm) {
    super();
    this.metaplasm = kcm;
  }

  protected createArray() {
    return new Array<KanaUncombiningMorpheme>();
  }

  protected createMorpheme(msp: MatchedPattern) {
    return new KanaUncombiningMorpheme(
      new KanaSyllable(msp.letters),
      msp.pattern,
      this.metaplasm
    );
  }

  protected postprocess(
    patterns: MatchedPattern[]
  ): Array<KanaUncombiningMorpheme> {
    let morphemes = this.createArray();
    for (let i in patterns) {
      morphemes.push(this.createMorpheme(patterns[i]));
    }
    return morphemes;
  }

  makeMorphemes(graphemes: Array<AlphabeticGrapheme>) {
    const ltrs = graphemes.map(it => it.letter);
    const ptrns = this.make(ltrs, syllabifyKana);
    const ms = this.postprocess(ptrns);

    return ms;
  }
}
