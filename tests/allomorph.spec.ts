import { tonalInflectionAnalyzer } from '../src/change/analyzer';
import { TonalCombiningForms } from '../src/change/metaplasm';

describe('Allomorph testing', () => {
  const ms1 = tonalInflectionAnalyzer.morphAnalyze(
    'citfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms1[0].allomorph.toString()).toEqual('tf');
  });

  const ms2 = tonalInflectionAnalyzer.morphAnalyze(
    'cilfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms2[0].allomorph.toString()).toEqual('lf');
  });

  const ms3 = tonalInflectionAnalyzer.morphAnalyze(
    'catxay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms3[0].allomorph.toString()).toEqual('tx');
  });

  const ms4 = tonalInflectionAnalyzer.morphAnalyze(
    'calxay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms4[0].allomorph.toString()).toEqual('lx');
  });

  const ms5 = tonalInflectionAnalyzer.morphAnalyze(
    'itfseng',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms5[0].allomorph.toString()).toEqual('tf');
  });

  const ms6 = tonalInflectionAnalyzer.morphAnalyze(
    'isfseng',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms6[0].allomorph.toString()).toEqual('sf');
  });

  const ms7 = tonalInflectionAnalyzer.morphAnalyze(
    'chitwsix',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms7[0].allomorph.toString()).toEqual('tw');
  });

  const ms8 = tonalInflectionAnalyzer.morphAnalyze(
    'chiswsix',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms8[0].allomorph.toString()).toEqual('sw');
  });

  const ms9 = tonalInflectionAnalyzer.morphAnalyze(
    'putfjinx',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms9[0].allomorph.toString()).toEqual('tf');
  });

  const ms10 = tonalInflectionAnalyzer.morphAnalyze(
    'pujfjinx',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms10[0].allomorph.toString()).toEqual('jf');
  });

  const ms11 = tonalInflectionAnalyzer.morphAnalyze(
    'chitwjiz',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms11[0].allomorph.toString()).toEqual('tw');
  });

  const ms13 = tonalInflectionAnalyzer.morphAnalyze(
    'kapfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms13[0].allomorph.toString()).toEqual('pf');
  });

  const ms14 = tonalInflectionAnalyzer.morphAnalyze(
    'kabfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms14[0].allomorph.toString()).toEqual('bf');
  });

  const ms15 = tonalInflectionAnalyzer.morphAnalyze(
    'chapwex',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms15[0].allomorph.toString()).toEqual('pw');
  });

  const ms16 = tonalInflectionAnalyzer.morphAnalyze(
    'chabwex',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms16[0].allomorph.toString()).toEqual('bw');
  });

  const ms17 = tonalInflectionAnalyzer.morphAnalyze(
    'tekfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms17[0].allomorph.toString()).toEqual('kf');
  });

  const ms18 = tonalInflectionAnalyzer.morphAnalyze(
    'tegfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms18[0].allomorph.toString()).toEqual('gf');
  });

  const ms19 = tonalInflectionAnalyzer.morphAnalyze(
    'lakwex',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms19[0].allomorph.toString()).toEqual('kw');
  });

  const ms20 = tonalInflectionAnalyzer.morphAnalyze(
    'lagwex',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms20[0].allomorph.toString()).toEqual('gw');
  });

  const ms21 = tonalInflectionAnalyzer.morphAnalyze(
    'pajwjitt',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms21[0].allomorph.toString()).toEqual('jw');
  });
});
