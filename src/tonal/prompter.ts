import { syllable_compositions } from './soundgen';
import { SoundGeneration, Sound } from '../grapheme';
import { lexical_roots } from './lexicalroots2';

export class Prompter {
    prompt(strs: string[]) {
        const soundSeqs: Array<Sound[]> = new Array();

        for (let j = 0; j < syllable_compositions.length; j++) {
            let sg = new SoundGeneration();
            sg.prompt = true;
            sg.letters = strs;
            sg = syllable_compositions[j](sg);

            if (sg.letters.length != sg.sounds.length || sg.matching != true) {
                // the pattern is not matched, the first unmatched set of sounds
                // is then returned as a possible prompt
                sg.prompts.map(x => soundSeqs.push(x));
            }
        }

        // console.log(soundSeqs);

        const dupes: Array<[string, string]> = new Array();
        soundSeqs.map(i => i.map(j => dupes.push([j.toString(), j.name])));
        let dedupes = dupes.reduce(function(accumulator: Array<[string, string]>, curr: [string, string]) {
            if (accumulator.filter(x => x[0] === curr[0]).length == 0) {
                accumulator.push(curr);
            }
            return accumulator;
        }, []);

        // console.log(dedupes);

        // for valid prompts
        const prompts = dedupes.filter(x => lexical_roots.includes(strs.join('') + x[0]));

        // console.log(prompts);

        return prompts;
    }
}
