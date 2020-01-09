import { TwoTonalSpelling, TwoTonals } from '../src/tonal/spelling';
import { GraphemeMaker } from '../src/grapheme';
import { lowerLettersOfTonal, FreeTonalW, FreeTonalX, TonalLetterTags } from '../src/tonal/version2';
import { TonalCombiningMorphemeMaker, TonalCombiningForms } from '../src/dparser/morpheme'

describe("Suprafix testing, of length 2", () => {
    const tts: TwoTonalSpelling = {
        pos: [2, 5],
        patterns: [new TwoTonals(new FreeTonalW(), new FreeTonalX())], // 35
    };

    const suprafix = {
        patterns: [TonalLetterTags.z, TonalLetterTags.z], // 77
    };

    const gm = new GraphemeMaker(lowerLettersOfTonal);
    const gs = gm.makeGraphemes('lole');

    gs.splice(tts.pos[0], 0, gm.makeGraphemes(tts.patterns[0].tonals[0].toString())[0]);
    gs.splice(tts.pos[1], 0, gm.makeGraphemes(tts.patterns[0].tonals[1].toString())[0]);

    test("check the inserted tone letter at 2", () => {
        expect(gs[2].letter.literal).toEqual('w');
    });

    test("check the inserted tone letter at 5", () => {
        expect(gs[5].letter.literal).toEqual('x');
    });

    const mm = new TonalCombiningMorphemeMaker(new TonalCombiningForms());
    const ms = mm.makeMorphemes(gs);

    ms[0].syllable.replaceLetter(ms[0].syllable.letters.length-1, lowerLettersOfTonal.get(suprafix.patterns[0]));
    ms[1].syllable.replaceLetter(ms[1].syllable.letters.length-1, lowerLettersOfTonal.get(suprafix.patterns[1]));

    test("check the first syllable", () => {
        expect(ms[0].syllable.literal).toEqual('loz');
    });

    test("check the second syllable", () => {
        expect(ms[1].syllable.literal).toEqual('lez');
    });
});

describe("Simulfix testing", () => {
    const gm = new GraphemeMaker(lowerLettersOfTonal);
    const gs = gm.makeGraphemes('qirn');

    gs.splice(1, 1, gm.makeGraphemes('i')[0]);

    test("check the letter", () => {
        expect(gs[1].letter.literal).toEqual(TonalLetterTags.i);
    });

    const mm = new TonalCombiningMorphemeMaker(new TonalCombiningForms());
    const ms = mm.makeMorphemes(gs);

    ms[0].syllable.replaceLetter(1, lowerLettersOfTonal.get(TonalLetterTags.u));

    test("check the syllable", () => {
        expect(ms[0].syllable.literal).toEqual('qun');
    });
});

describe("Duplifix testing", () => {
    const gm = new GraphemeMaker(lowerLettersOfTonal);
    const gs = gm.makeGraphemes('dittwditt');

    test("check the letter", () => {
        expect(gs[4].letter.literal).toEqual(TonalLetterTags.d);
    });

    const mm = new TonalCombiningMorphemeMaker(new TonalCombiningForms());
    const ms = mm.makeMorphemes(gs);

    ms[1].syllable.replaceLetter(0, lowerLettersOfTonal.get(TonalLetterTags.l));

    test("check the syllable", () => {
        expect(ms[1].syllable.literal).toEqual('litt');
    });
});
