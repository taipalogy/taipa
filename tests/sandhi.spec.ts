import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TonalInflector } from '../src/dparser/inflector';
import { TonalAssimilator } from '../src/dparser/assimilator';
import { TonalInserter } from '../src/dparser/inserter';

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
  const assimi = new TonalAssimilator();

  const lx1 = assimi.assimilateRegressive('lakkwex');

  test('chech the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('laggwex');
  });

  const lx2 = assimi.assimilateRegressive('chappwex');

  test('chech the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('chabbwex');
  });
});

describe('Epenthesis testing', () => {
  const inst = new TonalInserter();

  const lx1 = inst.insertTo('qimxay');

  test('check the epenthesis of initial m', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxmay');
  });

  const lx2 = inst.insertTo('infay');

  test('check the epenthesis of initial n', () => {
    expect(lx2.getForms()[0].literal).toEqual('infnay');
  });

  const lx3 = inst.insertTo('cangxay');

  test('check the epenthesis of initial ng', () => {
    expect(lx3.getForms()[0].literal).toEqual('cangxngay');
  });
});

describe('Epenthesis testing', () => {
  const infl = new TonalInflector();

  const lx1 = infl.inflectDesinence('qimxay');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxa');
  });

  const inst = new TonalInserter();

  const lx2 = inst.insertTo(lx1.getForms()[0].literal);

  test('check the epenthesis of initial m. surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('qimxma');
  });

  const lx3 = inst.insertTo('qimza');

  test('check the epenthesis of initial m', () => {
    expect(lx3.getForms()[0].literal).toEqual('qimzma');
  });

  const lx4 = inst.insertTo('ginfa');

  test('check the epenthesis of initial n', () => {
    expect(lx4.getForms()[0].literal).toEqual('ginfna');
  });

  const lx5 = inst.insertTo('tangza');

  test('check the epenthesis of initial ng', () => {
    expect(lx5.getForms()[0].literal).toEqual('tangznga');
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
