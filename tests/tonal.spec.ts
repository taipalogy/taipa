import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { tonalLemmatizationAnalyzer } from '../src/tonal/analyzer';
import { tonalInflectionAnalyzer } from '../src/dparser/analyzer';
import { TonalZeroCombining } from '../src/metaplasm';
import {
  EighthToSecondCombining,
  EighthToFirstCombining,
  TonalCombiningForms,
  TonalDesinenceInflection,
} from '../src/dparser/metaplasm';
import { createTonalInflectionLexeme } from '../src/dparser/creator';

describe('Tonal testing', () => {
  const cli = new Client();

  const t1 = cli.processTonal('tamwpurhxoay');

  test('check the tone letter', () => {
    expect(t1.letterSequences[1][3].toString()).toEqual(TonalLetterTags.x);
  });

  const t2 = cli.processTonal('binznafchaiw');

  test('check the tone letter', () => {
    expect(t2.letterSequences[1][2].toString()).toEqual(TonalLetterTags.f);
  });

  const t3 = cli.processTonal('kinznafjitt');

  test('check the tone letter', () => {
    expect(t3.letterSequences[1][2].toString()).toEqual(TonalLetterTags.f);
  });

  const t4 = cli.processTonal('chaufcheng');

  test('check the tone letter', () => {
    expect(t4.letterSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });

  const t5 = cli.processTonal('taizoanx');

  test('check the tone letter', () => {
    expect(t5.letterSequences[1][3].toString()).toEqual(TonalLetterTags.x);
  });

  const t6 = cli.processTonal('taizoanzoez');

  test('check the tone letter', () => {
    expect(t6.letterSequences[2][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t7 = cli.processTonal('taiwjitwpunfteykok');

  test('check the tone letter', () => {
    expect(t7.letterSequences[2][3].toString()).toEqual(TonalLetterTags.f);
  });

  const t8 = cli.processTonal('kurzsa');

  test('check the tone letter', () => {
    expect(t8.letterSequences[0][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t9 = cli.processTonal('hongzqun');

  test('check the tone letter', () => {
    expect(t9.letterSequences[0][3].toString()).toEqual(TonalLetterTags.z);
  });

  const t10 = cli.processTonal('siapwjipp');

  test('check the tone letter', () => {
    expect(t10.letterSequences[0][4].toString()).toEqual(TonalLetterTags.w);
  });

  const t11 = cli.processTonal('kazvi');

  test('check the tone letter', () => {
    expect(t11.letterSequences[0][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t12 = cli.processTonal('mihwkiannz');

  test('check the tone letter', () => {
    expect(t12.letterSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });

  const t13 = cli.processTonal('bakwchiu');

  test('check the tone letter', () => {
    expect(t13.letterSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });

  const t14 = cli.processTonal('khazcng');

  test('check the tone letter', () => {
    expect(t14.letterSequences[0][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t15 = cli.processTonal('lamzturfgiy');

  test('check the tone letter', () => {
    expect(t15.letterSequences[0][3].toString()).toEqual(TonalLetterTags.z);
  });
});

describe('Tonal testing, if present or not', () => {
  const cli = new Client();

  const t1 = cli.processTonal('ax');

  test('check if it is present, after tone sandhi of ay is incorporated', () => {
    expect(t1.word.literal).toEqual('ax');
  });

  const t2 = cli.processTonal('soaiw');

  test('check if it is not present. 5 letters in length', () => {
    expect(t2.word.literal).toEqual('');
  });
});

describe('Tonal testing', () => {
  const tia = tonalInflectionAnalyzer;

  const wrd1 = 'chiahh';

  const ms1 = tia.morphAnalyze(wrd1, new TonalZeroCombining());

  test('check the allomorph of the syllable', () => {
    expect(ms1[0].allomorph.toString()).toEqual(TonalLetterTags.hh);
  });

  const ms2 = tia.morphAnalyze(wrd1, new EighthToSecondCombining());

  test('check the final of the syllable', () => {
    expect(ms2[0].getForms()[0].lastSecondLetter.literal).toEqual(
      TonalLetterTags.h
    );
  });

  test('check the tone letter of the syllable, eighth neutral tone to second neutral tone', () => {
    expect(ms2[0].getForms()[0].lastLetter.literal).toEqual(TonalLetterTags.y);
  });

  const wrd2 = 'chengzhokk';

  const ms3 = tia.morphAnalyze(wrd2, new TonalZeroCombining());

  test('check the allomorph of the syllable', () => {
    expect(ms3[1].allomorph.toString()).toEqual(TonalLetterTags.kk);
  });

  const ms4 = tia.morphAnalyze(wrd2, new EighthToFirstCombining());

  test('check the final of the syllable', () => {
    expect(ms4[1].getForms()[0].lastSecondLetter.literal).toEqual(
      TonalLetterTags.k
    );
  });

  test('check the tone letter of the syllable', () => {
    expect(ms4[1].getForms()[0].lastLetter.literal).toEqual(TonalLetterTags.f);
  });

  const wrd3 = 'changxx';

  const ms5 = tia.morphAnalyze(wrd3, new TonalCombiningForms());

  test('check the allomorph of the syllable', () => {
    expect(ms5[0].allomorph.toString()).toEqual(TonalLetterTags.xx);
  });
});

describe('Tonal testing', () => {
  const morphemes1 = tonalLemmatizationAnalyzer.morphAnalyze('ginfnay');

  test('check the tonal of the first syllable', () => {
    expect(morphemes1[0].allomorph.toString()).toEqual(TonalLetterTags.f);
  });

  const tia = tonalInflectionAnalyzer;
  const morphemes2 = tia.morphAnalyze('ginfay', new TonalZeroCombining());

  test('check the tonal of the first syllable', () => {
    expect(morphemes2[0].allomorph.toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Tonal testing', () => {
  const morphemes1 = tonalLemmatizationAnalyzer.morphAnalyze('kamxmay');

  test('check the tonal of the first syllable', () => {
    expect(morphemes1[0].allomorph.toString()).toEqual(TonalLetterTags.x);
  });

  const tia = tonalInflectionAnalyzer;
  const morphemes2 = tia.morphAnalyze('kamxay', new TonalZeroCombining());

  test('check the tonal of the first syllable', () => {
    expect(morphemes2[0].allomorph.toString()).toEqual(TonalLetterTags.x);
  });
});

describe('Tone group testing of words', () => {
  const tia = tonalInflectionAnalyzer;
  const lx3 = tia.lexAnalyze('chiahh', new TonalDesinenceInflection());
  const lx4 = tia.lexAnalyze('ez', new TonalDesinenceInflection());

  test('check the tone of the word, 47', () => {
    expect(lx3.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.hh);
  });

  test('check the tone of the word, 47', () => {
    expect(lx4.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.z);
  });

  const lx5 = createTonalInflectionLexeme('pah');
  const lx6 = createTonalInflectionLexeme('ew');

  test('check the tone of the word, 43', () => {
    expect(lx5.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });

  test('check the tone of the word, 43', () => {
    expect(lx6.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Tone group testing of syllables', () => {
  const tia = tonalInflectionAnalyzer;

  const ms1 = tia.morphAnalyze('hongwseysew', new TonalCombiningForms());

  test('check the tone of the syllable', () => {
    expect(ms1[0].allomorph.toString()).toEqual(TonalLetterTags.w);
  });

  test('check the tone of the syllable', () => {
    expect(ms1[1].allomorph.toString()).toEqual(TonalLetterTags.y);
  });

  test('check the tone of the syllable', () => {
    expect(ms1[2].allomorph.toString()).toEqual(TonalLetterTags.w);
  });

  const ms2 = tia.morphAnalyze('cuhycuhykiurw', new TonalCombiningForms());

  test('check the tonal symbol of the syllable', () => {
    expect(ms2[0].allomorph.toString()).toEqual(
      TonalLetterTags.h + TonalLetterTags.y
    );
  });

  test('check the tonal symbol of the syllable', () => {
    expect(ms2[1].allomorph.toString()).toEqual(
      TonalLetterTags.h + TonalLetterTags.y
    );
  });

  test('check the tonal symbol of the syllable', () => {
    expect(ms2[2].allomorph.toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Tone group testing of phrasal verbs', () => {
  const lx1 = createTonalInflectionLexeme('ciet');
  const lx2 = createTonalInflectionLexeme('loeh');

  test('check the tonal of the word, 34', () => {
    expect(lx1.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.t);
  });

  test('check the tone of the word, 34', () => {
    expect(lx2.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });

  const tia = tonalInflectionAnalyzer;
  const lx3 = tia.lexAnalyze('thehh', new TonalDesinenceInflection());
  const lx4 = tia.lexAnalyze('khih', new TonalDesinenceInflection());
  const lx5 = tia.lexAnalyze('laih', new TonalDesinenceInflection());

  test('check the tone of the word, 844', () => {
    expect(lx3.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.hh);
  });

  test('check the tone of the word, 844', () => {
    expect(lx4.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });

  test('check the tone of the word, 844', () => {
    expect(lx5.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });
});
