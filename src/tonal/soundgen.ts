import { Sound, SoundGeneration, sgPipe } from '../unit';
import {
  tonalPositionalSounds,
  TonalSoundTags,
  lowerLettersTonal,
  checkedTonalSounds,
  freeTonalSounds,
  initialSounds,
  materLectionisSounds,
  medialSounds,
  neutralFinalSounds,
  nasalFinalSounds,
  nasalizationSounds,
  stopFinalSounds,
  stopFinalSoundsBgjklps,
  stopFinalSoundsBBggkkllppss,
} from './version2';
import { combiningRules } from './collections';

function initialConsonant(sg: SoundGeneration) {
  if (initialSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.initial);
      if (s) sg.sounds.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function stopFinalConsonant(sg: SoundGeneration) {
  if (!sg.matching) return sg;

  if (stopFinalSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.stopFinal);
      if (s) sg.sounds.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.sounds.length && sg.predictive)
      sg.predictions.push(stopFinalSounds.sounds);
  }

  return sg;
}

function neutralFinalConsonant(sg: SoundGeneration) {
  if (!sg.matching) return sg;

  if (neutralFinalSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.stopFinal);
      if (s) sg.sounds.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.sounds.length && sg.predictive)
      sg.predictions.push(neutralFinalSounds.sounds);
  }

  return sg;
}

function nasalFinalConsonant(sg: SoundGeneration) {
  // check out the length of letters like we do in the loop in function vowel
  if (!sg.matching || sg.letters.length == 0) return sg;

  if (nasalFinalSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.nasalFinal);
      if (s) sg.sounds.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.sounds.length && sg.predictive)
      sg.predictions.push(nasalFinalSounds.sounds);
  }

  return sg;
}

function vowel(sg: SoundGeneration) {
  // we need the below line when the preceding initial consonant is not matched
  if (!sg.matching) return sg;

  let toBePredicted = true;
  let matches: number = 0;
  for (let i = sg.sounds.length; i < sg.letters.length; i++) {
    if (medialSounds.includes(sg.letters[i])) {
      toBePredicted = true;
      const ps = tonalPositionalSounds.get(sg.letters[i]);
      if (ps) {
        const s = ps(TonalSoundTags.medial);
        matches++;
        if (s) sg.sounds.push(s);
      }
    } else {
      toBePredicted = false;
      if (matches == 0) sg.matching = false;
      break;
    }
  }

  if (toBePredicted) {
    if (sg.predictive && sg.letters.length > 0) {
      sg.predictions.push(medialSounds.sounds);
    }
    sg.matching = true;
  }

  return sg;
}

function materLectionis(sg: SoundGeneration) {
  if (materLectionisSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.medial);
      if (s) sg.sounds.push(s);
    }
  } else sg.matching = false;

  return sg;
}

function nasalization(sg: SoundGeneration) {
  if (!sg.matching) return sg;

  if (nasalizationSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.nasalization);
      if (s) sg.sounds.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.sounds.length && sg.predictive)
      sg.predictions.push(nasalizationSounds.sounds);
  }

  return sg;
}

function freeTonal(sg: SoundGeneration) {
  if (!sg.matching) return sg;

  if (freeTonalSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.freeTonal);
      if (s) sg.sounds.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.sounds.length && sg.predictive)
      sg.predictions.push(freeTonalSounds.sounds);
  }

  return sg;
}

function checkedTonal(sg: SoundGeneration) {
  if (!sg.matching) return sg;

  if (checkedTonalSounds.includes(sg.letters[sg.sounds.length])) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.checkedTonal);
      if (s) sg.sounds.push(s);
    }
  } else {
    sg.matching = false;
    if (sg.letters.length == sg.sounds.length && sg.predictive)
      sg.predictions.push(checkedTonalSounds.sounds);
  }

  return sg;
}

function sandhiFinalConsonant(sg: SoundGeneration) {
  if (!sg.matching) return sg;

  if (
    stopFinalSoundsBgjklps.includes(sg.letters[sg.sounds.length]) ||
    stopFinalSoundsBBggkkllppss.includes(sg.letters[sg.sounds.length])
  ) {
    const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
    if (ps) {
      const s = ps(TonalSoundTags.stopFinal);
      if (s) sg.sounds.push(s);
    }
  } else {
    sg.matching = false;
    if (
      sg.letters.length == sg.sounds.length &&
      sg.predictive &&
      sg.predictSandhiFinal
    ) {
      sg.predictions.push(stopFinalSoundsBgjklps.sounds);
      sg.predictions.push(stopFinalSoundsBBggkkllppss.sounds);
    }
  }

  return sg;
}

// common syllables
const scV = sgPipe(vowel);
const scM = sgPipe(materLectionis);
const scVT = sgPipe(vowel, freeTonal);
const scMT = sgPipe(materLectionis, freeTonal);
const scMC = sgPipe(materLectionis, neutralFinalConsonant);
const scCV = sgPipe(initialConsonant, vowel);
const scVC1 = sgPipe(vowel, stopFinalConsonant);
const scVC2 = sgPipe(vowel, nasalFinalConsonant);
const scVCT1 = sgPipe(vowel, stopFinalConsonant, checkedTonal);
const scVCT2 = sgPipe(vowel, nasalFinalConsonant, freeTonal);
const scCVT = sgPipe(initialConsonant, vowel, freeTonal);
const scCVC1 = sgPipe(initialConsonant, vowel, stopFinalConsonant);
const scCVC2 = sgPipe(initialConsonant, vowel, nasalFinalConsonant);
const scCVCT1 = sgPipe(
  initialConsonant,
  vowel,
  stopFinalConsonant,
  checkedTonal
);
const scCVCT2 = sgPipe(initialConsonant, vowel, nasalFinalConsonant, freeTonal);
const scCVCC = sgPipe(
  initialConsonant,
  vowel,
  nasalFinalConsonant,
  neutralFinalConsonant
);
const scVCCT = sgPipe(
  vowel,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedTonal
);

// consonant syllables
const scCC = sgPipe(initialConsonant, nasalFinalConsonant);
const scCCT = sgPipe(initialConsonant, nasalFinalConsonant, freeTonal);
const scCCC = sgPipe(
  initialConsonant,
  nasalFinalConsonant,
  neutralFinalConsonant
);
const scCCCT = sgPipe(
  initialConsonant,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedTonal
);

// nasalization syllables
const scVN = sgPipe(vowel, nasalization);
const scVNT = sgPipe(vowel, nasalization, freeTonal);
const scCVN = sgPipe(initialConsonant, vowel, nasalization);
const scCVNT = sgPipe(initialConsonant, vowel, nasalization, freeTonal);
const scCVNC = sgPipe(
  initialConsonant,
  vowel,
  nasalization,
  neutralFinalConsonant
);
const scCVNCT = sgPipe(
  initialConsonant,
  vowel,
  nasalization,
  neutralFinalConsonant,
  checkedTonal
);

// sandhi syllables
const scVC3 = sgPipe(vowel, sandhiFinalConsonant);
const scVCT3 = sgPipe(vowel, sandhiFinalConsonant, checkedTonal);
const scCVC3 = sgPipe(initialConsonant, vowel, sandhiFinalConsonant);
const scCVCT3 = sgPipe(
  initialConsonant,
  vowel,
  sandhiFinalConsonant,
  checkedTonal
);
const scCVCCT = sgPipe(
  initialConsonant,
  vowel,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedTonal
);

// prettier-ignore
export const syllableCompositions = [
  // syllable compositions or patterns

  scV,  scM, scVT, scMT, scMC, scCV, scVC1, scVC2, scVCT1, scVCT2, scCVT, scCVC1,
  scCVC2, scCVCT1, scCVCT2, scCVCC, scVCCT,

  scCC, scCCT, scCCC, scCCCT,

  scVN, scVNT, scCVN, scCVNT, scCVNC, scCVNCT,

  scVC3, scVCT3, scCVC3, scCVCT3, scCVCCT,
];

export class TonalSoundGenerator {
  private isStopFinal(str: string) {
    if (stopFinalSounds.includes(str)) return true;

    return false;
  }

  private genChecked(ltrs: string[]) {
    // TODO: if the 3rd and 5th checked tones would be changed to -ppx, -ttx, -kkx,
    // -hhx, -ppw, -ttw, -kkw, and -hhw, edit the rules in combiningRules
    const tos = combiningRules.get(ltrs[ltrs.length - 1]);
    let strs: Array<string[]> = new Array();

    strs.push(ltrs);

    // console.debug(tos);
    if (tos) {
      for (let i in tos) {
        let syl: string[] = new Array();
        Object.assign(syl, ltrs);
        syl.push(lowerLettersTonal.get(tos[i]).literal);
        strs.push(syl);
      }
    }

    return strs;
  }

  generate(letters: string[]): Sound[][] {
    let strs: Array<string[]> = new Array();
    const sequences: Array<Sound[]> = new Array(); // to be returned

    if (this.isStopFinal(letters[letters.length - 1])) {
      strs = this.genChecked(letters);
    } else {
      strs.push(letters);
    }

    for (let i in strs) {
      // generates all needed sounds to be processed

      for (let j = 0; j < syllableCompositions.length; j++) {
        let sg = new SoundGeneration();
        sg.letters = strs[i];
        //console.log(`j: ${j}`)
        sg = syllableCompositions[j](sg);
        if (sg.letters.length == sg.sounds.length && sg.matching == true) {
          sequences.push(sg.sounds);
          break;
        }
      }
    }
    // console.log(letters, sequences);
    return sequences;
  }
}
