import { lemmatize } from '../src/unchange/lemmatizer';

describe('Syllable spelling testing', () => {
  const lx1 = lemmatize('a');

  test('check the syllable spelling. v.', () => {
    expect(lx1.word.literal).toEqual('a');
  });

  const lx2 = lemmatize('ai');

  test('check the syllable spelling. v.', () => {
    expect(lx2.word.literal).toEqual('ai');
  });

  const lx3 = lemmatize('uai');

  test('check the syllable spelling. v.', () => {
    expect(lx3.word.literal).toEqual('uai');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('ng');

  test('check the syllable spelling. m.', () => {
    expect(lx.word.literal).toEqual('ng');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('aiy');

  test('check the syllable spelling. vt.', () => {
    expect(lx.word.literal).toEqual('aiy');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('mz');

  test('check the syllable spelling. mt.', () => {
    expect(lx.word.literal).toEqual('mz');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('kuai');

  test('check the syllable spelling. cv.', () => {
    expect(lx.word.literal).toEqual('kuai');
  });
});

describe('Syllable spelling testing', () => {
  const lx1 = lemmatize('iahh');

  test('check the syllable spelling. vc.', () => {
    expect(lx1.word.literal).toEqual('iahh');
  });

  const lx2 = lemmatize('ang');

  test('check the syllable spelling. vc.', () => {
    expect(lx2.word.literal).toEqual('ang');
  });

  const lx3 = lemmatize('akf');

  test('check the syllable spelling. vc.', () => {
    expect(lx3.word.literal).toEqual('akf');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('angz');

  test('check the syllable spelling. vct.', () => {
    expect(lx.word.literal).toEqual('angz');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('kuaiw');

  test('check the syllable spelling. cvt.', () => {
    expect(lx.word.literal).toEqual('kuaiw');
  });
});

describe('Syllable spelling testing', () => {
  const lx1 = lemmatize('sip');

  test('check the syllable spelling. cvc.', () => {
    expect(lx1.word.literal).toEqual('sip');
  });

  const lx2 = lemmatize('sing');

  test('check the syllable spelling. cvc.', () => {
    expect(lx2.word.literal).toEqual('sing');
  });
});

describe('Syllable spelling testing', () => {
  const lx1 = lemmatize('sipf');

  test('check the syllable spelling. cvct.', () => {
    expect(lx1.word.literal).toEqual('sipf');
  });

  const lx2 = lemmatize('singx');

  test('check the syllable spelling. cvct.', () => {
    expect(lx2.word.literal).toEqual('singx');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('langh');

  test('check the syllable spelling. cvcc.', () => {
    expect(lx.word.literal).toEqual('langh');
  });
});

describe('Syllable spelling testing', () => {
  const word = 'amhw';
  const lx = lemmatize(word);

  // there is no tests for vcc. e.g. amhh
  test('check the syllable spelling. vcct.', () => {
    expect(lx.word.literal).toEqual(word);
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('kng');

  test('check the syllable spelling. cc.', () => {
    expect(lx.word.literal).toEqual('kng');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('kngy');

  test('check the syllable spelling. cct.', () => {
    expect(lx.word.literal).toEqual('kngy');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('hngh');

  test('check the syllable spelling. ccc.', () => {
    expect(lx.word.literal).toEqual('hngh');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('hmhw');

  test('check the syllable spelling. ccct.', () => {
    expect(lx.word.literal).toEqual('hmhw');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('enn');

  test('check the syllable spelling. vn.', () => {
    expect(lx.word.literal).toEqual('enn');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('ennx');

  test('check the syllable spelling. vnt.', () => {
    expect(lx.word.literal).toEqual('ennx');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('senn');

  test('check the syllable spelling. cvn.', () => {
    expect(lx.word.literal).toEqual('senn');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('sennw');

  test('check the syllable spelling. cvnt.', () => {
    expect(lx.word.literal).toEqual('sennw');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('hiannh');

  test('check the syllable spelling. cvnc.', () => {
    expect(lx.word.literal).toEqual('hiannh');
  });
});

describe('Syllable spelling testing', () => {
  const lx = lemmatize('hiannhy');

  test('check the syllable spelling. cvnct.', () => {
    expect(lx.word.literal).toEqual('hiannhy');
  });
});
