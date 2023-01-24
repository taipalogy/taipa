import { Sound, SoundGeneration, sgPipe } from '../unit';
import {
  KanaSpellingTags,
  kanaPositionalSounds,
  initialConsonantsKana,
  vowelsKana,
  geminatedConsonantsKana,
  semivowelsKana,
  finalConsonantsKana,
  // hatsuonsKana,
} from './kanaalphabet';

function initialConsonant(sg: SoundGeneration) {
  const sics = initialConsonantsKana;

  if (sics.includes(sg.letters[sg.matchedSounds.length])) {
    const sounds = kanaPositionalSounds.get(
      sg.letters[sg.matchedSounds.length]
    );
    if (sounds) {
      const s = sounds(KanaSpellingTags.initialConsonant);
      if (s) sg.matchedSounds.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function semivowel(sg: SoundGeneration) {
  const ssvs = semivowelsKana;

  if (ssvs.includes(sg.letters[sg.matchedSounds.length])) {
    const sounds = kanaPositionalSounds.get(
      sg.letters[sg.matchedSounds.length]
    );
    if (sounds) {
      const s = sounds(KanaSpellingTags.semivowel);
      if (s) sg.matchedSounds.push(s);
    }
  }

  return sg;
}

function vowel(sg: SoundGeneration) {
  const svs = vowelsKana;

  if (svs.includes(sg.letters[sg.matchedSounds.length])) {
    const sounds = kanaPositionalSounds.get(
      sg.letters[sg.matchedSounds.length]
    );
    if (sounds) {
      const s = sounds(KanaSpellingTags.vowel);
      if (s) sg.matchedSounds.push(s);
    }
  }

  return sg;
}
/*
function hatsuon(sg: SoundGeneration) {
  const sfcs = hatsuonsKana;

  if (sfcs.includes(sg.sounds[sg.matchedSounds.length])) {
    const sounds = kanaPositionalSounds.get(sg.sounds[sg.matchedSounds.length]);
    if (sounds) {
      const s = sounds(KanaSpellingTags.finalConsonant);
      if (s) sg.matchedSounds.push(s);
    }
  }

  return sg;
}
*/
function finalConsonant(sg: SoundGeneration) {
  const sfcs = finalConsonantsKana;

  if (sfcs.includes(sg.letters[sg.matchedSounds.length])) {
    const sounds = kanaPositionalSounds.get(
      sg.letters[sg.matchedSounds.length]
    );
    if (sounds) {
      const s = sounds(KanaSpellingTags.finalConsonant);
      if (s) sg.matchedSounds.push(s);
    }
  }

  return sg;
}

function geminatedConsonant(sg: SoundGeneration) {
  const sgcs = geminatedConsonantsKana;

  if (sgcs.includes(sg.letters[sg.matchedSounds.length])) {
    const sounds = kanaPositionalSounds.get(
      sg.letters[sg.matchedSounds.length]
    );
    if (sounds) {
      const s = sounds(KanaSpellingTags.geminatedConsonant);
      if (s) sg.matchedSounds.push(s);
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

export class KanaSoundGenerator {
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

    strs = this.genSokuonAndGeminated(letters, lookahead);

    // console.log(strs);
    for (let i in strs) {
      // generates all needed sounds to be processed

      for (let j = 0; j < this.sylCompositions.length; j++) {
        let sg = new SoundGeneration();
        sg.letters = strs[i];
        //console.log(`j: ${j}`)
        sg = this.sylCompositions[j](sg);
        if (
          sg.letters.length == sg.matchedSounds.length &&
          sg.matching == true
        ) {
          sequences.push(sg.matchedSounds);
          break;
        }
      }
    }
    // console.log(sequences);

    return sequences;
  }
}
