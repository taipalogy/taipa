import { Client } from '../src/client';
import { kanaLemmatizationAnalyzer } from '../src/kana/analyzer';
import { KanaUncombiningMorpheme } from '../src/kana/morpheme';

describe('Kana testing', () => {
  const cli = new Client();

  const ta1 = cli.processKana('forumosa');
  test('kanas', () => {
    expect(ta1.blockSequences[1]).toEqual('フォルモサ');
  });

  const ta2 = cli.processKana('takasago');
  test('kanas', () => {
    expect(ta2.blockSequences[0]).toEqual('たかさご');
    expect(ta2.blockSequences[1]).toEqual('タカサゴ');
  });

  const ta3 = cli.processKana('taiwankun');
  test('kanas', () => {
    expect(ta3.blockSequences[0]).toEqual('たいわんくん');
    expect(ta3.blockSequences[1]).toEqual('タイワンクン');
  });

  const ta4 = cli.processKana('taggu');
  test('kanas', () => {
    expect(ta4.blockSequences[0]).toEqual('たっぐ');
    expect(ta4.blockSequences[1]).toEqual('タッグ');
  });

  const ta5 = cli.processKana('ggu');
  test('kanas', () => {
    expect(ta5.blockSequences[0]).toEqual('っぐ');
    expect(ta5.blockSequences[1]).toEqual('ッグ');
  });

  const ta6 = cli.processKana('paddo');
  test('kanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ぱっど');
    expect(ta6.blockSequences[1]).toEqual('パッド');
  });

  const ta7 = cli.processKana('ddo');
  test('kanas', () => {
    expect(ta7.blockSequences[0]).toEqual('っど');
    expect(ta7.blockSequences[1]).toEqual('ッド');
  });

  const ta8 = cli.processKana('di');
  test('kanas', () => {
    expect(ta8.blockSequences[1]).toEqual('ディ');
  });

  const ta9 = cli.processKana('nyuusu');
  test('kana chouon', () => {
    expect(ta9.blockSequences[0]).toEqual('にゅうす');
    expect(ta9.blockSequences[1]).toEqual('ニュウス');
    expect(ta9.blockSequences[2]).toEqual('にゅーす');
    expect(ta9.blockSequences[3]).toEqual('ニュース');
  });

  const ta10 = cli.processKana('yayuyo');
  test('kanas', () => {
    expect(ta10.blockSequences[0]).toEqual('やゆよ');
    expect(ta10.blockSequences[1]).toEqual('ヤユヨ');
  });

  const ta11 = cli.processKana('roumaji');
  test('kanas', () => {
    expect(ta11.blockSequences[0]).toEqual('ろうまじ');
    expect(ta11.blockSequences[1]).toEqual('ロウマジ');
    expect(ta11.blockSequences[2]).toEqual('ろーまじ');
    expect(ta11.blockSequences[3]).toEqual('ローマジ');
  });

  const ta12 = cli.processKana('rongu');
  test('kanas', () => {
    expect(ta12.blockSequences[0]).toEqual('ろんぐ');
    expect(ta12.blockSequences[1]).toEqual('ロング');
  });

  const ta13 = cli.processKana('wawiwewo');
  test('kanas', () => {
    expect(ta13.blockSequences[0]).toEqual('わゐゑを');
    expect(ta13.blockSequences[1]).toEqual('ワヰヱヲ');
  });

  const ta14 = cli.processKana('mitchu');
  test('kanas', () => {
    expect(ta14.blockSequences[0]).toEqual('みっつ');
    expect(ta14.blockSequences[1]).toEqual('ミッツ');
  });

  const ta15 = cli.processKana('tchu');
  test('kanas', () => {
    expect(ta15.blockSequences[0]).toEqual('っつ');
    expect(ta15.blockSequences[1]).toEqual('ッツ');
  });

  const ta16 = cli.processKana('dotchi');
  test('kanas', () => {
    expect(ta16.blockSequences[0]).toEqual('どっち');
    expect(ta16.blockSequences[1]).toEqual('ドッチ');
  });
});

describe('Kana testing, syllabification', () => {
  const cli = new Client();

  const ta1 = cli.processKana('on');
  test('kanas', () => {
    expect(ta1.blockSequences[0]).toEqual('おん');
  });

  const ta2 = cli.processKana('ons');
  test('kanas, preceding syllable', () => {
    expect(ta2.blockSequences[0]).toEqual('おん');
  });

  const ta3 = cli.processKana('oni');
  test('kanas, following syllable', () => {
    expect(ta3.blockSequences[0]).toEqual('おに');
  });
});

describe('Kana testing', () => {
  const ka = kanaLemmatizationAnalyzer;

  const inputEmpty: any = '';
  const inputUnd: any = undefined;

  const morphemes1: KanaUncombiningMorpheme[] = ka.morphAnalyze(inputUnd);

  test('check the length of letter sequences', () => {
    expect(morphemes1.map(x => x.sounds).length).toEqual(0);
  });

  const morphemes2: KanaUncombiningMorpheme[] = ka.morphAnalyze(inputEmpty);

  test('check the length of letter sequences', () => {
    expect(morphemes2.map(x => x.sounds).length).toEqual(0);
  });
});
