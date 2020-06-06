import {
  infectFollowingSyllable,
  infectFollowingWord,
} from '../src/dparser/infector';
import {
  uninfectFollowingSyllable,
  uninfectFollowingWord,
} from '../src/tonal/uninfector';

describe('Infection testing, nasalization', () => {
  const lx = infectFollowingSyllable('ennxiay');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('ennxiay');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('ennxianny');
  });
});

describe('Infection testing, nasalization', () => {
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

describe('Infection testing, nasalization', () => {
  const phr = uninfectFollowingWord('cinn', 'enn');

  test('check the surface form', () => {
    expect(phr.phrase.literal).toEqual('cinn enn');
  });

  test('check the underlying form', () => {
    expect(phr.getForms()[0].literal).toEqual('cinn e');
  });
});
