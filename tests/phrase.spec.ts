import {
  inflectToProceeding,
  inflectEToAdnominal,
  inflectVppToProceeding,
  inflectVppToTransitive,
  inflectLeToConjunctive,
  inflectPossesive,
  inflectSerial,
  inflectToParticiple,
  inflectVppToParticiple,
} from '../src/dparser/inflector';
import { insertToFollowingWord } from '../src/dparser/inserter';
import { TonalLetterTags } from '../src/tonal/version2';
import { TonalSyllable } from '../src/tonal/morpheme';
import {
  createTonalPhrase,
  createCompoundPhraseme,
  createTonalInflectionLexeme,
} from '../src/dparser/creator';

describe('Phrasal verb testing, transitive', () => {
  const ph = inflectToProceeding('koannw', 'diurh');

  test('check the base form', () => {
    expect(ph.phrase.literal).toEqual('koannw diurh');
  });

  test('check the proceeding form', () => {
    expect(ph.getForms()[0].literal).toEqual('koanny diurhhw');
  });
});

describe('Phrasal verb testing, intransitive', () => {
  const p = createTonalPhrase('laix leh');

  test('check the base form', () => {
    expect(p.literal).toEqual('laix leh');
  });
});

describe('Adjective testing, adnominal', () => {
  const ph = inflectEToAdnominal('sin', 'e');

  test('check the proceeding form', () => {
    expect(ph.getForms()[0].literal).toEqual('sin ez');
  });

  const frase = ph.getForms()[0].literal;
  const words = frase.split(' ');
  const ph4 = insertToFollowingWord(words[0], words[1]);

  test('check the assimilated form', () => {
    expect(ph4.getForms()[0].literal).toEqual('sin nez');
  });
});

describe('Phrasal verb testing, transitive, adverbial', () => {
  const p1 = inflectToProceeding('lipp', 'kih');

  test('check the base form', () => {
    expect(p1.phrase.literal).toEqual('lipp kih');
  });

  test('check the proceeding form', () => {
    expect(p1.getForms()[0].literal).toEqual('lipw kihf');
  });

  const p2 = inflectVppToProceeding('tehh', 'cut', 'kih');

  test('check the base form', () => {
    expect(p2.phrase.literal).toEqual('tehh cut kih');
  });

  test('check the proceeding form', () => {
    expect(p2.getForms()[0].literal).toEqual('tehw cutf kihf');
  });

  let s2 = new TonalSyllable(p2.getForms()[0].words[2].syllables[0].letters);
  s2.popLetter();
  s2.popLetter();
  test('check free form of kihf', () => {
    expect(s2.literal).toEqual('ki');
  });

  const p3 = inflectVppToProceeding('tehh', 'kih', 'laih');

  test('check the base form', () => {
    expect(p3.phrase.literal).toEqual('tehh kih laih');
  });

  test('check the proceeding form', () => {
    expect(p3.getForms()[0].literal).toEqual('tehw kihf laiz');
  });
});

describe('Phrasal verb testing, transitive', () => {
  const p = inflectVppToTransitive('sa', 'kih', 'laih');

  test('check the proceeding form', () => {
    expect(p.getForms()[0].literal).toEqual('saz kih laih');
  });
});

describe('Verb phrase testing, conjunctive', () => {
  const p = inflectLeToConjunctive('chez', 'lez');

  test('check the proceeding form', () => {
    expect(p.getForms()[0].literal).toEqual('chew le');
  });
});

describe('Noun phrase testing, possesive', () => {
  const fr = inflectPossesive('azbengx', 'ex');

  test('check the proceeding form', () => {
    expect(fr.getForms()[0].literal).toEqual('azbengx ew');
  });

  const frase = fr.getForms()[0].literal;
  const words = frase.split(' ');
  const phm = insertToFollowingWord(words[0], words[1]);

  test('check the assimilated form', () => {
    expect(phm.getForms()[0].literal).toEqual('azbengx ngew');
  });
});

describe('Serial words testing', () => {
  const fr = inflectSerial('goay', 'siz', 'chittwlex');

  test('check the base form', () => {
    expect(fr.phrase.literal).toEqual('goa siw chittwlex');
  });

  test('check the proceeding form', () => {
    expect(fr.getForms()[0].literal).toEqual('goa siw chittwlez');
  });
});

describe('Compound testing', () => {
  const p1 = createCompoundPhraseme('qanzkoy', 'lezle');

  test('gifchongwguy', () => {
    expect(p1.phrase.literal).toEqual('qanzko lezle');
  });

  const p2 = createCompoundPhraseme('cuhycuh', 'qiurw');

  test('gifchongwguy', () => {
    expect(p2.phrase.literal).toEqual('cuhycuhy qiurw');
  });

  const p3 = createCompoundPhraseme('siamy', 'qoew');

  test('separate vv compound', () => {
    expect(p3.phrase.literal).toEqual('siam qoew');
  });

  const p4 = createCompoundPhraseme('poaw', 'kih');

  test('separable phrasal verb, verb-subsidiary compound', () => {
    expect(p4.phrase.literal).toEqual('poay kih');
  });

  const p5 = createCompoundPhraseme('chiahh', 'vay');

  test('separable verb', () => {
    expect(p5.phrase.literal).toEqual('chiahw vay');
  });

  const p8 = createCompoundPhraseme('lamx', 'me');

  test('prepositional verb, verb + preposition', () => {
    expect(p8.phrase.literal).toEqual('lamz me');
  });

  const p9 = createCompoundPhraseme('diz', 'daizdengy');

  test('adverbial phrase, place', () => {
    expect(p9.phrase.literal).toEqual('diw daizdengy');
  });

  const p10 = createCompoundPhraseme('uiw', 'sannzdiamy');

  test('adverbial phrase, time', () => {
    expect(p10.phrase.literal).toEqual('uiy sannzdiamy');
  });

  const p11 = createCompoundPhraseme('bong', 'dienwnauy');

  test('gerund', () => {
    expect(p11.phrase.literal).toEqual('bongz dienwnauy');
  });
});

describe('Phrasal verb testing, participle form', () => {
  const p1 = inflectToParticiple('toa', 'kih', TonalLetterTags.zero);

  test('check the base form', () => {
    expect(p1.phrase.literal).toEqual('toa kih');
  });

  test('check the participle form', () => {
    expect(p1.getForms()[0].literal).toEqual('toa ki');
  });

  const p2 = inflectToParticiple('toa', 'kih', TonalLetterTags.z);

  test('check the base form', () => {
    expect(p2.phrase.literal).toEqual('toa kih');
  });

  test('check the participle form', () => {
    expect(p2.getForms()[0].literal).toEqual('toaz kiz');
  });

  const p3 = inflectVppToParticiple('vun', 'cut', 'laih', TonalLetterTags.zero);

  test('check the base form', () => {
    expect(p3.phrase.literal).toEqual('vun cut laih');
  });

  test('check the participle form, present', () => {
    expect(p3.getForms()[0].literal).toEqual('vun cutf lai');
  });

  const p4 = inflectVppToParticiple('din', 'lurh', 'laih', TonalLetterTags.z);

  test('check the base form', () => {
    expect(p4.phrase.literal).toEqual('din lurh laih');
  });

  test('check the participle form, perfect', () => {
    expect(p4.getForms()[0].literal).toEqual('dinz lurz laiz');
  });
});

describe('Phrase testing', () => {
  const p1 = createTonalPhrase('vinyviangy qiurw');

  test('onomatopeia', () => {
    expect(p1.literal).toEqual('vinyviangy qiurw');
  });

  const p2 = createTonalPhrase('koahy linzlong');

  test('gifchongwguy', () => {
    expect(p2.literal).toEqual('koahy linzlong');
  });

  const p3 = createTonalPhrase('hengx liz');

  test('enclitic', () => {
    expect(p3.literal).toEqual('hengx liz');
  });

  const lx4 = createTonalInflectionLexeme('qaz');
  const p4 = createTonalPhrase(lx4.word.literal);
  const phm4 = createCompoundPhraseme('', lx4.word.literal);

  test('phrase', () => {
    expect(phm4.phrase.literal).toEqual(' qaz');
  });

  const p5 = createTonalPhrase('qangz');

  test('phrase', () => {
    expect(p5.literal).toEqual('qangz');
  });
});

describe('Phrasal verb testing, 2 empty words, 1 empty phrase', () => {
  const inputEmpty: any = '';

  const ph3 = createCompoundPhraseme(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph3.phrase.literal).toEqual('');
  });

  const ph4 = inflectEToAdnominal(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph4.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph4.getForms().length).toEqual(0);
  });

  const ph5 = inflectPossesive(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph5.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph5.getForms().length).toEqual(0);
  });

  const ph6 = inflectLeToConjunctive(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph6.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph6.getForms().length).toEqual(0);
  });

  const ph7 = inflectToProceeding(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph7.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph7.getForms().length).toEqual(0);
  });

  const ph8 = inflectToParticiple(inputEmpty, inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph8.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph8.getForms().length).toEqual(0);
  });

  const ph9 = inflectSerial(inputEmpty, inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph9.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph9.getForms().length).toEqual(0);
  });

  const ph10 = inflectVppToTransitive(inputEmpty, inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph10.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph10.getForms().length).toEqual(0);
  });

  const ph11 = inflectVppToParticiple(
    inputEmpty,
    inputEmpty,
    inputEmpty,
    inputEmpty
  );

  test('check the empty phrase', () => {
    expect(ph11.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph11.getForms().length).toEqual(0);
  });
});

describe('Phrasal verb testing, undefined input', () => {
  const inputUnd: any = undefined;

  const ph3 = createCompoundPhraseme(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph3.phrase.literal).toEqual('');
  });

  const ph4 = inflectEToAdnominal(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph4.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph4.getForms().length).toEqual(0);
  });

  const ph5 = inflectPossesive(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph5.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph5.getForms().length).toEqual(0);
  });

  const ph6 = inflectLeToConjunctive(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph6.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph6.getForms().length).toEqual(0);
  });

  const ph7 = inflectToProceeding(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph7.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph7.getForms().length).toEqual(0);
  });

  const ph8 = inflectToParticiple(inputUnd, inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph8.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph8.getForms().length).toEqual(0);
  });

  const ph9 = inflectSerial(inputUnd, inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph9.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph9.getForms().length).toEqual(0);
  });

  const ph10 = inflectVppToTransitive(inputUnd, inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph10.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph10.getForms().length).toEqual(0);
  });

  const ph11 = inflectVppToParticiple(inputUnd, inputUnd, inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph11.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph11.getForms().length).toEqual(0);
  });
});
