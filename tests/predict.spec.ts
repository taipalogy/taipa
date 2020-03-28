import { Prediction } from '../src/tonal/prediction';
import { TonalLemmatizationAnalyzer } from '../src/tonal/analyzer';
import { GraphemeMaker } from '../src/unit';
import { lowerLettersTonal } from '../src/tonal/version2';

describe('Prediction testing', () => {
  const inputUnd: any = undefined;
  const inputEmpty: any = '';

  const tla = new TonalLemmatizationAnalyzer();
  const prmptr = new Prediction();

  const grs1 = tla.graphAnalyze(inputEmpty);
  const prs1 = prmptr.predict(grs1.map(x => x.letter).map(y => y.literal));

  test('check the length of predictions for empty input', () => {
    expect(prs1.length).toEqual(0);
  });

  const grs2 = tla.graphAnalyze(inputUnd);
  const prs2 = prmptr.predict(grs2.map(x => x.letter).map(y => y.literal));

  test('check the length of predictions for undefined input', () => {
    expect(prs2.length).toEqual(0);
  });
});

describe('Prediction testing', () => {
  const gm = new GraphemeMaker(lowerLettersTonal);
  const prmptr = new Prediction();

  const grs1 = gm.makeGraphemes('s');
  const prs1 = prmptr.predict(grs1.map(x => x.letter).map(y => y.literal));

  test('check the length of predictions', () => {
    expect(prs1.length).toEqual(7);
  });

  const grs2 = gm.makeGraphemes('so');
  const prs2 = prmptr.predict(grs2.map(x => x.letter).map(y => y.literal));

  test('check the length of predictions', () => {
    expect(prs2.length).toEqual(5);
  });

  const grs3 = gm.makeGraphemes('soa');
  const prs3 = prmptr.predict(grs3.map(x => x.letter).map(y => y.literal));

  test('check the length of predictions', () => {
    expect(prs3.length).toEqual(6);
  });

  const grs4 = gm.makeGraphemes('soai');
  const prs4 = prmptr.predict(grs4.map(x => x.letter).map(y => y.literal));

  test('check the length of predictions', () => {
    expect(prs4.length).toEqual(0);
  });

  const grs5 = gm.makeGraphemes('soainn');
  const prs5 = prmptr.predict(grs5.map(x => x.letter).map(y => y.literal));

  test('check the length of predictions', () => {
    expect(prs5.length).toEqual(1);
  });
});
