import { Sound, SpellingGeneration, sgPipe } from '../unit';
import {
  KanaSpellingTags,
  kanaPositionalSound,
  initialConsonantsKana,
  vowelsKana,
  germinatedConsonantsKana,
  semivowelsKana,
  finalConsonantsKana,
  hatsuonKana,
} from './kana';

function initialConsonant(sg: SpellingGeneration) {
  const sics = initialConsonantsKana;

  if (sics.includes(sg.letters[sg.matchedLetters.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.matchedLetters.length]);
    if (ps) {
      const s = ps(KanaSpellingTags.initialConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function semivowel(sg: SpellingGeneration) {
  const ssvs = semivowelsKana;

  if (ssvs.includes(sg.letters[sg.matchedLetters.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.matchedLetters.length]);
    if (ps) {
      const s = ps(KanaSpellingTags.semivowel);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function vowel(sg: SpellingGeneration) {
  const svs = vowelsKana;

  if (svs.includes(sg.letters[sg.matchedLetters.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.matchedLetters.length]);
    if (ps) {
      const s = ps(KanaSpellingTags.vowel);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function hatsuon(sg: SpellingGeneration) {
  const sfcs = hatsuonKana;

  if (sfcs.includes(sg.letters[sg.matchedLetters.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.matchedLetters.length]);
    if (ps) {
      const s = ps(KanaSpellingTags.finalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function finalConsonant(sg: SpellingGeneration) {
  const sfcs = finalConsonantsKana;

  if (sfcs.includes(sg.letters[sg.matchedLetters.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.matchedLetters.length]);
    if (ps) {
      const s = ps(KanaSpellingTags.finalConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

function germinatedConsonant(sg: SpellingGeneration) {
  const sgcs = germinatedConsonantsKana;

  if (sgcs.includes(sg.letters[sg.matchedLetters.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.matchedLetters.length]);
    if (ps) {
      const s = ps(KanaSpellingTags.germinatedConsonant);
      if (s) sg.matchedLetters.push(s);
    }
  }

  return sg;
}

const scV = sgPipe(vowel);
const scCV = sgPipe(initialConsonant, vowel);
const scVC = sgPipe(vowel, hatsuon);
const scCVC = sgPipe(initialConsonant, vowel, finalConsonant);
const scCSV = sgPipe(initialConsonant, semivowel, vowel);
const scCCV = sgPipe(germinatedConsonant, initialConsonant, vowel);

export class KanaSoundGenerator {
  readonly sylCompositions = [scV, scCV, scVC, scCVC, scCSV, scCCV];

  private genSokuonAndGerminated(letters: string[], lookahead: string) {
    let strs: Array<string[]> = new Array();

    strs.push(letters);

    // consonant germination
    if (germinatedConsonantsKana.includes(letters[0]) == true) {
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
    let sequences: Array<Sound[]> = new Array(); // to be returned

    strs = this.genSokuonAndGerminated(letters, lookahead);

    // console.log(strs);
    for (let i in strs) {
      // generates all needed sounds to be processed

      for (let j = 0; j < this.sylCompositions.length; j++) {
        let sg = new SpellingGeneration();
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
