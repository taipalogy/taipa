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
  const ph = inflectToProceeding('khoannw', 'tiurh');

  test('check the base form', () => {
    expect(ph.phrase.literal).toEqual('khoannw tiurh');
  });

  test('check the proceeding form', () => {
    expect(ph.getForms()[0].literal).toEqual('khoanny tiurhw');
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
  const p1 = inflectToProceeding('lipp', 'khih');

  test('check the base form', () => {
    expect(p1.phrase.literal).toEqual('lipp khih');
  });

  test('check the proceeding form', () => {
    expect(p1.getForms()[0].literal).toEqual('lipw khihf');
  });

  const p2 = inflectVppToProceeding('thehh', 'cut', 'khih');

  test('check the base form', () => {
    expect(p2.phrase.literal).toEqual('thehh cut khih');
  });

  test('check the proceeding form', () => {
    expect(p2.getForms()[0].literal).toEqual('thehw cutf khihf');
  });

  let s2 = new TonalSyllable(p2.getForms()[0].words[2].syllables[0].letters);
  s2.popLetter();
  s2.popLetter();
  test('check free form of khihf', () => {
    expect(s2.literal).toEqual('khi');
  });

  const p3 = inflectVppToProceeding('thehh', 'khih', 'laih');

  test('check the base form', () => {
    expect(p3.phrase.literal).toEqual('thehh khih laih');
  });

  test('check the proceeding form', () => {
    expect(p3.getForms()[0].literal).toEqual('thehw khihf laiz');
  });
});

describe('Phrasal verb testing, transitive', () => {
  const p = inflectVppToTransitive('sa', 'khih', 'laih');

  test('check the proceeding form', () => {
    expect(p.getForms()[0].literal).toEqual('saz khih laih');
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
  const fr = inflectSerial('goay', 'siz', 'chitwlex');

  test('check the base form', () => {
    expect(fr.phrase.literal).toEqual('goa siw chitwlex');
  });

  test('check the proceeding form', () => {
    expect(fr.getForms()[0].literal).toEqual('goa siw chitwlez');
  });
});

describe('Compound testing', () => {
  const p1 = createCompoundPhraseme('kanzkhoy', 'lezle');

  test('gifchongwguy', () => {
    expect(p1.phrase.literal).toEqual('kanzkho lezle');
  });

  const p2 = createCompoundPhraseme('cuhycuh', 'kiurw');

  test('gifchongwguy', () => {
    expect(p2.phrase.literal).toEqual('cuhycuhy kiurw');
  });

  const p3 = createCompoundPhraseme('siamy', 'koew');

  test('separate vv compound', () => {
    expect(p3.phrase.literal).toEqual('siam koew');
  });

  const p4 = createCompoundPhraseme('phoaw', 'khih');

  test('separable phrasal verb, verb-subsidiary compound', () => {
    expect(p4.phrase.literal).toEqual('phoay khih');
  });

  const p5 = createCompoundPhraseme('chiahh', 'pay');

  test('separable verb', () => {
    expect(p5.phrase.literal).toEqual('chiahw pay');
  });

  const p8 = createCompoundPhraseme('lamx', 'me');

  test('prepositional verb, verb + preposition', () => {
    expect(p8.phrase.literal).toEqual('lamz me');
  });

  const p9 = createCompoundPhraseme('tiz', 'taiztengy');

  test('adverbial phrase, place', () => {
    expect(p9.phrase.literal).toEqual('tiw taiztengy');
  });

  const p10 = createCompoundPhraseme('uiw', 'sannztiamy');

  test('adverbial phrase, time', () => {
    expect(p10.phrase.literal).toEqual('uiy sannztiamy');
  });

  const p11 = createCompoundPhraseme('bong', 'tienwnauy');

  test('gerund', () => {
    expect(p11.phrase.literal).toEqual('bongz tienwnauy');
  });
});

describe('Phrasal verb testing, participle form', () => {
  const p1 = inflectToParticiple('thoa', 'khih', TonalLetterTags.zero);

  test('check the base form', () => {
    expect(p1.phrase.literal).toEqual('thoa khih');
  });

  test('check the participle form', () => {
    expect(p1.getForms()[0].literal).toEqual('thoa khi');
  });

  const p2 = inflectToParticiple('thoa', 'khih', TonalLetterTags.z);

  test('check the base form', () => {
    expect(p2.phrase.literal).toEqual('thoa khih');
  });

  test('check the participle form', () => {
    expect(p2.getForms()[0].literal).toEqual('thoaz khiz');
  });

  const p3 = inflectVppToParticiple('pun', 'cut', 'laih', TonalLetterTags.zero);

  test('check the base form', () => {
    expect(p3.phrase.literal).toEqual('pun cut laih');
  });

  test('check the participle form, present', () => {
    expect(p3.getForms()[0].literal).toEqual('pun cutf lai');
  });

  const p4 = inflectVppToParticiple('tin', 'lurh', 'laih', TonalLetterTags.z);

  test('check the base form', () => {
    expect(p4.phrase.literal).toEqual('tin lurh laih');
  });

  test('check the participle form, perfect', () => {
    expect(p4.getForms()[0].literal).toEqual('tinz lurz laiz');
  });
});

describe('Phrase testing', () => {
  const p1 = createTonalPhrase('pinypiangy kiurw');

  test('onomatopeia', () => {
    expect(p1.literal).toEqual('pinypiangy kiurw');
  });

  const p2 = createTonalPhrase('khoahy linzlong');

  test('gifchongwguy', () => {
    expect(p2.literal).toEqual('khoahy linzlong');
  });

  const p3 = createTonalPhrase('hengx liz');

  test('enclitic', () => {
    expect(p3.literal).toEqual('hengx liz');
  });

  const lx4 = createTonalInflectionLexeme('kaz');
  const p4 = createTonalPhrase(lx4.word.literal);
  const phm4 = createCompoundPhraseme('', lx4.word.literal);

  test('phrase', () => {
    expect(phm4.phrase.literal).toEqual(' kaz');
  });

  const p5 = createTonalPhrase('kangz');

  test('phrase', () => {
    expect(p5.literal).toEqual('kangz');
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
