import { predict } from '../src/tonal/prediction';
import { graphAnalyzeTonal } from '../src/unchange/analyzer';
import { GraphemeMaker } from '../src/unit';
import { lowerLettersTonal } from '../src/tonal/tonalalphabet';

describe('Prediction testing', () => {
  const inputUnd: any = undefined;
  const inputEmpty: any = '';

  const grs1 = graphAnalyzeTonal(inputEmpty);
  const prs1 = predict(grs1.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions for empty input', () => {
    expect(prs1.length).toEqual(0);
  });

  const grs2 = graphAnalyzeTonal(inputUnd);
  const prs2 = predict(grs2.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions for undefined input', () => {
    expect(prs2.length).toEqual(0);
  });
});

describe('Prediction testing', () => {
  const gm = new GraphemeMaker(lowerLettersTonal);
  const inputEmpty: any = '';
  const inputUnd: any = undefined;

  const grsEmpty = gm.makeGraphemes(inputEmpty);
  const prsEmpty = predict(grsEmpty.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions', () => {
    expect(prsEmpty.length).toEqual(0);
  });

  const grsUnd = gm.makeGraphemes(inputUnd);
  const prsUnd = predict(grsUnd.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions', () => {
    expect(prsUnd.length).toEqual(0);
  });

  const grs1 = gm.makeGraphemes('s');
  const prs1 = predict(grs1.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions', () => {
    expect(prs1.length).toEqual(9);
  });

  const grs2 = gm.makeGraphemes('so');
  const prs2 = predict(grs2.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions', () => {
    expect(prs2.length).toEqual(6);
  });

  const grs3 = gm.makeGraphemes('sua');
  const prs3 = predict(grs3.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions', () => {
    expect(prs3.length).toEqual(7);
  });

  const grs4 = gm.makeGraphemes('suai');
  const prs4 = predict(grs4.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions', () => {
    expect(prs4.length).toEqual(0);
  });

  const grs5 = gm.makeGraphemes('suainn');
  const prs5 = predict(grs5.map(x => x.letter).map(y => y.literal));
  test('check the length of predictions', () => {
    expect(prs5.length).toEqual(1);
  });
});
