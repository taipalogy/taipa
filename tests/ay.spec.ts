import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';

describe('Ay testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('sutflay');

  test('check the free tonal y', () => {
    expect(ta1.letterSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta2 = cli.processTonal('sutfay');

  test('check the free tonal y', () => {
    expect(ta2.letterSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });

  const ta3 = cli.processTonal('chimfmay');

  test('check the free tonal y', () => {
    expect(ta3.letterSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta4 = cli.processTonal('chimxmay');

  test('check the free tonal y', () => {
    expect(ta4.letterSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta5 = cli.processTonal('apxbay');

  test('check the free tonal y', () => {
    expect(ta5.letterSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta6 = cli.processTonal('apxay');

  test('check the free tonal y', () => {
    expect(ta6.letterSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });

  const ta7 = cli.processTonal('tekxgay');

  test('check the free tonal y', () => {
    expect(ta7.letterSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta8 = cli.processTonal('tekxay');

  test('check the free tonal y', () => {
    expect(ta8.letterSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });

  const ta9 = cli.processTonal('catxlay');

  test('check the free tonal y', () => {
    expect(ta9.letterSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta10 = cli.processTonal('catxay');

  test('check the free tonal y', () => {
    expect(ta10.letterSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('kexay');

  test('check the uncombining form', () => {
    expect(ta1.uncombiningSequences[0]).toContain('ke');
  });

  const ta2 = cli.processTonal('buefay');

  test('check the uncombining form', () => {
    expect(ta2.uncombiningSequences[0]).toContain('buey');
  });

  const ta3 = cli.processTonal('paufay');

  test('check the uncombining form', () => {
    expect(ta3.uncombiningSequences[0]).toContain('pauw');
  });

  const ta4 = cli.processTonal('koxay');

  test('check the uncombining form', () => {
    expect(ta4.uncombiningSequences[0]).toContain('kox');
  });

  const ta5 = cli.processTonal('huexay');

  test('check the uncombining form', () => {
    expect(ta5.uncombiningSequences[0]).toContain('huez');
  });

  const ta6 = cli.processTonal('mihfay');

  test('check the uncombining form', () => {
    expect(ta6.uncombiningSequences[0]).toContain('mih');
  });

  const ta7 = cli.processTonal('hiurhxay');

  test('check the uncombining form', () => {
    expect(ta7.uncombiningSequences[0]).toContain('hiurhh');
  });

  const ta8 = cli.processTonal('citfay');

  test('check the uncombining form', () => {
    expect(ta8.uncombiningSequences[0]).toContain('cit');
  });

  const ta9 = cli.processTonal('puatxay');

  test('check the uncombining form', () => {
    expect(ta9.uncombiningSequences[0]).toContain('puatt');
  });

  const ta10 = cli.processTonal('kakfay');

  test('check the uncombining form', () => {
    expect(ta10.uncombiningSequences[0]).toContain('kak');
  });

  const ta11 = cli.processTonal('lokxay');

  test('check the uncombining form', () => {
    expect(ta11.uncombiningSequences[0]).toContain('lokk');
  });

  const ta12 = cli.processTonal('kapfay');

  test('check the uncombining form', () => {
    expect(ta12.uncombiningSequences[0]).toContain('kap');
  });

  const ta13 = cli.processTonal('liapxay');

  test('check the uncombining form', () => {
    expect(ta13.uncombiningSequences[0]).toContain('liapp');
  });
});

describe('NGay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('putfngay');

  test('check the uncombining form', () => {
    expect(ta1.uncombiningSequences[0]).toContain('put');
  });

  const ta2 = cli.processTonal('angzchuay');

  test('check the uncombining form', () => {
    expect(ta2.uncombiningSequences[0]).toContain('angx');
  });
});
