import { Client } from '../src/client';

describe('Taiwanese kana testing, qa', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('qa');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('カア');
  });

  const ta2 = cli.processTonal('qai');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('カイ');
  });

  const ta3 = cli.processTonal('qau');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('カウ');
  });

  const ta4 = cli.processTonal('qak');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('カㇰ');
  });

  const ta5 = cli.processTonal('qat');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('カッ');
  });

  const ta6 = cli.processTonal('qan');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('カヌ');
  });

  const ta7 = cli.processTonal('qap');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('カㇷ゚');
  });

  const ta8 = cli.processTonal('qam');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('カム');
  });

  const ta9 = cli.processTonal('qang');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('カン');
  });
});

describe('Taiwanese kana testing, ga', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ga');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ガア');
  });

  const ta2 = cli.processTonal('gai');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ガイ');
  });

  const ta3 = cli.processTonal('gak');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ガㇰ');
  });

  const ta4 = cli.processTonal('gan');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('ガヌ');
  });

  const ta5 = cli.processTonal('gap');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('ガㇷ゚');
  });

  const ta6 = cli.processTonal('gang');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ガン');
  });
});

describe('Taiwanese kana testing, qi', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('qia');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('キア');
  });

  const ta2 = cli.processTonal('qiau');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('キァウ');
  });

  const ta3 = cli.processTonal('qiak');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('キァㇰ');
  });

  const ta4 = cli.processTonal('qiap');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('キァㇷ゚');
  });

  const ta5 = cli.processTonal('qiam');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('キァム');
  });

  const ta6 = cli.processTonal('qiang');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('キァン');
  });

  const ta7 = cli.processTonal('qi');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('キイ');
  });

  const ta8 = cli.processTonal('qiu');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('キウ');
  });

  const ta9 = cli.processTonal('qek');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('キェㇰ');
  });

  const ta10 = cli.processTonal('qiet');

  test('kanas', () => {
    expect(ta10.blockSequences[0]).toEqual('キェッ');
  });

  const ta11 = cli.processTonal('qien');

  test('kanas', () => {
    expect(ta11.blockSequences[0]).toEqual('キェヌ');
  });

  const ta12 = cli.processTonal('qeng');

  test('kanas', () => {
    expect(ta12.blockSequences[0]).toEqual('キェン');
  });

  const ta13 = cli.processTonal('qio');

  test('kanas', () => {
    expect(ta13.blockSequences[0]).toEqual('キオ');
  });

  const ta14 = cli.processTonal('qiok');

  test('kanas', () => {
    expect(ta14.blockSequences[0]).toEqual('キォㇰ');
  });

  const ta15 = cli.processTonal('qiong');

  test('kanas', () => {
    expect(ta15.blockSequences[0]).toEqual('キォン');
  });

  const ta16 = cli.processTonal('qiur');

  test('kanas', () => {
    expect(ta16.blockSequences[0]).toEqual('キヲ');
  });

  const ta17 = cli.processTonal('qit');

  test('kanas', () => {
    expect(ta17.blockSequences[0]).toEqual('キッ');
  });

  const ta18 = cli.processTonal('qin');

  test('kanas', () => {
    expect(ta18.blockSequences[0]).toEqual('キヌ');
  });

  const ta19 = cli.processTonal('qip');

  test('kanas', () => {
    expect(ta19.blockSequences[0]).toEqual('キㇷ゚');
  });

  const ta20 = cli.processTonal('qim');

  test('kanas', () => {
    expect(ta20.blockSequences[0]).toEqual('キム');
  });
});
