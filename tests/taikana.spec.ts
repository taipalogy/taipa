import { Client } from '../src/client';

describe('Taiwanese kana testing, a', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('a');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ア');
  });

  const ta2 = cli.processTonal('ai');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('アイ');
  });

  const ta3 = cli.processTonal('au');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('アウ');
  });

  const ta4 = cli.processTonal('ak');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('アㇰ');
  });

  const ta5 = cli.processTonal('at');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('アッ');
  });

  const ta6 = cli.processTonal('an');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('アヌ');
  });

  const ta7 = cli.processTonal('ap');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('アㇷ゚');
  });

  const ta8 = cli.processTonal('am');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('アム');
  });

  const ta9 = cli.processTonal('ang');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('アン');
  });
});

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
