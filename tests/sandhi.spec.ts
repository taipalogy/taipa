import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { assimilateRegressiveLexical } from '../src/dparser/assimilator';

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
  const lx1 = assimilateRegressiveLexical('lakkwex');

  test('chech the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('laggwex');
  });

  const lx2 = assimilateRegressiveLexical('chappwex');

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
