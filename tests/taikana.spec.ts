import { Client } from '../src/client';

describe('Taiwanese kana testing, nn, nasalization', () => {
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

  const ta6 = cli.processTonal('hiannh');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('㋪ァ');
  });
});

describe('Taiwanese kana testing, consonants', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('q');

  test('kanas, this lexical root is not available', () => {
    expect(ta1.blockSequences[0]).toEqual('');
  });

  const ta5 = cli.processTonal('qng');

  test('kanas, an initial followed by a nasal final', () => {
    expect(ta5.blockSequences[0]).toEqual('クン');
  });
});

describe('Taiwanese kana testing, vowels', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('a');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('アア');
  });

  const ta2 = cli.processTonal('i');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('イイ');
  });

  const ta3 = cli.processTonal('u');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ウウ');
  });

  const ta4 = cli.processTonal('ir');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('ウ̅ウ̅');
  });

  const ta5 = cli.processTonal('e');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('エエ');
  });

  const ta6 = cli.processTonal('o');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('オオ');
  });

  const ta7 = cli.processTonal('or');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('オ̅オ̅');
  });

  const ta8 = cli.processTonal('ur');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('ヲヲ');
  });
});

describe('Taiwanese kana testing, e and er', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ek');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('イェㇰ');
  });

  const ta2 = cli.processTonal('eng');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('イェン');
  });

  const ta3 = cli.processTonal('erng');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('エン');
  });

  const ta4 = cli.processTonal('qek');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('キェㇰ');
  });

  const ta5 = cli.processTonal('qeng');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('キェン');
  });

  const ta6 = cli.processTonal('qe');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ケエ');
  });
});

describe('Taiwanese kana testing, reduplication of vowels', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('qa');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('カア');
  });
});

describe('Taiwanese kana testing, small form', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('gore');

  test('kanas, reduplication of vowels', () => {
    expect(ta1.blockSequences[0]).toEqual('ゴォ̅エ');
  });

  const ta2 = cli.processTonal('siau');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('シァウ');
  });

  const ta3 = cli.processTonal('oai');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ヲァイ');
  });
});

describe('Taiwanese kana testing, tone letter of check tones', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('qiok');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('キォㇰ');
  });

  const ta2 = cli.processTonal('qiokk');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('キォㇰ﹅');
  });

  const ta3 = cli.processTonal('qiokf');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('キォㇰ⍭');
  });

  const ta4 = cli.processTonal('qiokkx');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('キォㇰ⟨');
  });

  const ta5 = cli.processTonal('qiokkw');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('キォㇰ⎝');
  });
  const ta6 = cli.processTonal('qiurh');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('キ' + '\u{1b166}');
  });

  const ta7 = cli.processTonal('qiurhy');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('キ' + '\u{1b166}' + '⎛');
  });
});

describe('Taiwanese kana testing, unicode', () => {
  test('kanas, katakana letter small letter wo', () => {
    expect('\ud82c\udd66').toEqual('\u{1b166}');
  });
});
