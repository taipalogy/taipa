import { GraphemeMaker } from '../src/unit';
import { lowerLettersTonal, TonalLetterTags } from '../src/tonal/version2';
import { TonalCombiningMorphemeMaker } from '../src/dparser/morpheme';
import { TonalCombiningForms } from '../src/dparser/metaplasm';

type TonePatternTwo = [TonalLetterTags, TonalLetterTags];
export type SuprafixTwo = { patterns: TonePatternTwo[] };

describe('Suprafix testing, of length 2', () => {
  const st: SuprafixTwo = {
    patterns: [
      [TonalLetterTags.w, TonalLetterTags.x], // 35
      [TonalLetterTags.z, TonalLetterTags.z], // 77
    ],
  };

  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes('lole');

  gs.splice(2, 0, gm.makeGraphemes(st.patterns[0][0].toString())[0]);
  gs.splice(5, 0, gm.makeGraphemes(st.patterns[0][1].toString())[0]);

  test('additive, check the inserted tone letter at 2', () => {
    expect(gs[2].letter.literal).toEqual('w');
  });

  test('additive, check the inserted tone letter at 5', () => {
    expect(gs[5].letter.literal).toEqual('x');
  });

  const mm = new TonalCombiningMorphemeMaker(new TonalCombiningForms());
  const ms = mm.makeMorphemes(gs);

  ms[0].syllable.replaceLetter(
    ms[0].syllable.letters.length - 1,
    lowerLettersTonal.get(st.patterns[1][0])
  );
  ms[1].syllable.replaceLetter(
    ms[1].syllable.letters.length - 1,
    lowerLettersTonal.get(st.patterns[1][1])
  );

  test('replacive, check the first syllable', () => {
    expect(ms[0].syllable.literal).toEqual('loz');
  });

  test('replacive, check the second syllable', () => {
    expect(ms[1].syllable.literal).toEqual('lez');
  });
});

describe('Simulfix testing', () => {
  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes('qirn');

  gs.splice(1, 1, gm.makeGraphemes('i')[0]);

  test('check the letter', () => {
    expect(gs[1].letter.literal).toEqual(TonalLetterTags.i);
  });

  const mm = new TonalCombiningMorphemeMaker(new TonalCombiningForms());
  const ms = mm.makeMorphemes(gs);

  ms[0].syllable.replaceLetter(1, lowerLettersTonal.get(TonalLetterTags.u));

  test('check the syllable', () => {
    expect(ms[0].syllable.literal).toEqual('qun');
  });
});

describe('Duplifix testing', () => {
  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes('dittwditt');

  test('check the letter', () => {
    expect(gs[4].letter.literal).toEqual(TonalLetterTags.d);
  });

  const mm = new TonalCombiningMorphemeMaker(new TonalCombiningForms());
  const ms = mm.makeMorphemes(gs);

  ms[1].syllable.replaceLetter(0, lowerLettersTonal.get(TonalLetterTags.l));

  test('check the syllable', () => {
    expect(ms[1].syllable.literal).toEqual('litt');
  });
});
