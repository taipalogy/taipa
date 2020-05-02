import { infectAgressiveLexical } from '../src/dparser/infector';

describe('Infection testing, nasalization', () => {
  const lx = infectAgressiveLexical('ennxiay');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('ennxiay');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('ennxianny');
  });
});
