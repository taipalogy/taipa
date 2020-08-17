import { Client } from '../src/client';

describe('Taiwanese kana testing, nn, nasalization', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('enn');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('㋓エ');
  });

  const ta2 = cli.processTonal('ianny');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('㋑ア⎛');
  });

  const ta3 = cli.processTonal('annw');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('㋐ア⎝');
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
    expect(ta6.blockSequences[0]).toEqual('㋪ァ⤆');
  });

  const ta7 = cli.processTonal('siakfpannz');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('シァㇰ⍭㋩゚' + '\u0323' + 'ア⎸');
  });

  const ta8 = cli.processTonal('coann');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('㋞' + '\u0305' + '\u0323' + 'ア');
  });
});

describe('Taiwanese kana testing, consonants', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('q');

  test('kanas, this lexical root is not available. not a mater lectionis', () => {
    expect(ta1.blockSequences[0]).toEqual('');
  });

  const ta2 = cli.processTonal('qng');

  test('kanas, an initial followed by a nasal final', () => {
    expect(ta2.blockSequences[0]).toEqual('クン');
  });

  const ta3 = cli.processTonal('m');

  test('kanas, a mater lectionis', () => {
    expect(ta3.blockSequences[0]).toEqual('ム');
  });

  const ta4 = cli.processTonal('hm');

  test('kanas, an initial followed by a nasal final', () => {
    expect(ta4.blockSequences[0]).toEqual('フム');
  });

  const ta5 = cli.processTonal('mnghwqiannz');

  test('kanas, an initial followed by a nasal final', () => {
    expect(ta5.blockSequences[0]).toEqual('ム' + '\u{1b167}' + '⎝㋖ア⎸');
  });

  const ta6 = cli.processTonal('mihwqiannz');

  test('kanas, an initial followed by a nasal final', () => {
    expect(ta6.blockSequences[0]).toEqual('ミィ⎝㋖ア⎸');
  });

  const ta7 = cli.processTonal('hmh');

  test('kanas, an initial followed by a nasal final', () => {
    expect(ta7.blockSequences[0]).toEqual('フㇺ⤆');
  });

  const ta8 = cli.processTonal('sngh');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('ス' + '\u{1b167}' + '⤆');
  });

  const ta9 = cli.processTonal('ng');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('ン');
  });

  const ta10 = cli.processTonal('nga');

  test('kanas', () => {
    expect(ta10.blockSequences[0]).toEqual('カ゚ア');
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

  const ta9 = cli.processTonal('irn');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('ウ̅ヌ');
  });
});

describe('Taiwanese kana testing, ur', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('urh');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ヲ' + '\u{1b166}' + '⤆');
  });

  const ta2 = cli.processTonal('urhy');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ヲ' + '\u{1b166}' + '⎛');
  });

  const ta3 = cli.processTonal('iur');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('イヲ');
  });

  const ta4 = cli.processTonal('iurh');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('イ' + '\u{1b166}' + '⤆');
  });

  const ta5 = cli.processTonal('iurhy');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('イ' + '\u{1b166}' + '⎛');
  });

  const ta6 = cli.processTonal('chiur');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('チヲ');
  });

  const ta7 = cli.processTonal('urx');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('ヲヲ⟨');
  });
});

describe('Taiwanese kana testing, e and er', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ek');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('イェㇰ⤆');
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
    expect(ta4.blockSequences[0]).toEqual('キェㇰ⤆');
  });

  const ta5 = cli.processTonal('qeng');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('キェン');
  });

  const ta6 = cli.processTonal('qe');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ケエ');
  });

  const ta7 = cli.processTonal('qet');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('ケッ⤆');
  });

  const ta8 = cli.processTonal('qen');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('ケヌ');
  });

  const ta9 = cli.processTonal('liwek');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('リイ⎝イェㇰ⤆');
  });

  const ta10 = cli.processTonal('chiurhweng');

  test('kanas', () => {
    expect(ta10.blockSequences[0]).toEqual('チ' + '\u{1b166}' + '⎝イェン');
  });

  const ta11 = cli.processTonal('ien');

  test('kanas', () => {
    expect(ta11.blockSequences[0]).toEqual('イェヌ');
  });

  const ta12 = cli.processTonal('en');

  test('kanas', () => {
    expect(ta12.blockSequences[0]).toEqual('エヌ');
  });
});

describe('Taiwanese kana testing, replication of kana vowels', () => {
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

  const ta4 = cli.processTonal('siri');
  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('スゥ̅イ');
  });

  const ta5 = cli.processTonal('kiurh');
  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual(
      'キ' + '\u{0323}' + '\u{1b166}' + '⤆'
    );
  });

  const ta6 = cli.processTonal('koany');
  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('コ' + '\u{0323}' + 'ァヌ⎛');
  });
});

describe('Taiwanese kana testing, tone letter of check tones', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('qiok');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('キォㇰ⤆');
    expect(ta1.blockSequences[1]).toEqual('キォㇰ');
  });

  const ta2 = cli.processTonal('qiokk');

  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('キォㇰ⤇');
  });

  const ta3 = cli.processTonal('qiokf');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('キォㇰ⍭');
  });

  const ta4 = cli.processTonal('qiokx');

  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('キォㇰ⟨');
  });

  const ta5 = cli.processTonal('qiokw');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('キォㇰ⎝');
  });

  const ta6 = cli.processTonal('qiurh');

  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('キ' + '\u{1b166}' + '⤆');
    expect(ta6.blockSequences[1]).toEqual('キ' + '\u{1b166}');
  });

  const ta7 = cli.processTonal('qiurhy');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('キ' + '\u{1b166}' + '⎛');
  });

  const ta8 = cli.processTonal('changxx');

  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('サ̅ン⫽');
  });

  const ta9 = cli.processTonal('sangh');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('サ' + '\u{1b167}' + '⤆');
  });

  const ta20 = cli.processTonal('chi');

  test('kanas', () => {
    expect(ta20.blockSequences[0]).toEqual('チイ');
  });

  const ta21 = cli.processTonal('chiy');

  test('kanas', () => {
    expect(ta21.blockSequences[0]).toEqual('チイ⎛');
  });

  const ta22 = cli.processTonal('chiw');

  test('kanas', () => {
    expect(ta22.blockSequences[0]).toEqual('チイ⎝');
  });

  const ta23 = cli.processTonal('chix');

  test('kanas', () => {
    expect(ta23.blockSequences[0]).toEqual('チイ⟨');
  });

  const ta24 = cli.processTonal('chiz');

  test('kanas', () => {
    expect(ta24.blockSequences[0]).toEqual('チイ⎸');
  });
});

describe('Taiwanese kana testing, initials', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('cha');

  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('サ̅ア');
  });

  const ta2 = cli.processTonal('ca');

  test('kanas, サ̣̅ア', () => {
    expect(ta2.blockSequences[0]).toEqual('サ' + '\u0305' + '\u0323' + 'ア');
  });

  const ta3 = cli.processTonal('da');

  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('タア');
  });

  const ta4 = cli.processTonal('ta');

  test('kanas, タ̣ア', () => {
    expect(ta4.blockSequences[0]).toEqual('タ' + '\u0323' + 'ア');
  });

  const ta5 = cli.processTonal('chi');

  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('チイ');
  });

  const ta6 = cli.processTonal('ci');

  test('kanas, チ̣イ', () => {
    expect(ta6.blockSequences[0]).toEqual('チ' + '\u0323' + 'イ');
  });

  const ta7 = cli.processTonal('di');

  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('チ̅イ');
  });

  const ta8 = cli.processTonal('ti');

  test('kanas, チ̣̅イ', () => {
    expect(ta8.blockSequences[0]).toEqual('チ' + '\u0305' + '\u0323' + 'イ');
  });

  const ta9 = cli.processTonal('chu');

  test('kanas', () => {
    expect(ta9.blockSequences[0]).toEqual('ツウ');
  });

  const ta10 = cli.processTonal('cu');

  test('kanas, ツ̣ウ', () => {
    expect(ta10.blockSequences[0]).toEqual('ツ' + '\u0323' + 'ウ');
  });

  const ta11 = cli.processTonal('du');

  test('kanas', () => {
    expect(ta11.blockSequences[0]).toEqual('ツ̅ウ');
  });

  const ta12 = cli.processTonal('tu');

  test('kanas, ツ̣̅ウ', () => {
    expect(ta12.blockSequences[0]).toEqual('ツ' + '\u0305' + '\u0323' + 'ウ');
  });

  const ta13 = cli.processTonal('che');

  test('kanas', () => {
    expect(ta13.blockSequences[0]).toEqual('セ̅エ');
  });

  const ta14 = cli.processTonal('ce');

  test('kanas, セ̣̅エ', () => {
    expect(ta14.blockSequences[0]).toEqual('セ' + '\u0305' + '\u0323' + 'エ');
  });

  const ta15 = cli.processTonal('de');

  test('kanas', () => {
    expect(ta15.blockSequences[0]).toEqual('テエ');
  });

  const ta16 = cli.processTonal('te');

  test('kanas, テ̣エ', () => {
    expect(ta16.blockSequences[0]).toEqual('テ' + '\u0323' + 'エ');
  });

  const ta17 = cli.processTonal('cho');

  test('kanas', () => {
    expect(ta17.blockSequences[0]).toEqual('ソ̅オ');
  });

  const ta18 = cli.processTonal('co');

  test('kanas, ソ̣̅オ', () => {
    expect(ta18.blockSequences[0]).toEqual('ソ' + '\u0305' + '\u0323' + 'オ');
  });

  const ta19 = cli.processTonal('do');

  test('kanas', () => {
    expect(ta19.blockSequences[0]).toEqual('トオ');
  });

  const ta20 = cli.processTonal('to');

  test('kanas, ト̣オ', () => {
    expect(ta20.blockSequences[0]).toEqual('ト' + '\u0323' + 'オ');
  });
});

describe('Taiwanese kana testing, neutral finals', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ngehh');
  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ケ゚ェ⤇');
  });

  const ta2 = cli.processTonal('neh');
  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ネェ⤆');
  });

  const ta3 = cli.processTonal('keh');
  test('kanas, ケ̣ェ⤆', () => {
    expect(ta3.blockSequences[0]).toEqual('ケ' + '\u0323' + 'ェ⤆');
  });

  const ta4 = cli.processTonal('sehwsehh');
  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('セェ⎝セェ⤇');
  });

  const ta5 = cli.processTonal('ehh');
  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('エェ⤇');
  });

  const ta6 = cli.processTonal('oeh');
  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ヲェ⤆');
  });

  const ta7 = cli.processTonal('kennhh');
  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('㋘' + '\u0323' + 'ェ⤇');
  });

  const ta8 = cli.processTonal('hennh');
  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('㋬ェ⤆');
  });
});

describe('Taiwanese kana testing, sandhi final', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('vujfjinx');
  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('プㇲ゙⍭ジヌ⟨');
  });

  const ta2 = cli.processTonal('chiswsix');
  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('チㇲ⎝シイ⟨');
  });

  const ta3 = cli.processTonal('chabwex');
  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('サ̅ㇷ゙⎝エエ⟨');
  });

  const ta4 = cli.processTonal('lagwex');
  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('ラㇰ゙⎝エエ⟨');
  });

  const ta5 = cli.processTonal('chilwex');
  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('チㇽ⎝エエ⟨');
  });

  const ta6 = cli.processTonal('chimhwmix');
  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('チㇺ⎝ミイ⟨');
  });

  const ta7 = cli.processTonal('chinhwnix');
  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('チㇴ⎝ニイ⟨');
  });

  const ta8 = cli.processTonal('vunghfngay');
  test('kanas', () => {
    expect(ta8.blockSequences[0]).toEqual('プ' + '\u{1b167}' + '⍭カ゚ア⎛');
  });
});

describe('Taiwanese kana testing, unicode', () => {
  test('kanas, katakana letter small letter wo', () => {
    expect('\ud82c\udd66').toEqual('\u{1b166}');
  });

  test('kanas, katakana letter small letter n', () => {
    expect('\ud82c\udd67').toEqual('\u{1b167}');
  });
});
