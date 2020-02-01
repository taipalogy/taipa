import { syllable_compositions } from './soundgen';
import { SoundGeneration, Sound } from '../grapheme';
import { lexical_roots } from './lexicalroots2';

export class Prompter {
    prompt(strs: string[]) {
        const soundSeqs: Array<Sound[]> = new Array();

        for (let j = 0; j < syllable_compositions.length; j++) {
            let sg = new SoundGeneration();
            sg.prompt = true;
            sg.promptEuphonicFinal = true;
            sg.letters = strs;
            sg = syllable_compositions[j](sg);

            if (sg.letters.length != sg.sounds.length || sg.matching != true) {
                sg.prompts.map(x => soundSeqs.push(x));
            }
        }

        // console.log(soundSeqs);

        const dupes: Array<[string, string]> = new Array();
        soundSeqs.map(i => i.map(j => dupes.push([j.toString(), j.name])));
        let dedupes = dupes.reduce(function(accumulator: Array<[string, string]>, currentValue: [string, string]) {
            if (accumulator.filter(x => x[0] === currentValue[0]).length == 0) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);

        // console.log(dedupes);

        const prompts = dedupes.filter(x => lexical_roots.includes(strs.join('') + x[0]));

        // console.log(prompts);

        return prompts;
    }
}
