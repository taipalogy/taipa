import { Sound, SetOfSounds } from '../grapheme';
import {
    SetOfMaterLectionis,
    SetOfMedials,
    SetOfInitials,
    SetOfFreeTonals,
    SetOfFinals,
    SetOfNeutralFinals,
    SetOfNasalizations,
    SetOfStopFinals,
    combiningRules,
    letterClasses,
    SetOfNasalFinals,
    TonalSoundTags,
    SetOfCheckedTonals,
    EuphonicFinalsBGJKLPS,
    EuphonicTonalF,
    EuphonicFinalsBBGGJJKKLLPPSS,
    EuphonicTonalWAndX,
} from './version2';

const pipe = (...fns: Array<(sg: SoundGeneration) => SoundGeneration>) => (x: SoundGeneration) => fns.reduce((v, f) => f(v), x);

class SoundGeneration {
    letters: string[] = [];
    sounds = new Array<Sound>();
}

function initialConsonant(sg: SoundGeneration) {
    const sis = new SetOfInitials();

    if(sis.beginWith(sg.letters[sg.sounds.length])) {
        const ps = letterClasses.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(TonalSoundTags.initial);
            if(s)
                sg.sounds.push(s)
        }
    }

    return sg;
}

function stopFinalConsonant(sg: SoundGeneration) {
    const ssfcs = new SetOfStopFinals();

    if(ssfcs.beginWith(sg.letters[sg.sounds.length])) {
        const ps = letterClasses.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(TonalSoundTags.stopFinal);
            if(s)
                sg.sounds.push(s)
        }
    }

    return sg;
}

function vowel(sg: SoundGeneration) {
    const sms = new SetOfMedials();

    for(let i = 0 + sg.sounds.length; i < sg.letters.length; i++) {
        if(sms.beginWith(sg.letters[i])) {
            const ps = letterClasses.get(sg.letters[i]);
            if(ps) {
                const s = ps.map.get(TonalSoundTags.medial);
                if(s)
                    sg.sounds.push(s)
            }
        } else break;
    }
        
    return sg;
}

function materLectionis(sg: SoundGeneration) {
    const sml = new SetOfMaterLectionis();

    if(sml.beginWith(sg.letters[sg.sounds.length])) {
        const ps = letterClasses.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(TonalSoundTags.medial);
            if(s)
                sg.sounds.push(s)
        }
    }

    return sg;
}

function nasalization(sg: SoundGeneration) {
    const sns = new SetOfNasalizations();

    if(sns.beginWith(sg.letters[sg.sounds.length])) {
        const ps = letterClasses.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(TonalSoundTags.nasalization);
            if(s)
                sg.sounds.push(s)
        }
    }

    return sg;
}

function tone(sg: SoundGeneration) {
    const sfts = new SetOfFreeTonals();

    if(sfts.beginWith(sg.letters[sg.sounds.length])) {
        const ps = letterClasses.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(TonalSoundTags.freeTonal);
            if(s)
                sg.sounds.push(s)
        }
    }

    return sg;
}


const sc_v = pipe(vowel);
const sc_cv = pipe(initialConsonant, vowel);
const sc_m = pipe(materLectionis);
const sc_mt = pipe(materLectionis, tone);
const sc_cvt = pipe(initialConsonant, vowel, tone);
const sc_cvct = pipe(initialConsonant, vowel, stopFinalConsonant, tone);
/*
const _oai = new SoundGeneration();
_oai.letters = ['o', 'a', 'i'];
const _qoai = new SoundGeneration();
_qoai.letters = ['q', 'o', 'a', 'i'];
const _qoaiw = new SoundGeneration();
_qoaiw.letters = ['q', 'o', 'a', 'i', 'w'];

sc_v(_oai);
sc_cv(_qoai);
sc_cvt(_qoaiw);
*/
export class TonalSoundGenerator {
    generate(letters: string[]): Sound[][] {
        let strs: Array<string[]> = new Array();
        let sequences: Array<Sound[]> = new Array(); // to be returned

        let sg = new SoundGeneration();
        sg.letters = letters;
        sg = sc_cvt(sg);
        sequences.push(sg.sounds);

        //console.log(sequences)
        return sequences;
    }
}

export class ClientOfTonalGenerator {
    private analyzeAfterNasalFinalsOrNasalization(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone does not have a tonal
        if (this.isFreeTonal(ls[index])) {
            sounds.push(ls[index] + '.' + TonalSoundTags.freeTonal);
        } else if (this.isNeutralFinal(ls[index])) {
            // when a nasal final m, n, or ng is followed by a neutral final h
            sounds.push(ls[index] + '.' + TonalSoundTags.stopFinal);
            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterEuphonicBGJKLPS(ls, sounds, sounds.length);
            }
        }

        return sounds;
    }

    private analyzeAfterStopFinal(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone does not have a tonal
        //console.debug(`checked tonal: ${ls[index]}. is checked tonal: ${this.isCheckedTonal(ls[index])}`)
        if (this.isCheckedTonal(ls[index])) {
            sounds.push(ls[index] + '.' + TonalSoundTags.checkedTonal);
        }

        return sounds;
    }

    private analyzeAfterEuphonicBGJKLPS(ls: string[], sounds: string[], index: number): string[] {
        if (this.isEuphonicFOrWOrX(ls[index])) {
            sounds.push(ls[index] + '.' + TonalSoundTags.checkedTonal);
        }

        return sounds;
    }

    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if (this.isFreeTonal(ls[index])) {
            sounds.push(ls[index] + '.' + TonalSoundTags.freeTonal);
        } else if (this.isNasalization(ls[index])) {
            sounds.push(ls[index] + '.' + TonalSoundTags.nasalization);
            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterNasalFinalsOrNasalization(ls, sounds, sounds.length);
            }
        } else if (this.isFinalConsonant(ls[index])) {
            //let k = index;
            //while (k < ls.length) {
                if (this.isNasalFinal(ls[index])) {
                    sounds.push(ls[index] + '.' + TonalSoundTags.nasalFinal);
                    if (ls.length > sounds.length) {
                        sounds = this.analyzeAfterNasalFinalsOrNasalization(ls, sounds, sounds.length);
                    }
                } else if (this.isStopFinal(ls[index])) {
                    sounds.push(ls[index] + '.' + TonalSoundTags.stopFinal);
                    if (ls.length > sounds.length) {
                        sounds = this.analyzeAfterStopFinal(ls, sounds, sounds.length);
                    }
                }
                //k++;
            //}
        } else if(this.isEuphonicBGJKLPS(ls[index])) {
            sounds.push(ls[index] + '.' + TonalSoundTags.stopFinal);
            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterEuphonicBGJKLPS(ls, sounds, sounds.length);
            }
        } 

        return sounds;
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        if (this.isVowel(ls[index])) {
            let k = index;
            while (k < ls.length) {
                if (this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.' + TonalSoundTags.medial);
                }
                k++;
            }

            if (ls.length == sounds.length) {
                // vowels with no tonals
                return sounds;
            }

            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length);
            }
        }

        return sounds;
    }

    private isInitialConsonant(str: string) {
        if (new SetOfInitials().beginWith(str) == true) return true;

        return false;
    }

    private isMaterLectionis(str: string) {
        if (new SetOfMaterLectionis().beginWith(str) == true) return true;

        return false;
    }

    private isVowel(str: string) {
        if (new SetOfMedials().beginWith(str) == true) return true;

        return false;
    }

    private isNasalization(str: string) {
        if (new SetOfNasalizations().beginWith(str) == true) return true;

        return false;
    }

    private isFreeTonal(str: string) {
        if (new SetOfFreeTonals().beginWith(str) == true) return true;

        return false;
    }

    private isCheckedTonal(str: string) {
        if (new SetOfCheckedTonals().beginWith(str) == true) return true;

        return false;
    }

    private isFinalConsonant(str: string) {
        if (new SetOfFinals().beginWith(str) == true) return true;

        return false;
    }

    private isNasalFinal(str: string) {
        if (new SetOfNasalFinals().beginWith(str) == true) return true;

        return false;
    }

    private isStopFinal(str: string) {
        if (new SetOfStopFinals().beginWith(str) == true) return true;

        return false;
    }

    private isNeutralFinal(str: string) {
        if (new SetOfNeutralFinals().beginWith(str) == true) return true;

        return false;
    }

    private isEuphonicBGJKLPS(str: string) {
        if (new EuphonicFinalsBGJKLPS().beginWith(str)
            || new EuphonicFinalsBBGGJJKKLLPPSS().beginWith(str)) return true;

        return false;
    }

    private isEuphonicFOrWOrX(str: string) {
        if (new EuphonicTonalF().beginWith(str)
            || new EuphonicTonalWAndX().beginWith(str)) return true;

        return false;
    }

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> PSA.medial
        let ret: Array<Sound> = new Array();
        for (let i in entry) {
            let n = entry[i].lastIndexOf('.');
            let clasName = entry[i].slice(0, n);
            let position = entry[i].slice(n + 1);
            //console.debug(entry + ' ' + clasName + ' ' + position)
            let ps = letterClasses.get(clasName);
            if (ps) {
                let snd = ps.map.get(position);
                if (snd) {
                    ret.push(snd);
                }
            }
        }
        return ret;
    }

    private genChecked(ltrs: string[]) {
        const to_s = combiningRules.get(ltrs[ltrs.length - 1]);
        let strs: Array<string[]> = new Array();

        strs.push(ltrs);

        //console.debug(to_s)
        if (to_s) {
            for (let i in to_s) {
                let syl: string[] = new Array();
                Object.assign(syl, ltrs);
                syl.push(to_s[i].getLiteral());
                strs.push(syl);
            }
        }

        return strs;
    }

    generate(letters: string[]) {
        let strs: Array<string[]> = new Array();
        let arrayOfSounds: Array<string[]> = new Array(); // collecting all sounds to be processed
        let entries: Array<Sound[]> = new Array(); // to be returned

        if (this.isStopFinal(letters[letters.length - 1])) {
            strs = this.genChecked(letters);
        } else {
            strs.push(letters);
        }

        for (let i in strs) {
            // generates all needed sounds to be processed
            let ls: string[] = strs[i];

            let sounds: string[] = [];

            if (
                (this.isMaterLectionis(ls[0]) && ls.length == 1) ||
                (ls.length == 2 && this.isMaterLectionis(ls[0]) && this.isFreeTonal(ls[1]))
            ) {
                sounds.push(ls[0] + '.' + TonalSoundTags.medial);
                if (ls.length > sounds.length) {
                    if (this.isFreeTonal(ls[1])) {
                        sounds = this.analyzeAfterNasalFinalsOrNasalization(ls, sounds, sounds.length);
                    }
                }

                arrayOfSounds.push(sounds);
                continue;
            }

            // analyze vowels, which have null initial consonants
            // pass 0 as index to indicate it has null initial consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0);

            if (this.isInitialConsonant(ls[0])) {
                // analyze initial consonants
                sounds.push(ls[0] + '.' + TonalSoundTags.initial);
                if (this.isVowel(ls[1])) {
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length);
                } else if (this.isFinalConsonant(ls[1])) {
                    // consonants followed by consonants. CC
                    sounds = this.analyzeAfterVowels(ls, sounds, sounds.length);
                }
            }

            arrayOfSounds.push(sounds);
        }

        for (let k = 0; k < arrayOfSounds.length; k++) {
            entries.push(this.convert(arrayOfSounds[k]));
        }

        return entries;
    }
}
