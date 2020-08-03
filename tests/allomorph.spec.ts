import { tonalInflectionAnalyzer } from '../src/dparser/analyzer';
import { TonalCombiningForms } from '../src/dparser/metaplasm';

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
    'chittwsix',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms7[0].allomorph.toString()).toEqual('ttw');
  });

  const ms8 = tonalInflectionAnalyzer.morphAnalyze(
    'chiswsix',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms8[0].allomorph.toString()).toEqual('sw');
  });

  const ms9 = tonalInflectionAnalyzer.morphAnalyze(
    'vutfjinx',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms9[0].allomorph.toString()).toEqual('tf');
  });

  const ms10 = tonalInflectionAnalyzer.morphAnalyze(
    'vujfjinx',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms10[0].allomorph.toString()).toEqual('jf');
  });

  const ms11 = tonalInflectionAnalyzer.morphAnalyze(
    'chittwjiz',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms11[0].allomorph.toString()).toEqual('ttw');
  });

  const ms13 = tonalInflectionAnalyzer.morphAnalyze(
    'qapfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms13[0].allomorph.toString()).toEqual('pf');
  });

  const ms14 = tonalInflectionAnalyzer.morphAnalyze(
    'qabfay',
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
    'chabbwex',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms16[0].allomorph.toString()).toEqual('bbw');
  });

  const ms17 = tonalInflectionAnalyzer.morphAnalyze(
    'dekfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms17[0].allomorph.toString()).toEqual('kf');
  });

  const ms18 = tonalInflectionAnalyzer.morphAnalyze(
    'degfay',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms18[0].allomorph.toString()).toEqual('gf');
  });

  const ms19 = tonalInflectionAnalyzer.morphAnalyze(
    'lakkwex',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms19[0].allomorph.toString()).toEqual('kkw');
  });

  const ms20 = tonalInflectionAnalyzer.morphAnalyze(
    'laggwex',
    new TonalCombiningForms()
  );

  test('check the allomorph', () => {
    expect(ms20[0].allomorph.toString()).toEqual('ggw');
  });
});
