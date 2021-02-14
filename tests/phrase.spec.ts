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
} from '../src/change/inflector';
import { insertToFollowingWord } from '../src/change/inserter';
import { TonalLetterTags } from '../src/tonal/version2';
import { TonalSyllable } from '../src/unchange/morpheme';
import {
  createTonalPhrase,
  createCompoundPhraseme,
  createTonalInflectionLexeme,
} from '../src/change/creator';

describe('Phrasal verb testing, transitive', () => {
  const ph = inflectToProceeding('khuannw', 'tiurh');
  test('check the base form', () => {
    expect(ph.phrase.literal).toEqual('khuannw tiurh');
    expect(ph.getForms()[0].literal).toEqual('khuanny tiurhw');
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
    expect(p1.getForms()[0].literal).toEqual('lipw khihf');
  });

  const p2 = inflectVppToProceeding('thehh', 'cut', 'khih');
  test('check the base form', () => {
    expect(p2.phrase.literal).toEqual('thehh cut khih');
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
  const fr = inflectPossesive('azbingx', 'ex');
  test('check the proceeding form', () => {
    expect(fr.getForms()[0].literal).toEqual('azbingx ew');
  });

  const frase = fr.getForms()[0].literal;
  const words = frase.split(' ');
  const phm = insertToFollowingWord(words[0], words[1]);
  test('check the assimilated form', () => {
    expect(phm.getForms()[0].literal).toEqual('azbingx ngew');
  });
});

describe('Serial words testing', () => {
  const fr = inflectSerial('guay', 'siz', 'chitwlex');
  test('check the base form', () => {
    expect(fr.phrase.literal).toEqual('gua siw chitwlex');
    expect(fr.getForms()[0].literal).toEqual('gua siw chitwlez');
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

  const p3 = createCompoundPhraseme('siamy', 'kuew');
  test('separate vv compound', () => {
    expect(p3.phrase.literal).toEqual('siam kuew');
  });

  const p4 = createCompoundPhraseme('phuaw', 'khih');
  test('separable phrasal verb, verb-subsidiary compound', () => {
    expect(p4.phrase.literal).toEqual('phuay khih');
  });

  const p5 = createCompoundPhraseme('chiahh', 'pay');
  test('separable verb', () => {
    expect(p5.phrase.literal).toEqual('chiahw pay');
  });

  const p8 = createCompoundPhraseme('lamx', 'me');
  test('prepositional verb, verb + preposition', () => {
    expect(p8.phrase.literal).toEqual('lamz me');
  });

  const p9 = createCompoundPhraseme('tiz', 'taiztingy');
  test('adverbial phrase, place', () => {
    expect(p9.phrase.literal).toEqual('tiw taiztingy');
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
  const p1 = inflectToParticiple('thua', 'khih', TonalLetterTags.zero);
  test('check the base form', () => {
    expect(p1.phrase.literal).toEqual('thua khih');
    expect(p1.getForms()[0].literal).toEqual('thua khi');
  });

  const p2 = inflectToParticiple('thua', 'khih', TonalLetterTags.z);
  test('check the base form', () => {
    expect(p2.phrase.literal).toEqual('thua khih');
    expect(p2.getForms()[0].literal).toEqual('thuaz khiz');
  });

  const p3 = inflectVppToParticiple('pun', 'cut', 'laih', TonalLetterTags.zero);
  test('check the base form', () => {
    expect(p3.phrase.literal).toEqual('pun cut laih');
    expect(p3.getForms()[0].literal).toEqual('pun cutf lai');
  });

  const p4 = inflectVppToParticiple('tin', 'lurh', 'laih', TonalLetterTags.z);
  test('check the base form', () => {
    expect(p4.phrase.literal).toEqual('tin lurh laih');
    expect(p4.getForms()[0].literal).toEqual('tinz lurz laiz');
  });
});

describe('Phrase testing', () => {
  const p1 = createTonalPhrase('pinypiangy kiurw');
  test('onomatopeia', () => {
    expect(p1.literal).toEqual('pinypiangy kiurw');
  });

  const p2 = createTonalPhrase('khuahy linzlong');
  test('gifchongwguy', () => {
    expect(p2.literal).toEqual('khuahy linzlong');
  });

  const p3 = createTonalPhrase('hingx liz');
  test('enclitic', () => {
    expect(p3.literal).toEqual('hingx liz');
  });

  const lx4 = createTonalInflectionLexeme('kaz');
  const p4 = createTonalPhrase(lx4.word.literal);
  const phm4 = createCompoundPhraseme('', lx4.word.literal);
  test('phrase, the preceding word is left empty, hence the space before kaz', () => {
    expect(p4.literal).toEqual('kaz');
    expect(phm4.phrase.literal).toEqual(' kaz');
  });

  const p5 = createTonalPhrase('kangz');
  test('phrase', () => {
    expect(p5.literal).toEqual('kangz');
  });

  const p6 = createTonalPhrase('jiss sih');
  test('noun phrase, regressive assimilation of jitt sih', () => {
    expect(p6.literal).toEqual('jiss sih');
  });

  const p7 = createTonalPhrase('lagg gueh');
  test('noun phrase, surface form of lakk gueh', () => {
    expect(p7.literal).toEqual('lagg gueh');
  });

  const p8 = createTonalPhrase('jibb bih');
  test('verb phrase', () => {
    expect(p8.literal).toEqual('jibb bih');
  });

  const p9 = createTonalPhrase('chutwchull leh');
  test('verb phrase, regressive assimilation of chutwchutt leh', () => {
    expect(p9.literal).toEqual('chutwchull leh');
  });

  const p10 = createTonalPhrase('cig gueh');
  test('noun phrase, surface form of cit gueh', () => {
    expect(p10.literal).toEqual('cig gueh');
  });

  const p11 = createTonalPhrase('jib bih');
  test('verb phrase', () => {
    expect(p11.literal).toEqual('jib bih');
  });

  const p12 = createTonalPhrase('cul laih');
  test('verb phrase, regressive assimilation of cut laih', () => {
    expect(p12.literal).toEqual('cul laih');
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
