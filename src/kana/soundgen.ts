import { Sound, SoundGeneration, pipe } from '../grapheme';
import { SetOfInitialConsonants, KanaSoundTags, kanaPositionalSound, SetOfVowels, SetOfGerminatedConsonants, SetOfFinalConsonants, SetOfSemivowels } from './kana';

function initialConsonant(sg: SoundGeneration) {
    const sics = new SetOfInitialConsonants();

    if(sics.beginWith(sg.letters[sg.sounds.length])) {
        const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(KanaSoundTags.initialConsonant);
            if(s)
                sg.sounds.push(s)
        }
    } else sg.bool = false;

    return sg;
}

function semivowel(sg: SoundGeneration) {
    const ssvs = new SetOfSemivowels();

    if(ssvs.beginWith(sg.letters[sg.sounds.length])) {
        const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(KanaSoundTags.semivowel);
            if(s)
                sg.sounds.push(s)
        }
    }
        
    return sg;
}

function vowel(sg: SoundGeneration) {
    const svs = new SetOfVowels();

    if(svs.beginWith(sg.letters[sg.sounds.length])) {
        const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(KanaSoundTags.vowel);
            if(s)
                sg.sounds.push(s)
        }
    }
        
    return sg;
}


function finalConsonant(sg: SoundGeneration) {
    const sfcs = new SetOfFinalConsonants();

    if(sfcs.beginWith(sg.letters[sg.sounds.length])) {
        const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(KanaSoundTags.finalConsonant);
            if(s)
                sg.sounds.push(s)
        }
    }

    return sg;
}

function germinatedConsonant(sg: SoundGeneration) {
    const sgcs = new SetOfGerminatedConsonants();

    if(sgcs.beginWith(sg.letters[sg.sounds.length])) {
        const ps = kanaPositionalSound.get(sg.letters[sg.sounds.length]);
        if(ps) {
            const s = ps.map.get(KanaSoundTags.germinatedConsonant);
            if(s)
                sg.sounds.push(s)
        }
    }

    return sg;
}

const sc_v = pipe(vowel);
const sc_cv = pipe(initialConsonant, vowel);
const sc_cvc = pipe(initialConsonant, vowel, finalConsonant);
const sc_csv = pipe(initialConsonant, semivowel, vowel);
const sc_ccv = pipe(germinatedConsonant, initialConsonant, vowel);

export class KanaSoundGenerator {
    readonly sylCompositions = [sc_v, sc_cv, sc_cvc, sc_csv, sc_ccv];
    
    private genSokuonAndGerminated(letters: string[], lookahead: string) {
        let strs: Array<string[]> = new Array();

        strs.push(letters);

        // consonant germination
        if (new SetOfGerminatedConsonants().beginWith(letters[0]) == true) {
            let syl: string[] = new Array();
            syl.push(letters[0].charAt(0));
            for (let e of letters) {
                syl.push(e);
            }
            strs.push(syl);
        }

        // sokuon
        let fcs = new SetOfFinalConsonants();
        for (let e of fcs.sounds) {
            let syl: string[] = new Array();
            Object.assign(syl, letters);
            syl.push(e.getLiteral());
            if (e.getLiteral() === lookahead) strs.push(syl);
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

            for(let j = 0; j < this.sylCompositions.length; j++) {
                let sg = new SoundGeneration();
                sg.letters = strs[i];
                //console.log(`j: ${j}`)
                sg = this.sylCompositions[j](sg);
                if(sg.letters.length == sg.sounds.length && sg.bool == true) {
                    sequences.push(sg.sounds);
                    break;
                }
            }
        }
        //console.log(sequences)

        return sequences;
    }
}
