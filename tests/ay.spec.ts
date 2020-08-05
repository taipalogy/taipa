import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe('Ay testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('sutflay');

  test('check the free tonal y', () => {
    expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('sutfay');

  test('check the free tonal y', () => {
    expect(ta.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('chimfmay');

  test('check the free tonal y', () => {
    expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('chimxmay');

  test('check the free tonal y', () => {
    expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('apxbay');

  test('check the free tonal y', () => {
    expect(ta1.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta2 = cli.processTonal('apxay');

  test('check the free tonal y', () => {
    expect(ta2.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('dekxgay');

  test('check the free tonal y', () => {
    expect(ta1.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta2 = cli.processTonal('dekxay');

  test('check the free tonal y', () => {
    expect(ta2.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('catxlay');

  test('check the free tonal y', () => {
    expect(ta1.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
  });

  const ta2 = cli.processTonal('catxay');

  test('check the free tonal y', () => {
    expect(ta2.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('qexay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('qe');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('boefay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('boey');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('paufay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('pauw');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('qoxay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('qox');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('hoexay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('hoez');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('mihfay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('mih');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('hiurhxay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('hiurh');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('citfay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('cit');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('voatxay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('voat');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('qakfay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('qak');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('lokxay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('lok');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('qapfay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('qap');
  });
});

describe('Ay testing, uncombining form of the first syllable', () => {
  const cli = new Client();

  const ta = cli.processTonal('liapxay');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('liap');
  });
});
