import {
  infectFollowingSyllable,
  infectFollowingWord,
} from '../src/change/infector';
import {
  uninfectFollowingSyllable,
  uninfectFollowingWord,
} from '../src/unchange/uninfector';

describe('Infection testing, nasalization', () => {
  const lx = infectFollowingSyllable('ennxiay');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('ennxiay');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('ennxianny');
  });
});

describe('Uninfection testing, nasalization', () => {
  const lx = uninfectFollowingSyllable('ennxianny');

  test('check the surface form', () => {
    expect(lx.word.literal).toEqual('ennxianny');
  });

  test('check the underlying form', () => {
    expect(lx.getForms()[0].literal).toEqual('ennxiay');
  });
});

describe('Infection testing, nasalization', () => {
  const phr = infectFollowingWord('cinn', 'e');

  test('check the underlying form', () => {
    expect(phr.phrase.literal).toEqual('cinn e');
  });

  test('check the surface form', () => {
    expect(phr.getForms()[0].literal).toEqual('cinn enn');
  });
});

describe('Uninfection testing, nasalization', () => {
  const phr = uninfectFollowingWord('cinn', 'enn');

  test('check the surface form', () => {
    expect(phr.phrase.literal).toEqual('cinn enn');
  });

  test('check the underlying form', () => {
    expect(phr.getForms()[0].literal).toEqual('cinn e');
  });
});

describe('Infection testing, 1 empty word', () => {
  const inputEmpty: any = '';

  const phr1 = infectFollowingSyllable(inputEmpty);

  test('check the empty phrase', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });

  const phr2 = uninfectFollowingSyllable(inputEmpty);

  test('check the empty phrase', () => {
    expect(phr2.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr2.getForms().length).toEqual(0);
  });
});

describe('Infection testing, undefined input', () => {
  const inputUnd: any = undefined;

  const phr1 = infectFollowingSyllable(inputUnd);

  test('check the empty phrase', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an undefined word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });

  const phr2 = uninfectFollowingSyllable(inputUnd);

  test('check the empty phrase', () => {
    expect(phr2.word.literal).toEqual('');
  });

  test('check the number of other forms of an undefined word', () => {
    expect(phr2.getForms().length).toEqual(0);
  });
});

describe('Phrasal infection testing, 2 empty words, 1 empty phrase', () => {
  const inputEmpty: any = '';

  const ph1 = infectFollowingWord(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph1.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph1.getForms().length).toEqual(0);
  });

  const ph2 = uninfectFollowingWord(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph2.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph2.getForms().length).toEqual(0);
  });
});

describe('Phrasal infection testing, undefined input', () => {
  const inputUnd: any = undefined;

  const ph1 = infectFollowingWord(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph1.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an undefined phrase', () => {
    expect(ph1.getForms().length).toEqual(0);
  });

  const ph2 = uninfectFollowingWord(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph2.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an undefined phrase', () => {
    expect(ph2.getForms().length).toEqual(0);
  });
});
