import { Client } from '../src/client';

describe('Taiwanese kana testing, a', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('a');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('アア');
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

describe('Taiwanese kana testing, i', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ia');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('イア');
  });

  const ta2 = cli.processTonal('iau');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('イァウ');
  });

  const ta3 = cli.processTonal('iak');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('イァㇰ');
  });

  const ta4 = cli.processTonal('iap');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('イァㇷ゚');
  });

  const ta5 = cli.processTonal('iam');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('イァム');
  });

  const ta6 = cli.processTonal('i');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('イイ');
  });

  const ta7 = cli.processTonal('iu');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('イウ');
  });

  const ta8 = cli.processTonal('ek');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('イェㇰ');
  });

  const ta9 = cli.processTonal('iet');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('イェッ');
  });

  const ta10 = cli.processTonal('ien');

  test('kanas', () => {
    expect(ta10.blockSequences[0]).toEqual('イェヌ');
  });

  const ta11 = cli.processTonal('eng');

  test('kanas', () => {
    expect(ta11.blockSequences[0]).toEqual('イェン');
  });

  const ta12 = cli.processTonal('ionn');

  test('kanas', () => {
    expect(ta12.blockSequences[0]).toEqual('㋑オ');
  });

  const ta13 = cli.processTonal('iok');

  test('kanas', () => {
    expect(ta13.blockSequences[0]).toEqual('イォㇰ');
  });

  const ta14 = cli.processTonal('iong');

  test('kanas', () => {
    expect(ta14.blockSequences[0]).toEqual('イォン');
  });

  const ta15 = cli.processTonal('iur');

  test('kanas', () => {
    expect(ta15.blockSequences[0]).toEqual('イヲ');
  });

  const ta16 = cli.processTonal('it');

  test('kanas', () => {
    expect(ta16.blockSequences[0]).toEqual('イッ');
  });

  const ta17 = cli.processTonal('in');

  test('kanas', () => {
    expect(ta17.blockSequences[0]).toEqual('イヌ');
  });

  const ta18 = cli.processTonal('ip');

  test('kanas', () => {
    expect(ta18.blockSequences[0]).toEqual('イㇷ゚');
  });

  const ta19 = cli.processTonal('im');

  test('kanas', () => {
    expect(ta19.blockSequences[0]).toEqual('イム');
  });
});

describe('Taiwanese kana testing, u', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ui');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ウイ');
  });

  const ta2 = cli.processTonal('u');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ウウ');
  });

  const ta3 = cli.processTonal('ut');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ウッ');
  });

  const ta4 = cli.processTonal('un');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('ウヌ');
  });
});

describe('Taiwanese kana testing, ir', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('iri');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ウ̅イ');
  });

  const ta2 = cli.processTonal('ir');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ウ̅ウ̅');
  });

  const ta3 = cli.processTonal('irn');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ウ̅ヌ');
  });
});

describe('Taiwanese kana testing, e', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('e');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('エエ');
  });

  const ta2 = cli.processTonal('erng');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('エン');
  });
});

describe('Taiwanese kana testing, o', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('o');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('オオ');
  });

  const ta2 = cli.processTonal('ok');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('オㇰ');
  });

  const ta3 = cli.processTonal('op');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('オㇷ゚');
  });

  const ta4 = cli.processTonal('om');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('オム');
  });

  const ta5 = cli.processTonal('ong');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('オン');
  });
});

describe('Taiwanese kana testing, or', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ore');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('オ̅エ');
  });

  const ta2 = cli.processTonal('or');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('オ̅オ̅');
  });
});

describe('Taiwanese kana testing, ur', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('oa');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ヲア');
  });

  const ta2 = cli.processTonal('oai');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ヲァイ');
  });

  const ta3 = cli.processTonal('oak');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ヲァㇰ');
  });

  const ta4 = cli.processTonal('oat');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('ヲァッ');
  });

  const ta5 = cli.processTonal('oan');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('ヲァヌ');
  });

  const ta6 = cli.processTonal('oang');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ヲァン');
  });

  const ta7 = cli.processTonal('oe');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('ヲエ');
  });

  const ta8 = cli.processTonal('ur');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('ヲヲ');
  });
});

describe('Taiwanese kana testing, nasalization', () => {
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

describe('Taiwanese kana testing, a', () => {
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
