import { mutateFollowingAffix } from '../src/dparser/mutator';

describe('Consonant mutation testing, agressive, duplifix', () => {
  const lx = mutateFollowingAffix('dittwditt');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('dittwditt');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('dittwlitt');
  });
});
