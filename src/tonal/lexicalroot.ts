import { Sound, AlphabeticLetter } from '../grapheme';
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
} from './version2';
import { TonalLemmatizationAnalyzer } from './analyzer';

export class ClientOfTonalGenerator {
    private analyzeAfterNasalFinalsOrNasalization(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone do not have a tonal
        if (this.isFreeTonal(ls[index])) {
            sounds.push(ls[ls.length - 1] + '.' + TonalSoundTags.freeTonal);
        } else if (this.isNeutralFinal(ls[index])) {
            // when a nasal final m, n, or ng is followed by a neutral final h
            sounds.push(ls[ls.length - 1] + '.' + TonalSoundTags.stopFinal);
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
                } else if (this.isFinalConsonant(ls[k])) {
                    sounds.push(ls[k] + '.' + TonalSoundTags.stopFinal);
                }
                k++;
            }

            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterNasalFinalsOrNasalization(ls, sounds, sounds.length);
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

    private findCombiningForms(buffer: Array<string[]>) {
        // find combining forms based on the same stem
        let cfs;
        for (let i in buffer) {
            cfs = this.makeCombiningForms(buffer[i]);

            for (let m in cfs) {
                for (let n = 0; n < buffer.length; n++) {
                    let entry = buffer[n];
                    if (entry[entry.length - 1] === cfs[m][cfs[m].length - 1]) {
                        break;
                    }
                    if (n == buffer.length - 1) {
                        // pushed to fill the slot, block following duplicates
                        // duplicates come from combining rules
                        buffer.push(cfs[m]);
                    }
                }
            }
        }
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

    generate(slb: string) {
        let strs: Array<string> = [slb]
        let arrayOfSounds: Array<string[]> = new Array(); // collecting all sounds to be processed
        let analyzer = new TonalLemmatizationAnalyzer();
        let entries: Array<Sound[]> = new Array(); // to be returned

        for (let i in strs) {
            // generates all needed sounds to be processed
            let graphemes = analyzer.doGraphemicAnalysis(strs[i]);
            let ls: string[] = [];
            for (let j in graphemes) {
                ls.push(graphemes[j].letter.literal);
            }

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

        let buffer: Array<string[]> = new Array();
        for (let k = 0; k < arrayOfSounds.length; k++) {
            //console.debug(arrayOfSounds[k])
            entries.push(this.convert(arrayOfSounds[k]));

            let entry = arrayOfSounds[k];
            let lastElement = entry[entry.length - 1];

            if (this.isStopFinal(lastElement)) {
                let n = lastElement.lastIndexOf('.');
                let key = lastElement.slice(0, n);
                let tos = combiningRules.get(key);

                let e: string[] = [];
                for (let k in tos) {
                    e = [];
                    e = Object.assign([], entry);
                    e.push(tos[k].getLiteral() + '.' + TonalSoundTags.checkedTonal);

                    entries.push(this.convert(e));
                }

                if (k == arrayOfSounds.length - 1) {
                    // terminal condition of iterator of arrayofSounds
                    this.findCombiningForms(buffer);
                    for (let i in buffer) {
                        entries.push(this.convert(buffer[i]));
                    }
                }
            } else {

            }
        }

        return entries;
    }
}
