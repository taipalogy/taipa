import { Client } from '../src/client';
import {
  tonalLemmatizationAnalyzer,
  graphAnalyzeTonal,
} from '../src/tonal/analyzer';
import { lemmatize } from '../src/tonal/lemmatizer';

describe('Lemma testing', () => {
  const cli = new Client();

  const t1 = cli.processTonal('chitt');
  test('check the number of lemmata', () => {
    expect(t1.lemmas.length).toEqual(0);
  });

  const t2 = cli.processTonal('suzjipwhuatf');
  test('check the number of lemmata', () => {
    expect(t2.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t2.lemmas[0].literal).toEqual('suzjipwhuat');
  });

  const t3 = cli.processTonal('gua');
  test('check the number of lemmata', () => {
    expect(t3.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t3.lemmas[0].literal).toEqual('guay');
  });
});

describe('Uncombining form testing, reduplication', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze('angxxangzangx');
  test('check the uncombining form, triplet', () => {
    expect(ms1[0].getForms()[0].literal).toEqual('angx');
  });

  test('check the uncombining form, triplet', () => {
    expect(ms1[1].getForms()[0].literal).toEqual('angx');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze('angzangx');
  test('check the uncombining form, doublet', () => {
    expect(ms2[0].getForms()[0].literal).toEqual('angx');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze('juahxjuahwjuahh');
  test('check the uncombining form, triplet', () => {
    expect(ms3[0].getForms()[0].literal).toEqual('juahh');
  });

  test('check the uncombining form, triplet', () => {
    expect(ms3[1].getForms()[0].literal).toEqual('juahh');
  });

  const ms4 = tonalLemmatizationAnalyzer.morphAnalyze('juahwjuahh');
  test('check the uncombining form, doublet', () => {
    expect(ms4[0].getForms()[0].literal).toEqual('juahh');
  });
});

describe('Uncombining form testing, ay', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze('calxay');
  test('check the uncombining form', () => {
    expect(ms1[0].getForms()[0].literal).toEqual('catt');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze('cagxay');
  test('check the uncombining form', () => {
    expect(ms2[0].getForms()[0].literal).toEqual('cakk');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze('abxay');
  test('check the uncombining form', () => {
    expect(ms3[0].getForms()[0].literal).toEqual('app');
  });

  const ms4 = tonalLemmatizationAnalyzer.morphAnalyze('cilfay');
  test('check the uncombining form', () => {
    expect(ms4[0].getForms()[0].literal).toEqual('cit');
  });

  const ms5 = tonalLemmatizationAnalyzer.morphAnalyze('tegfay');
  test('check the uncombining form', () => {
    expect(ms5[0].getForms()[0].literal).toEqual('tek');
  });

  const ms6 = tonalLemmatizationAnalyzer.morphAnalyze('kabfay');
  test('check the uncombining form', () => {
    expect(ms6[0].getForms()[0].literal).toEqual('kap');
  });

  const ms7 = tonalLemmatizationAnalyzer.morphAnalyze('taiwtongxay');
  test('check the uncombining form, 3-syllable word', () => {
    expect(ms7[0].getForms()[0].literal).toEqual('taiz');
  });

  const ms8 = tonalLemmatizationAnalyzer.morphAnalyze('ngzaftaixay');
  test('check the uncombining form, 4-syllable word', () => {
    expect(ms8[0].getForms()[0].literal).toEqual('ngx');
    expect(ms8[1].getForms()[0].literal).toEqual('ay');
  });
});

describe('Uncombining form testing, ietf or ietw to ek or ekk', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze('pietfkew');
  test('check the uncombining form, changed rime', () => {
    expect(ms1[0].getForms()[1].literal).toEqual('pek');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze('pietwlienx');
  test('check the uncombining form, changed rime', () => {
    expect(ms2[0].getForms()[1].literal).toEqual('pekk');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze('pietwchong');
  test('check the uncombining form, unchanged rime, changed tone', () => {
    expect(ms3[0].getForms()[0].literal).toEqual('piett');
  });
});

describe('Uncombining form testing', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze('tikwteng');
  test('check the uncombining form,  tikw to tekk, changed rime', () => {
    expect(ms1[0].getForms()[0].literal).toEqual('tekk');
  });
  /*
  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze('liengzngauz');
  test('check the uncombining form,  liengz to lienx, sandhi final', () => {
    expect(ms2[0].getForms()[0].literal).toEqual('lienx');
  });
  */
});

describe('Uncombining form testing', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze('jiwpowcitwlaw');
  test('check the uncombining form for transfix, 4th checked syllable, citw to cit', () => {
    expect(ms1[2].getForms()[0].literal).toEqual('cit');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze('tamwpurhwaw');
  test('check the uncombining form for transfix, 8th checked syllable, purhw to purhh', () => {
    expect(ms2[1].getForms()[1].literal).toEqual('purhh');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze('tnghwkhih');
  test('check the uncombining form, 4th checked syllable, tnghw to tngh', () => {
    expect(ms3[0].getForms()[0].literal).toEqual('tngh');
  });

  const ms4 = tonalLemmatizationAnalyzer.morphAnalyze('kuehwlaih');
  test('check the uncombining form, 4th checked syllable, kuehw to kueh', () => {
    expect(ms4[0].getForms()[0].literal).toEqual('kueh');
  });
});

describe('Lemma testing', () => {
  const cli = new Client();
  // let doc = new TokenAnalysis();

  const t1 = cli.processTonal('sia');
  test('check the number of lemmata', () => {
    expect(t1.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t1.lemmas[0].literal).toEqual('siay');
  });

  const t2 = cli.processTonal('siay');
  test('check the number of lemmata', () => {
    expect(t2.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t2.lemmas[0].literal).toEqual('siaw');
  });

  const t3 = cli.processTonal('siaw');
  test('check the number of lemmata', () => {
    expect(t3.lemmas.length).toEqual(2);
  });

  test('check the lemma', () => {
    expect(t3.lemmas[0].literal).toEqual('siaz');
    expect(t3.lemmas[1].literal).toEqual('siax');
  });

  const t4 = cli.processTonal('siaz');
  test('check the number of lemmata', () => {
    expect(t4.lemmas.length).toEqual(3);
  });

  test('check the lemma', () => {
    expect(t4.lemmas[0].literal).toEqual('siax');
    expect(t4.lemmas[1].literal).toEqual('siaf');
    expect(t4.lemmas[2].literal).toEqual('sia');
  });

  const t5 = cli.processTonal('siax');
  test('check the number of lemmata', () => {
    expect(t5.lemmas.length).toEqual(0);
  });
});

describe('Lemma testing, empty string as an argument', () => {
  const inputEmpty: any = '';

  const gs2 = graphAnalyzeTonal(inputEmpty).map(
    x => x.letter && x.letter.literal
  );

  test('given empty string, check the letter literal', () => {
    expect(gs2.length).toEqual(0);
  });

  const soudnSeqs1 = tonalLemmatizationAnalyzer
    .morphAnalyze(inputEmpty)
    .map(x => x.letters);

  test('given empty string, check the letter literal', () => {
    expect(soudnSeqs1.length).toEqual(0);
  });

  // const lmtzr = new TonalLemmatizer();
  const lx1 = lemmatize(inputEmpty);
  test('check the word literal', () => {
    expect(lx1.word.literal).toEqual('');
  });

  test('check the inflectional ending literal', () => {
    expect(lx1.getInflectionalEnding()).toEqual('');
  });

  test('check the lemmas', () => {
    expect(lx1.getLemmas().map(x => x.literal).length).toEqual(0);
  });

  test('check the lemmas', () => {
    expect(lx1.getLemmas.length).toEqual(0);
  });
});

describe('Lemma testing, undefined string as an argument', () => {
  const inputUnd: any = undefined;

  const gs1 = graphAnalyzeTonal(inputUnd).map(
    x => x.letter && x.letter.literal
  );

  test('given undefined string, check the letter literal', () => {
    expect(gs1.length).toEqual(0);
  });

  const soudnSeqs2 = tonalLemmatizationAnalyzer
    .morphAnalyze(inputUnd)
    .map(x => x.letters);

  test('given undefined string, check the letter literal', () => {
    expect(soudnSeqs2.length).toEqual(0);
  });

  const lx2 = lemmatize(inputUnd);
  test('check the word literal', () => {
    expect(lx2.word.literal).toEqual('');
  });

  test('check the inflectional ending literal', () => {
    expect(lx2.getInflectionalEnding()).toEqual('');
  });

  test('check the lemmas', () => {
    expect(lx2.getLemmas().map(x => x.literal).length).toEqual(0);
  });

  test('check the lemmas', () => {
    expect(lx2.getLemmas.length).toEqual(0);
  });
});
