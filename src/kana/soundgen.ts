import { Sound, SoundGeneration, sgPipe } from '../unit';
import {
  KanaSoundTags,
  kanaPositionalSound,
  initialConsonantsKana,
  vowelsKana,
  germinatedConsonantsKana,
  semivowelsKana,
  finalConsonantsKana,
} from './kana';

function initialConsonant(sg: SoundGeneration) {
  const sics = initialConsonantsKana;

  if (sics.includes(sg.letters[sg.sounds.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(KanaSoundTags.initialConsonant);
      if (s) sg.sounds.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function semivowel(sg: SoundGeneration) {
  const ssvs = semivowelsKana;

  if (ssvs.includes(sg.letters[sg.sounds.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(KanaSoundTags.semivowel);
      if (s) sg.sounds.push(s);
    }
  }

  return sg;
}

function vowel(sg: SoundGeneration) {
  const svs = vowelsKana;

  if (svs.includes(sg.letters[sg.sounds.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(KanaSoundTags.vowel);
      if (s) sg.sounds.push(s);
    }
  }

  return sg;
}

function finalConsonant(sg: SoundGeneration) {
  const sfcs = finalConsonantsKana;

  if (sfcs.includes(sg.letters[sg.sounds.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(KanaSoundTags.finalConsonant);
      if (s) sg.sounds.push(s);
    }
  }

  return sg;
}

function germinatedConsonant(sg: SoundGeneration) {
  const sgcs = germinatedConsonantsKana;

  if (sgcs.includes(sg.letters[sg.sounds.length])) {
    const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(KanaSoundTags.germinatedConsonant);
      if (s) sg.sounds.push(s);
    }
  }

  return sg;
}

const scV = sgPipe(vowel);
const scCV = sgPipe(initialConsonant, vowel);
const scCVC = sgPipe(initialConsonant, vowel, finalConsonant);
const scCSV = sgPipe(initialConsonant, semivowel, vowel);
const scCCV = sgPipe(germinatedConsonant, initialConsonant, vowel);

export class KanaSoundGenerator {
  readonly sylCompositions = [scV, scCV, scCVC, scCSV, scCCV];

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
    for (let e of fcs.sounds) {
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

    //console.log(strs)
    for (let i in strs) {
      // generates all needed sounds to be processed

      for (let j = 0; j < this.sylCompositions.length; j++) {
        let sg = new SoundGeneration();
        sg.letters = strs[i];
        //console.log(`j: ${j}`)
        sg = this.sylCompositions[j](sg);
        if (sg.letters.length == sg.sounds.length && sg.matching == true) {
          sequences.push(sg.sounds);
          break;
        }
      }
    }
    //console.log(sequences)

    return sequences;
  }
}
