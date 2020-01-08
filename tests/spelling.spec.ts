import { TwoTonalSpelling, TwoTonals } from '../src/tonal/spelling';
import { GraphemeMaker } from '../src/grapheme';
import { lowerLettersOfTonal, FreeTonalW, FreeTonalX } from '../src/tonal/version2';
import { TonalCombiningMorphemeMaker, TonalCombiningForms, TonalCombiningMorpheme} from '../src/dparser/morpheme'

describe("Spelling testing, insert 2 tonals", () => {
    const tts: TwoTonalSpelling = {
        pos: [2, 5],
        patterns: [new TwoTonals(new FreeTonalW(), new FreeTonalX())], // 35
    };

    const gm = new GraphemeMaker(lowerLettersOfTonal);
    const gs = gm.makeGraphemes('lole');

    gs.splice(tts.pos[0], 0, gm.makeGraphemes(tts.patterns[0].tonals[0].toString())[0]);
    gs.splice(tts.pos[1], 0, gm.makeGraphemes(tts.patterns[0].tonals[1].toString())[0]);

    test("check the inserted tonal at 2", () => {
        expect(gs[2].letter.literal).toEqual('w');
    });

    test("check the inserted tonal at 5", () => {
        expect(gs[5].letter.literal).toEqual('x');
    });

    const mm = new TonalCombiningMorphemeMaker(new TonalCombiningForms());
    const ms = mm.makeMorphemes(gs);

    test("check the first syllable", () => {
        expect(ms[0].syllable.literal).toEqual('low');
    });

    test("check the second syllable", () => {
        expect(ms[1].syllable.literal).toEqual('lex');
    });
});