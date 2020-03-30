import { lemmatize } from '../src/tonal/lemmatizer';

describe('Syllable composition testing', () => {
  const lx = lemmatize('a');

  test('check the syllable composition. v.', () => {
    expect(lx.word.literal).toEqual('a');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('ai');

  test('check the syllable composition. v.', () => {
    expect(lx.word.literal).toEqual('ai');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('oai');

  test('check the syllable composition. v.', () => {
    expect(lx.word.literal).toEqual('oai');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('ng');

  test('check the syllable composition. m.', () => {
    expect(lx.word.literal).toEqual('ng');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('aiy');

  test('check the syllable composition. vt.', () => {
    expect(lx.word.literal).toEqual('aiy');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('mz');

  test('check the syllable composition. mt.', () => {
    expect(lx.word.literal).toEqual('mz');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('qoai');

  test('check the syllable composition. cv.', () => {
    expect(lx.word.literal).toEqual('qoai');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('iahh');

  test('check the syllable composition. vc.', () => {
    expect(lx.word.literal).toEqual('iahh');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('ang');

  test('check the syllable composition. vc.', () => {
    expect(lx.word.literal).toEqual('ang');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('akf');

  test('check the syllable composition. vc.', () => {
    expect(lx.word.literal).toEqual('akf');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('angz');

  test('check the syllable composition. vc.', () => {
    expect(lx.word.literal).toEqual('angz');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('qoaiw');

  test('check the syllable composition. cvt.', () => {
    expect(lx.word.literal).toEqual('qoaiw');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('sip');

  test('check the syllable composition. cvc.', () => {
    expect(lx.word.literal).toEqual('sip');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('seng');

  test('check the syllable composition. cvc.', () => {
    expect(lx.word.literal).toEqual('seng');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('sipf');

  test('check the syllable composition. cvct.', () => {
    expect(lx.word.literal).toEqual('sipf');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('sengx');

  test('check the syllable composition. cvct.', () => {
    expect(lx.word.literal).toEqual('sengx');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('qng');

  test('check the syllable composition. cc.', () => {
    expect(lx.word.literal).toEqual('qng');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('qngy');

  test('check the syllable composition. cct.', () => {
    expect(lx.word.literal).toEqual('qngy');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('hngh');

  test('check the syllable composition. ccc.', () => {
    expect(lx.word.literal).toEqual('hngh');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('hmhhw');

  test('check the syllable composition. ccct.', () => {
    expect(lx.word.literal).toEqual('hmhhw');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('enn');

  test('check the syllable composition. vn.', () => {
    expect(lx.word.literal).toEqual('enn');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('ennx');

  test('check the syllable composition. vnt.', () => {
    expect(lx.word.literal).toEqual('ennx');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('senn');

  test('check the syllable composition. cvn.', () => {
    expect(lx.word.literal).toEqual('senn');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('sennw');

  test('check the syllable composition. cvnt.', () => {
    expect(lx.word.literal).toEqual('sennw');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('hiannh');

  test('check the syllable composition. cvnc.', () => {
    expect(lx.word.literal).toEqual('hiannh');
  });
});

describe('Syllable composition testing', () => {
  const lx = lemmatize('hiannhy');

  test('check the syllable composition. cvnct.', () => {
    expect(lx.word.literal).toEqual('hiannhy');
  });
});
