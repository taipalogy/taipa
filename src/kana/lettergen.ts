import { PositionalLetter, PositionalLetterGeneration, sgPipe } from '../unit';
import {
  KanaSpellingTags,
  kanaPositionalLetters,
  initialConsonantsKana,
  vowelsKana,
  geminatedConsonantsKana,
  semivowelsKana,
  finalConsonantsKana,
  hatsuonsKana,
} from './kana';

function initialConsonant(sg: PositionalLetterGeneration) {
  const sics = initialConsonantsKana;

  if (sics.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = kanaPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(KanaSpellingTags.initialConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function semivowel(sg: PositionalLetterGeneration) {
  const ssvs = semivowelsKana;

  if (ssvs.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = kanaPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(KanaSpellingTags.semivowel);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function vowel(sg: PositionalLetterGeneration) {
  const svs = vowelsKana;

  if (svs.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = kanaPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(KanaSpellingTags.vowel);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function hatsuon(sg: PositionalLetterGeneration) {
  const sfcs = hatsuonsKana;

  if (sfcs.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = kanaPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(KanaSpellingTags.finalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function finalConsonant(sg: PositionalLetterGeneration) {
  const sfcs = finalConsonantsKana;

  if (sfcs.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = kanaPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(KanaSpellingTags.finalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function geminatedConsonant(sg: PositionalLetterGeneration) {
  const sgcs = geminatedConsonantsKana;

  if (sgcs.includes(sg.letters[sg.matchedLetters.length])) {
    const positions = kanaPositionalLetters.get(
      sg.letters[sg.matchedLetters.length]
    );
    if (positions) {
      const s = positions(KanaSpellingTags.geminatedConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

const scV = sgPipe(vowel);
const scCV = sgPipe(initialConsonant, vowel);
const scVC = sgPipe(vowel, finalConsonant); // includes hatsuon
const scCVC = sgPipe(initialConsonant, vowel, finalConsonant); // includes geminated consonants
const scCSV = sgPipe(initialConsonant, semivowel, vowel);
const scCSVC = sgPipe(initialConsonant, semivowel, vowel, finalConsonant); // includes geminated consonants
const scCCV = sgPipe(geminatedConsonant, initialConsonant, vowel);

export class KanaPositionalLetterGenerator {
  readonly sylCompositions = [scV, scCV, scVC, scCVC, scCSV, scCSVC, scCCV];

  private genSokuonAndGeminated(letters: string[], lookahead: string) {
    let strs: Array<string[]> = new Array();

    strs.push(letters);

    // consonant gemination
    if (geminatedConsonantsKana.includes(letters[0]) == true) {
      let syl: string[] = new Array();
      syl.push(letters[0].charAt(0));
      for (let e of letters) {
        syl.push(e);
      }
      strs.push(syl);
    }

    // sokuon
    let fcs = finalConsonantsKana;
    for (let e of fcs.letters) {
      let syl: string[] = new Array();
      Object.assign(syl, letters);
      syl.push(e.toString());
      if (e.toString() === lookahead) strs.push(syl);
    }

    return strs;
  }

  generate(letters: string[], lookahead: string) {
    let strs: Array<string[]> = new Array();
    let sequences: Array<PositionalLetter[]> = new Array(); // to be returned

    strs = this.genSokuonAndGeminated(letters, lookahead);

    // console.log(strs);
    for (let i in strs) {
      // generates all needed positional letters to be processed

      for (let j = 0; j < this.sylCompositions.length; j++) {
        let sg = new PositionalLetterGeneration();
        sg.letters = strs[i];
        //console.log(`j: ${j}`)
        sg = this.sylCompositions[j](sg);
        if (
          sg.letters.length == sg.matchedLetters.length &&
          sg.matching == true
        ) {
          sequences.push(sg.matchedLetters);
          break;
        }
      }
    }
    // console.log(sequences);

    return sequences;
  }
}
