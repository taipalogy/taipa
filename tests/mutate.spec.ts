import { mutateInitialFollowingSyllable } from '../src/dparser/mutator';
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
  /*
  const lx = unmutateInitialFollowingSyllable('dittwlitt');

  test('check the surface form', () => {
    expect(lx.word.literal).toEqual('dittwlitt');
  });

  test('check the underlying form', () => {
    expect(lx.getForms()[0].literal).toEqual('dittwditt');
  });
  */
});
