import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/tonalres';

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

  const ta7 = cli.processTonal('tekxgay');

  test('check the free tonal y', () => {
    expect(ta7.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta8 = cli.processTonal('tekxay');

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

describe('Ay testing, standalone form of the first syllable', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('kexay');

  test('check the standalone form', () => {
    expect(ta1.standaloneSequences[0]).toContain('ke');
  });

  const ta2 = cli.processTonal('buefay');

  test('check the standalone form', () => {
    expect(ta2.standaloneSequences[0]).toContain('buey');
  });

  const ta3 = cli.processTonal('paufay');

  test('check the standalone form', () => {
    expect(ta3.standaloneSequences[0]).toContain('pauw');
  });

  const ta4 = cli.processTonal('koxay');

  test('check the standalone form', () => {
    expect(ta4.standaloneSequences[0]).toContain('kox');
  });

  const ta5 = cli.processTonal('huexay');

  test('check the standalone form', () => {
    expect(ta5.standaloneSequences[0]).toContain('huez');
  });

  const ta6 = cli.processTonal('mihfay');

  test('check the standalone form', () => {
    expect(ta6.standaloneSequences[0]).toContain('mih');
  });

  const ta7 = cli.processTonal('hiurhxay');

  test('check the standalone form', () => {
    expect(ta7.standaloneSequences[0]).toContain('hiurhh');
  });

  const ta8 = cli.processTonal('citfay');

  test('check the standalone form', () => {
    expect(ta8.standaloneSequences[0]).toContain('cit');
  });

  const ta9 = cli.processTonal('puatxay');

  test('check the standalone form', () => {
    expect(ta9.standaloneSequences[0]).toContain('puatt');
  });

  const ta10 = cli.processTonal('kakfay');

  test('check the standalone form', () => {
    expect(ta10.standaloneSequences[0]).toContain('kak');
  });

  const ta11 = cli.processTonal('lokxay');

  test('check the standalone form', () => {
    expect(ta11.standaloneSequences[0]).toContain('lokk');
  });

  const ta12 = cli.processTonal('kapfay');

  test('check the standalone form', () => {
    expect(ta12.standaloneSequences[0]).toContain('kap');
  });

  const ta13 = cli.processTonal('liapxay');

  test('check the standalone form', () => {
    expect(ta13.standaloneSequences[0]).toContain('liapp');
  });
});

describe('NGay testing, standalone form of the first syllable', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('putfngay');

  test('check the standalone form', () => {
    expect(ta1.standaloneSequences[0]).toContain('put');
  });

  const ta2 = cli.processTonal('angzchuay');

  test('check the standalone form', () => {
    expect(ta2.standaloneSequences[0]).toContain('angx');
  });
});
