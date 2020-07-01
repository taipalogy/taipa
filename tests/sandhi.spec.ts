import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { mutateFinalOfPrecedingSyllable } from '../src/dparser/mutator';

describe('Epenthesis testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('sutflay');

  test('check the consonant', () => {
    expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.l);
  });
});

describe('Epenthesis testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('jiokkxgay');

  test('check the consonant', () => {
    expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.g);
  });
});

describe('Epenthesis testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('qapfbay');

  test('check the consonant', () => {
    expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.b);
  });
});

describe('Epenthesis testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('qamxmay');

  test('check the consonant', () => {
    expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.m);
  });
});

describe('Epenthesis testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('soanfnay');

  test('check the consonant', () => {
    expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.n);
  });
});

describe('Voiced final testing', () => {
  const lx1 = mutateFinalOfPrecedingSyllable('lakkwex');

  test('chech the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('laggwex');
  });

  const lx2 = mutateFinalOfPrecedingSyllable('chappwex');

  test('chech the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('chabbwex');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('siurfsiurzsiur');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('siur');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('sanfsanfsany');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('sany');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('samysamysamw');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('samw');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('sipfsipfsip');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('sip');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('angfangwangx');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('angx');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('qufquwquz');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('quz');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('sittxsittwsitt');

  test('check the uncombining form', () => {
    expect(ta.uncombiningSequences[0]).toContain('sitt');
  });
});

describe('Consonant mutation testing, sandhi pp', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('sannzamhhwqauy');

  test('check the uncombining form', () => {
    expect(ta1.uncombiningSequences[1]).toContain('app');
  });

  test('check the consonant', () => {
    expect(ta1.soundSequences[1][1].toString()).toEqual(TonalLetterTags.m);
    expect(ta1.soundSequences[1][2].toString()).toEqual(TonalLetterTags.hh);
  });

  const ta2 = cli.processTonal('hinhfnix');

  test('check the uncombining form', () => {
    expect(ta2.uncombiningSequences[0]).toContain('hit');
  });

  test('check the consonant', () => {
    expect(ta2.soundSequences[0][2].toString()).toEqual(TonalLetterTags.n);
    expect(ta2.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });

  const ta3 = cli.processTonal('vunghfngay');

  test('check the uncombining form', () => {
    expect(ta3.uncombiningSequences[0]).toContain('vut');
  });

  test('check the consonant', () => {
    expect(ta3.soundSequences[0][2].toString()).toEqual(TonalLetterTags.ng);
    expect(ta3.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });

  const ta4 = cli.processTonal('chimhhwmix');

  test('check the uncombining form', () => {
    expect(ta4.uncombiningSequences[0]).toContain('chitt');
  });

  test('check the consonant', () => {
    expect(ta4.soundSequences[0][2].toString()).toEqual(TonalLetterTags.m);
    expect(ta4.soundSequences[0][3].toString()).toEqual(TonalLetterTags.hh);
  });
});
