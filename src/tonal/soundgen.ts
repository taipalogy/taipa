import { Sound, SoundGeneration, pipe } from '../grapheme';
import {
    MaterLectionisSounds,
    MedialSounds,
    InitialSounds,
    FreeTonalSounds,
    NeutralFinalSounds,
    NasalizationSound,
    StopFinalSounds,
    tonalPositionalSounds,
    NasalFinalSounds,
    TonalSoundTags,
    CheckedTonalSounds,
    EuphonicFinalsBGJKLPS,
    EuphonicFinalsBBGGJJKKLLPPSS,
    lowerLettersTonal
} from './version2';
import { combiningRules } from './collections';

function initialConsonant(sg: SoundGeneration) {
    const sis = new InitialSounds();

    if (sis.includes(sg.letters[sg.sounds.length])) {
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

    const ssfs = new StopFinalSounds();

    if (ssfs.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.stopFinal);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive) sg.predictions.push(ssfs.sounds);
    }

    return sg;
}

function neutralFinalConsonant(sg: SoundGeneration) {
    if (!sg.matching) return sg;

    const snfs = new NeutralFinalSounds();

    if (snfs.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.stopFinal);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive) sg.predictions.push(snfs.sounds);
    }

    return sg;
}

function nasalFinalConsonant(sg: SoundGeneration) {
    if (!sg.matching) return sg;

    const snfs = new NasalFinalSounds();

    if (snfs.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.nasalFinal);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive) sg.predictions.push(snfs.sounds);
    }

    return sg;
}

function vowel(sg: SoundGeneration) {
    const sms = new MedialSounds();

    // const len = sg.sounds.length;
    let toBePrompted = true;
    let matches: number = 0;
    for (let i = sg.sounds.length; i < sg.letters.length; i++) {
        // console.log(`sg.sounds.length: ${sg.sounds.length}`);
        if (sms.includes(sg.letters[i])) {
            toBePrompted = false;
            const ps = tonalPositionalSounds.get(sg.letters[i]);
            if (ps) {
                const s = ps(TonalSoundTags.medial);
                matches++;
                if (s) sg.sounds.push(s);
            }
        } else {
            toBePrompted = false;
            if (matches == 0) sg.matching = false;
            break;
        }
    }

    if (toBePrompted) {
        if (sg.predictive && sg.letters.length > 0) sg.predictions.push(sms.sounds);
        sg.matching = false;
    }

    return sg;
}

function materLectionis(sg: SoundGeneration) {
    const sml = new MaterLectionisSounds();

    if (sml.includes(sg.letters[sg.sounds.length])) {
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

    const sns = new NasalizationSound();

    if (sns.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.nasalization);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive) sg.predictions.push(sns.sounds);
    }

    return sg;
}

function freeTone(sg: SoundGeneration) {
    if (!sg.matching) return sg;

    const sfts = new FreeTonalSounds();

    if (sfts.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.freeTonal);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive) sg.predictions.push(sfts.sounds);
    }

    return sg;
}

function checkedTone(sg: SoundGeneration) {
    if (!sg.matching) return sg;

    const scts = new CheckedTonalSounds();

    if (scts.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.checkedTonal);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive) sg.predictions.push(scts.sounds);
    }

    return sg;
}

function euphonicFinalConsonant(sg: SoundGeneration) {
    if (!sg.matching) return sg;

    const efBgjklps = new EuphonicFinalsBGJKLPS();
    const efBbggjjkkllppss = new EuphonicFinalsBBGGJJKKLLPPSS();

    if (efBgjklps.includes(sg.letters[sg.sounds.length]) || efBbggjjkkllppss.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSounds.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.stopFinal);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive && sg.predictEuphonicFinal) {
            sg.predictions.push(efBgjklps.sounds);
            sg.predictions.push(efBbggjjkkllppss.sounds);
        }
    }

    return sg;
}

// common syllables
const scV = pipe(vowel);
const scM = pipe(materLectionis);
const scVT = pipe(vowel, freeTone);
const scMT = pipe(materLectionis, freeTone);
//const scMC = pipe(materLectionis, neutralFinalConsonant);
const scCV = pipe(initialConsonant, vowel);
const scVC1 = pipe(vowel, stopFinalConsonant);
const scVC2 = pipe(vowel, nasalFinalConsonant);
const scVCT1 = pipe(vowel, stopFinalConsonant, checkedTone);
const scVCT2 = pipe(vowel, nasalFinalConsonant, freeTone);
const scCVT = pipe(initialConsonant, vowel, freeTone);
const scCVC1 = pipe(initialConsonant, vowel, stopFinalConsonant);
const scCVC2 = pipe(initialConsonant, vowel, nasalFinalConsonant);
const scCVCT1 = pipe(initialConsonant, vowel, stopFinalConsonant, checkedTone);
const scCVCT2 = pipe(initialConsonant, vowel, nasalFinalConsonant, freeTone);
//const scCVCC = pipe(initialConsonant, vowel, nasalFinalConsonant, neutralFinalConsonant);

// consonant syllables
const scCC = pipe(initialConsonant, nasalFinalConsonant);
const scCCT = pipe(initialConsonant, nasalFinalConsonant, freeTone);
const scCCC = pipe(initialConsonant, nasalFinalConsonant, neutralFinalConsonant);
const scCCCT = pipe(initialConsonant, nasalFinalConsonant, neutralFinalConsonant, checkedTone);

// nasalization syllables
const scVN = pipe(vowel, nasalization);
const scVNT = pipe(vowel, nasalization, freeTone);
const scCVN = pipe(initialConsonant, vowel, nasalization);
const scCVNT = pipe(initialConsonant, vowel, nasalization, freeTone);
//const scVNC = pipe(vowel, nasalization, neutralFinalConsonant);
//const scVNCT = pipe(vowel, nasalization, neutralFinalConsonant, checkedTone);
const scCVNC = pipe(initialConsonant, vowel, nasalization, neutralFinalConsonant);
const scCVNCT = pipe(initialConsonant, vowel, nasalization, neutralFinalConsonant, checkedTone);

// euphonic syllables
const scVC3 = pipe(vowel, euphonicFinalConsonant);
const scVCT3 = pipe(vowel, euphonicFinalConsonant, checkedTone);
const scCVC3 = pipe(initialConsonant, vowel, euphonicFinalConsonant);
const scCVCT3 = pipe(initialConsonant, vowel, euphonicFinalConsonant, checkedTone);
const scCVCCT = pipe(initialConsonant, vowel, nasalFinalConsonant, neutralFinalConsonant, checkedTone);

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
    scCVCCT
];

export class TonalSoundGenerator {
    private isStopFinal(str: string) {
        if (new StopFinalSounds().includes(str)) return true;

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
