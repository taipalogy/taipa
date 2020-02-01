import { Prompter } from '../src/tonal/prompt';
import { TonalLemmatizationAnalyzer } from '../src/tonal/analyzer';
import { GraphemeMaker } from '../src/grapheme';
import { lowerLettersOfTonal } from '../src/tonal/version2';

describe('Prompting testing', () => {
    const inputUndefined: any = undefined;
    const inputEmpty: any = '';

    const tla = new TonalLemmatizationAnalyzer();
    const prmptr = new Prompter();

    const grs1 = tla.graphAnalyze(inputEmpty);
    const prs1 = prmptr.prompt(grs1.map(x => x.letter).map(y => y.literal));

    test('check the length of prompts for empty input', () => {
        expect(prs1.length).toEqual(0);
    });

    const grs2 = tla.graphAnalyze(inputUndefined);
    const prs2 = prmptr.prompt(grs2.map(x => x.letter).map(y => y.literal));

    test('check the length of prompts for undefined input', () => {
        expect(prs2.length).toEqual(0);
    });
});

describe('Prompting testing', () => {
    const gm = new GraphemeMaker(lowerLettersOfTonal);
    const prmptr = new Prompter();

    const grs1 = gm.makeGraphemes('s');
    const prs1 = prmptr.prompt(grs1.map(x => x.letter).map(y => y.literal));

    test('check the length of prompts', () => {
        expect(prs1.length).toEqual(7);
    });

    const grs2 = gm.makeGraphemes('so');
    const prs2 = prmptr.prompt(grs2.map(x => x.letter).map(y => y.literal));

    test('check the length of prompts', () => {
        expect(prs2.length).toEqual(5);
    });

    const grs3 = gm.makeGraphemes('soa');
    const prs3 = prmptr.prompt(grs3.map(x => x.letter).map(y => y.literal));

    test('check the length of prompts', () => {
        expect(prs3.length).toEqual(6);
    });

    const grs4 = gm.makeGraphemes('soai');
    const prs4 = prmptr.prompt(grs4.map(x => x.letter).map(y => y.literal));

    test('check the length of prompts', () => {
        expect(prs4.length).toEqual(0);
    });

    const grs5 = gm.makeGraphemes('soainn');
    const prs5 = prmptr.prompt(grs5.map(x => x.letter).map(y => y.literal));

    test('check the length of prompts', () => {
        expect(prs5.length).toEqual(1);
    });
});
