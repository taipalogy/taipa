import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';

describe('Ay testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('sutflay');

  test('check the free tonal y', () => {
    expect(ta1.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta2 = cli.processTonal('sutfay');

  test('check the free tonal y', () => {
    expect(ta2.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });

  const ta3 = cli.processTonal('chimfmay');

  test('check the free tonal y', () => {
    expect(ta3.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta4 = cli.processTonal('chimxmay');

  test('check the free tonal y', () => {
    expect(ta4.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta5 = cli.processTonal('apxbay');

  test('check the free tonal y', () => {
    expect(ta5.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta6 = cli.processTonal('apxay');

  test('check the free tonal y', () => {
    expect(ta6.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });

  const ta7 = cli.processTonal('dekxgay');

  test('check the free tonal y', () => {
    expect(ta7.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta8 = cli.processTonal('dekxay');

  test('check the free tonal y', () => {
    expect(ta8.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });

  const ta9 = cli.processTonal('catxlay');

  test('check the free tonal y', () => {
    expect(ta9.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta10 = cli.processTonal('catxay');

  test('check the free tonal y', () => {
    expect(ta10.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('qexay');

  test('check the uncombining form', () => {
    expect(ta1.uncombiningSequences[0]).toContain('qe');
  });

  const ta2 = cli.processTonal('boefay');

  test('check the uncombining form', () => {
    expect(ta2.uncombiningSequences[0]).toContain('boey');
  });

  const ta3 = cli.processTonal('paufay');

  test('check the uncombining form', () => {
    expect(ta3.uncombiningSequences[0]).toContain('pauw');
  });

  const ta4 = cli.processTonal('qoxay');

  test('check the uncombining form', () => {
    expect(ta4.uncombiningSequences[0]).toContain('qox');
  });

  const ta5 = cli.processTonal('hoexay');

  test('check the uncombining form', () => {
    expect(ta5.uncombiningSequences[0]).toContain('hoez');
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

  const ta9 = cli.processTonal('voatxay');

  test('check the uncombining form', () => {
    expect(ta9.uncombiningSequences[0]).toContain('voatt');
  });

  const ta10 = cli.processTonal('qakfay');

  test('check the uncombining form', () => {
    expect(ta10.uncombiningSequences[0]).toContain('qak');
  });

  const ta11 = cli.processTonal('lokxay');

  test('check the uncombining form', () => {
    expect(ta11.uncombiningSequences[0]).toContain('lokk');
  });

  const ta12 = cli.processTonal('qapfay');

  test('check the uncombining form', () => {
    expect(ta12.uncombiningSequences[0]).toContain('qap');
  });

  const ta13 = cli.processTonal('liapxay');

  test('check the uncombining form', () => {
    expect(ta13.uncombiningSequences[0]).toContain('liapp');
  });
});

describe('NGay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('vutfngay');

  test('check the uncombining form', () => {
    expect(ta1.uncombiningSequences[0]).toContain('vut');
  });

  const ta2 = cli.processTonal('angzchoay');

  test('check the uncombining form', () => {
    expect(ta2.uncombiningSequences[0]).toContain('angx');
  });
});
