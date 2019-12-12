import { Sound } from '../grapheme';
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
    EuphonicFinalT,
    EuphonicTonalF,
    EuphonicFinalTT,
    EuphonicTonalWX,
} from './version2';

export class ClientOfTonalGenerator {
    private analyzeAfterNasalFinalsOrNasalization(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone does not have a tonal
        if (this.isFreeTonal(ls[index])) {
            sounds.push(ls[ls.length - 1] + '.' + TonalSoundTags.freeTonal);
        } else if (this.isNeutralFinal(ls[index])) {
            // when a nasal final m, n, or ng is followed by a neutral final h
            sounds.push(ls[ls.length - 1] + '.' + TonalSoundTags.stopFinal);
        }

        return sounds;
    }

    private analyzeAfterStopFinal(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone does not have a tonal
        //console.debug(`checked tonal: ${ls[index]}. is checked tonal: ${this.isCheckedTonal(ls[index])}`)
        if (this.isCheckedTonal(ls[index])) {
            sounds.push(ls[ls.length - 1] + '.' + TonalSoundTags.checkedTonal);
        }

        return sounds;
    }

    private analyzeAfterStopFinalEuphonicT(ls: string[], sounds: string[], index: number): string[] {
        if (this.isCheckedTonalEuphonicF(ls[index])) {
            sounds.push(ls[ls.length - 1] + '.' + TonalSoundTags.checkedTonal);
        }

        return sounds;
    }

    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if (this.isFreeTonal(ls[index])) {
            sounds.push(ls[ls.length - 1] + '.' + TonalSoundTags.freeTonal);
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
        } else if(this.isStopFinalEuphonicT(ls[index])) {
            sounds.push(ls[index] + '.' + TonalSoundTags.stopFinal);
            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterStopFinalEuphonicT(ls, sounds, sounds.length);
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

    private isStopFinalEuphonicT(str: string) {
        if (new EuphonicFinalT().beginWith(str)
            || new EuphonicFinalTT().beginWith(str)) return true;

        return false;
    }

    private isCheckedTonalEuphonicF(str: string) {
        if (new EuphonicTonalF().beginWith(str)
            || new EuphonicTonalWX().beginWith(str)) return true;

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
