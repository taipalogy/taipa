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
        if (this.isCheckedTonal(ls[index])) {
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
            let k = index;
            while (k < ls.length) {
                if (this.isNasalFinal(ls[k])) {
                    sounds.push(ls[k] + '.' + TonalSoundTags.nasalFinal);
                    if (ls.length > sounds.length) {
                        sounds = this.analyzeAfterNasalFinalsOrNasalization(ls, sounds, sounds.length);
                    }        
                } else if (this.isStopFinal(ls[k])) {
                    sounds.push(ls[k] + '.' + TonalSoundTags.stopFinal);
                    if (ls.length > sounds.length) {
                        sounds = this.analyzeAfterStopFinal(ls, sounds, sounds.length);
                    }                            
                }
                k++;
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

    private makeCombiningForms(entry: string[]) {
        let lastElement = entry[entry.length - 1];
        let n = lastElement.lastIndexOf('.');
        let key = lastElement.slice(0, n); // tone of base form
        let tos = combiningRules.get(key); // plural form of to. get tones of combining form
        let ret: Array<string[]> = new Array();

        if (lastElement.lastIndexOf(TonalSoundTags.freeTonal) > 0) {
            let e: string[] = [];
            for (let k in tos) {
                e = [];
                e = Object.assign([], entry);
                e.pop();
                if (tos[k].getLiteral()) {
                    // zero-tone-mark for first tone will not be pushed
                    e.push(tos[k].getLiteral() + '.' + TonalSoundTags.freeTonal);
                }

                // first tone is still pushed to return
                ret.push(e);
            }
        } else {
            let e: string[] = [];
            e = Object.assign([], entry);
            let to = combiningRules.get('zero');
            //console.debug(Object.keys(to))
            e.push(combiningRules.get('zero')[Object.keys(to)[0]].getLiteral() + '.' + TonalSoundTags.freeTonal);
            ret.push(e);
        }

        return ret;
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
        const to_s = combiningRules.get(ltrs[ltrs.length-1]);
        let strs: Array<string[]> = new Array();

        strs.push(ltrs);

        if(to_s) {
            for(let i in to_s) {
                let syl: string[] = new Array()
                Object.assign(syl, ltrs)
                syl.push(to_s[i].getLiteral())
                strs.push(syl)
            }
        }

        return strs
    }

    generate(ltrs: string[]) {
        let strs: Array<string[]> = new Array()
        let arrayOfSounds: Array<string[]> = new Array(); // collecting all sounds to be processed
        let entries: Array<Sound[]> = new Array(); // to be returned

        if (this.isStopFinal(ltrs[ltrs.length-1])) {
            strs = this.genChecked(ltrs)
        } else {
            strs.push(ltrs)
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
        
        //let buffer: Array<string[]> = new Array();
        for (let k = 0; k < arrayOfSounds.length; k++) {
            entries.push(this.convert(arrayOfSounds[k]));
        }

        return entries;
    }
}
