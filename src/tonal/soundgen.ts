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
  stopFinalSoundsBBggjjkkllppss,
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
  if (!sg.matching) return sg;

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
  let toBePredicted = true;
  let matches: number = 0;
  for (let i = sg.sounds.length; i < sg.letters.length; i++) {
    // console.log(`sg.sounds.length: ${sg.sounds.length}`);
    if (medialSounds.includes(sg.letters[i])) {
      toBePredicted = false;
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
    if (sg.predictive && sg.letters.length > 0)
      sg.predictions.push(medialSounds.sounds);
    sg.matching = false;
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

function freeTone(sg: SoundGeneration) {
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

function checkedTone(sg: SoundGeneration) {
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
    stopFinalSoundsBBggjjkkllppss.includes(sg.letters[sg.sounds.length])
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
      sg.predictions.push(stopFinalSoundsBBggjjkkllppss.sounds);
    }
  }

  return sg;
}

// common syllables
const scV = sgPipe(vowel);
const scM = sgPipe(materLectionis);
const scVT = sgPipe(vowel, freeTone);
const scMT = sgPipe(materLectionis, freeTone);
//const scMC = sgPipe(materLectionis, neutralFinalConsonant);
const scCV = sgPipe(initialConsonant, vowel);
const scVC1 = sgPipe(vowel, stopFinalConsonant);
const scVC2 = sgPipe(vowel, nasalFinalConsonant);
const scVCT1 = sgPipe(vowel, stopFinalConsonant, checkedTone);
const scVCT2 = sgPipe(vowel, nasalFinalConsonant, freeTone);
const scCVT = sgPipe(initialConsonant, vowel, freeTone);
const scCVC1 = sgPipe(initialConsonant, vowel, stopFinalConsonant);
const scCVC2 = sgPipe(initialConsonant, vowel, nasalFinalConsonant);
const scCVCT1 = sgPipe(
  initialConsonant,
  vowel,
  stopFinalConsonant,
  checkedTone
);
const scCVCT2 = sgPipe(initialConsonant, vowel, nasalFinalConsonant, freeTone);
//const scCVCC = sgPipe(initialConsonant, vowel, nasalFinalConsonant, neutralFinalConsonant);

// consonant syllables
const scCC = sgPipe(initialConsonant, nasalFinalConsonant);
const scCCT = sgPipe(initialConsonant, nasalFinalConsonant, freeTone);
const scCCC = sgPipe(
  initialConsonant,
  nasalFinalConsonant,
  neutralFinalConsonant
);
const scCCCT = sgPipe(
  initialConsonant,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedTone
);

// nasalization syllables
const scVN = sgPipe(vowel, nasalization);
const scVNT = sgPipe(vowel, nasalization, freeTone);
const scCVN = sgPipe(initialConsonant, vowel, nasalization);
const scCVNT = sgPipe(initialConsonant, vowel, nasalization, freeTone);
//const scVNC = sgPipe(vowel, nasalization, neutralFinalConsonant);
//const scVNCT = sgPipe(vowel, nasalization, neutralFinalConsonant, checkedTone);
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
  checkedTone
);

// sandhi syllables
const scVC3 = sgPipe(vowel, sandhiFinalConsonant);
const scVCT3 = sgPipe(vowel, sandhiFinalConsonant, checkedTone);
const scCVC3 = sgPipe(initialConsonant, vowel, sandhiFinalConsonant);
const scCVCT3 = sgPipe(
  initialConsonant,
  vowel,
  sandhiFinalConsonant,
  checkedTone
);
const scCVCCT = sgPipe(
  initialConsonant,
  vowel,
  nasalFinalConsonant,
  neutralFinalConsonant,
  checkedTone
);

// syllable compositions or patterns
export const syllableCompositions = [
  scV,
  scM,
  scVT,
  scMT,
  scCV,
  scVC1,
  scVC2,
  scVCT1,
  scVCT2,
  scCVT,
  scCVC1,
  scCVC2,
  scCVCT1,
  scCVCT2,

  scCC,
  scCCT,
  scCCC,
  scCCCT,

  scVN,
  scVNT,
  scCVN,
  scCVNT,
  scCVNC,
  scCVNCT,

  scVC3,
  scVCT3,
  scCVC3,
  scCVCT3,
  scCVCCT,
];

export class TonalSoundGenerator {
  private isStopFinal(str: string) {
    if (stopFinalSounds.includes(str)) return true;

    return false;
  }

  private genChecked(ltrs: string[]) {
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
    //console.log(sequences)
    return sequences;
  }
}
