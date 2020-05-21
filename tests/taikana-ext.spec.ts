import { Client } from '../src/client';

describe('Taiwanese kana testing, nasalization', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('enn');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('㋓');
  });

  const ta2 = cli.processTonal('ianny');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('㋑ア⎛');
  });

  const ta3 = cli.processTonal('annw');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('㋐⎝');
  });

  const ta4 = cli.processTonal('iunnx');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('㋑ウ⟨');
  });

  const ta5 = cli.processTonal('ainnz');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('㋐イ⎸');
  });
  /*
  const ta6 = cli.processTonal('hiannh');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('㋪ァ');
  });
  */
});
