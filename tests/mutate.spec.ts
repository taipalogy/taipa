import {
  mutateInitialFollowingSyllable,
  mutateFinalOfPrecedingWord,
} from '../src/dparser/mutator';
import { unmutateInitialFollowingSyllable } from '../src/tonal/unmutator';

describe('Consonant mutation testing, agressive, duplifix', () => {
  const lx = mutateInitialFollowingSyllable('dittwditt');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('dittwditt');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('dittwlitt');
  });
});

describe('Consonant mutation testing, agressive, duplifix', () => {
  const lx = unmutateInitialFollowingSyllable('dittwlitt');

  test('check the surface form', () => {
    expect(lx.word.literal).toEqual('dittwlitt');
  });

  test('check the underlying form', () => {
    expect(lx.getForms()[0].literal).toEqual('dittwditt');
  });
});

describe('Consonant mutation testing, regressive, final consonant', () => {
  const phr = mutateFinalOfPrecedingWord('chittw', 'giahh');

  test('check the underlying form', () => {
    expect(phr.phrase.literal).toEqual('chittw giahh');
  });

  test('check the surface form', () => {
    expect(phr.getForms()[0].literal).toEqual('chiggw giahh');
  });
});
