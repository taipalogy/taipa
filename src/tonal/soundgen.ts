import { Sound, SoundGeneration, pipe } from "../grapheme";
import {
    MaterLectionisSounds,
    MedialSounds,
    InitialSounds,
    FreeTonalSounds,
    NeutralFinalSounds,
    NasalizationSound,
    StopFinalSounds,
    combining_rules,
    tonalPositionalSound,
    NasalFinalSounds,
    TonalSoundTags,
    CheckedTonalSounds,
    EuphonicFinalsBGJKLPS,
    EuphonicFinalsBBGGJJKKLLPPSS
} from "./version2";

function initialConsonant(sg: SoundGeneration) {
    const sis = new InitialSounds();

    if (sis.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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
            const ps = tonalPositionalSound.get(sg.letters[i]);
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
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
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

    const ef_bgjklps = new EuphonicFinalsBGJKLPS();
    const ef_bbggjjkkllppss = new EuphonicFinalsBBGGJJKKLLPPSS();

    if (ef_bgjklps.includes(sg.letters[sg.sounds.length]) || ef_bbggjjkkllppss.includes(sg.letters[sg.sounds.length])) {
        const ps = tonalPositionalSound.get(sg.letters[sg.sounds.length]);
        if (ps) {
            const s = ps(TonalSoundTags.stopFinal);
            if (s) sg.sounds.push(s);
        }
    } else {
        sg.matching = false;
        if (sg.letters.length == sg.sounds.length && sg.predictive && sg.predictEuphonicFinal) {
            sg.predictions.push(ef_bgjklps.sounds);
            sg.predictions.push(ef_bbggjjkkllppss.sounds);
        }
    }

    return sg;
}

// common syllables
const sc_v = pipe(vowel);
const sc_m = pipe(materLectionis);
const sc_vt = pipe(vowel, freeTone);
const sc_mt = pipe(materLectionis, freeTone);
//const sc_mc = pipe(materLectionis, neutralFinalConsonant);
const sc_cv = pipe(initialConsonant, vowel);
const sc_vc1 = pipe(vowel, stopFinalConsonant);
const sc_vc2 = pipe(vowel, nasalFinalConsonant);
const sc_vct1 = pipe(vowel, stopFinalConsonant, checkedTone);
const sc_vct2 = pipe(vowel, nasalFinalConsonant, freeTone);
const sc_cvt = pipe(initialConsonant, vowel, freeTone);
const sc_cvc1 = pipe(initialConsonant, vowel, stopFinalConsonant);
const sc_cvc2 = pipe(initialConsonant, vowel, nasalFinalConsonant);
const sc_cvct1 = pipe(initialConsonant, vowel, stopFinalConsonant, checkedTone);
const sc_cvct2 = pipe(initialConsonant, vowel, nasalFinalConsonant, freeTone);
//const sc_cvcc = pipe(initialConsonant, vowel, nasalFinalConsonant, neutralFinalConsonant);

// consonant syllables
const sc_cc = pipe(initialConsonant, nasalFinalConsonant);
const sc_cct = pipe(initialConsonant, nasalFinalConsonant, freeTone);
const sc_ccc = pipe(initialConsonant, nasalFinalConsonant, neutralFinalConsonant);
const sc_ccct = pipe(initialConsonant, nasalFinalConsonant, neutralFinalConsonant, checkedTone);

// nasalization syllables
const sc_vn = pipe(vowel, nasalization);
const sc_vnt = pipe(vowel, nasalization, freeTone);
const sc_cvn = pipe(initialConsonant, vowel, nasalization);
const sc_cvnt = pipe(initialConsonant, vowel, nasalization, freeTone);
//const sc_vnc = pipe(vowel, nasalization, neutralFinalConsonant);
//const sc_vnct = pipe(vowel, nasalization, neutralFinalConsonant, checkedTone);
const sc_cvnc = pipe(initialConsonant, vowel, nasalization, neutralFinalConsonant);
const sc_cvnct = pipe(initialConsonant, vowel, nasalization, neutralFinalConsonant, checkedTone);

// euphonic syllables
const sc_vc3 = pipe(vowel, euphonicFinalConsonant);
const sc_vct3 = pipe(vowel, euphonicFinalConsonant, checkedTone);
const sc_cvc3 = pipe(initialConsonant, vowel, euphonicFinalConsonant);
const sc_cvct3 = pipe(initialConsonant, vowel, euphonicFinalConsonant, checkedTone);
const sc_cvcct = pipe(initialConsonant, vowel, nasalFinalConsonant, neutralFinalConsonant, checkedTone);

// syllable compositions or patterns
export const syllable_compositions = [
    sc_v,
    sc_m,
    sc_vt,
    sc_mt,
    sc_cv,
    sc_vc1,
    sc_vc2,
    sc_vct1,
    sc_vct2,
    sc_cvt,
    sc_cvc1,
    sc_cvc2,
    sc_cvct1,
    sc_cvct2,

    sc_cc,
    sc_cct,
    sc_ccc,
    sc_ccct,

    sc_vn,
    sc_vnt,
    sc_cvn,
    sc_cvnt,
    sc_cvnc,
    sc_cvnct,

    sc_vc3,
    sc_vct3,
    sc_cvc3,
    sc_cvct3,
    sc_cvcct
];

export class TonalSoundGenerator {
    private isStopFinal(str: string) {
        if (new StopFinalSounds().includes(str)) return true;

        return false;
    }

    private genChecked(ltrs: string[]) {
        const to_s = combining_rules.get(ltrs[ltrs.length - 1]);
        let strs: Array<string[]> = new Array();

        strs.push(ltrs);

        //console.debug(to_s)
        if (to_s) {
            for (let i in to_s) {
                let syl: string[] = new Array();
                Object.assign(syl, ltrs);
                syl.push(to_s[i].toString());
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

            for (let j = 0; j < syllable_compositions.length; j++) {
                let sg = new SoundGeneration();
                sg.letters = strs[i];
                //console.log(`j: ${j}`)
                sg = syllable_compositions[j](sg);
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
