import { TonalPhrasalInflector } from '../src/dparser/inflector';
import { TonalPhrasalAssimilator } from '../src/dparser/assimilator';
import { TonalCreator } from '../src/dparser/creator';
import { TonalLetterTags } from '../src/tonal/version2';
import { EighthToFirstCombining } from '../src/dparser/morpheme';
import { TonalSyllable } from '../src/tonal/morpheme';

describe('Phrasal verb testing, transitive', () => {
    const phva = new TonalPhrasalInflector();

    const ph = phva.inflectToProceeding('koannw', 'diurh');

    test('check the base form', () => {
        expect(ph.phrase.literal).toEqual('koannw diurh');
    });

    test('check the proceeding form', () => {
        expect(ph.getForms()[0].literal).toEqual('koanny diurhhw');
    });
});

describe('Phrasal verb testing, intransitive', () => {
    const tc = new TonalCreator();

    const p = tc.createPhrase('laix leh');

    test('check the base form', () => {
        expect(p.literal).toEqual('laix leh');
    });
});

describe('Adjective testing, adnominal', () => {
    const phva = new TonalPhrasalInflector();

    const ph = phva.inflectEToAdnominal('sin', 'e');

    test('check the proceeding form', () => {
        expect(ph.getForms()[0].literal).toEqual('sin ez');
    });

    const frase = ph.getForms()[0].literal;
    const words = frase.split(' ');
    const phassi = new TonalPhrasalAssimilator();
    const ph4 = phassi.assimilateAgressive(words[0], words[1]);

    test('check the assimilated form', () => {
        expect(ph4.getForms()[0].literal).toEqual('sin nez');
    });
});

describe('Phrasal verb testing, transitive, adverbial', () => {
    const infl = new TonalPhrasalInflector();

    const p1 = infl.inflectToProceeding('lipp', 'kih');

    test('check the base form', () => {
        expect(p1.phrase.literal).toEqual('lipp kih');
    });

    test('check the proceeding form', () => {
        expect(p1.getForms()[0].literal).toEqual('lippw kihf');
    });

    const p2 = infl.inflectToProceeding('tehh', 'cut', 'kih');

    test('check the base form', () => {
        expect(p2.phrase.literal).toEqual('tehh cut kih');
    });

    test('check the proceeding form', () => {
        expect(p2.getForms()[0].literal).toEqual('tehhw cutf kihf');
    });

    let s2 = new TonalSyllable(p2.getForms()[0].words[2].syllables[0].letters);
    s2.popLetter();
    s2.popLetter();
    test('check free form of kihf', () => {
        expect(s2.literal).toEqual('ki');
    });

    const p3 = infl.inflectToProceeding('tehh', 'kih', 'laih');

    test('check the base form', () => {
        expect(p3.phrase.literal).toEqual('tehh kih laih');
    });

    test('check the proceeding form', () => {
        expect(p3.getForms()[0].literal).toEqual('tehhw kihf laiz');
    });
});

describe('Verb phrase testing, conjunctive', () => {
    const infl = new TonalPhrasalInflector();

    const p = infl.inflectToConjunctive('chez', 'lez');

    test('check the proceeding form', () => {
        expect(p.getForms()[0].literal).toEqual('chew le');
    });
});

describe('Noun phrase testing, possesive', () => {
    const infl = new TonalPhrasalInflector();

    const fr = infl.inflectPossesive('azbengx', 'ex');

    test('check the proceeding form', () => {
        expect(fr.getForms()[0].literal).toEqual('azbengx ew');
    });

    const frase = fr.getForms()[0].literal;
    const words = frase.split(' ');
    const assimi = new TonalPhrasalAssimilator();
    const phm = assimi.assimilateAgressive(words[0], words[1]);

    test('check the assimilated form', () => {
        expect(phm.getForms()[0].literal).toEqual('azbengx ngew');
    });
});

describe('Serial words testing', () => {
    const infl = new TonalPhrasalInflector();

    const fr = infl.inflectSerial('goay', 'siz', 'chittwlex');

    test('check the base form', () => {
        expect(fr.phrase.literal).toEqual('goa siw chittwlex');
    });

    test('check the proceeding form', () => {
        expect(fr.getForms()[0].literal).toEqual('goa siw chittwlez');
    });
});

describe('Compound testing', () => {
    const tc = new TonalCreator();

    const p1 = tc.createCompoundPhraseme('qanzkoy', 'lezle');

    test('gifchongwguy', () => {
        expect(p1.phrase.literal).toEqual('qanzko lezle');
    });

    const p2 = tc.createCompoundPhraseme('cuhycuh', 'qiurw');

    test('gifchongwguy', () => {
        expect(p2.phrase.literal).toEqual('cuhycuhy qiurw');
    });

    const p3 = tc.createCompoundPhraseme('siamy', 'qoew');

    test('separate vv compound', () => {
        expect(p3.phrase.literal).toEqual('siam qoew');
    });

    const p4 = tc.createCompoundPhraseme('poaw', 'kih');

    test('separable phrasal verb, verb-subsidiary compound', () => {
        expect(p4.phrase.literal).toEqual('poay kih');
    });

    const p5 = tc.createCompoundPhraseme('chiahh', 'vay');

    test('separable verb', () => {
        expect(p5.phrase.literal).toEqual('chiahhw vay');
    });

    const p8 = tc.createCompoundPhraseme('lamx', 'me');

    test('prepositional verb, verb + preposition', () => {
        expect(p8.phrase.literal).toEqual('lamz me');
    });

    const p9 = tc.createCompoundPhraseme('diz', 'daizdengy');

    test('adverbial phrase, place', () => {
        expect(p9.phrase.literal).toEqual('diw daizdengy');
    });

    const p10 = tc.createCompoundPhraseme('uiw', 'sannzdiamy');

    test('adverbial phrase, time', () => {
        expect(p10.phrase.literal).toEqual('uiy sannzdiamy');
    });

    const p11 = tc.createCompoundPhraseme('bong', 'dienwnauy');

    test('gerund', () => {
        expect(p11.phrase.literal).toEqual('bongz dienwnauy');
    });
});

describe('Phrasal verb testing, participle form', () => {
    const phva = new TonalPhrasalInflector();

    const p1 = phva.inflectToParticiple('toa', 'kih', TonalLetterTags.zero);

    test('check the base form', () => {
        expect(p1.phrase.literal).toEqual('toa kih');
    });

    test('check the participle form', () => {
        expect(p1.getForms()[0].literal).toEqual('toa ki');
    });

    const p2 = phva.inflectToParticiple('toa', 'kih', TonalLetterTags.z);

    test('check the base form', () => {
        expect(p2.phrase.literal).toEqual('toa kih');
    });

    test('check the participle form', () => {
        expect(p2.getForms()[0].literal).toEqual('toaz kiz');
    });
});

describe('Phrase testing', () => {
    const tc = new TonalCreator();

    const p1 = tc.createPhrase('vinyviangy qiurw');

    test('onomatopeia', () => {
        expect(p1.literal).toEqual('vinyviangy qiurw');
    });

    const p2 = tc.createPhrase('koahy linzlong');

    test('gifchongwguy', () => {
        expect(p2.literal).toEqual('koahy linzlong');
    });

    const p3 = tc.createPhrase('hengx liz');

    test('enclitic', () => {
        expect(p3.literal).toEqual('hengx liz');
    });

    const w4 = tc.createWord('qaz');
    const lx4 = tc.createLexeme(w4.literal);
    const p4 = tc.createPhrase(lx4.word.literal);
    const phm4 = tc.createCompoundPhraseme('', p4.literal);

    test('phrase', () => {
        expect(phm4.phrase.literal).toEqual(' qaz');
    });

    const p5 = tc.createPhrase('qangz');

    test('phrase', () => {
        expect(p5.literal).toEqual('qangz');
    });
});

describe('Phrasal verb testing, 2 empty words, 1 empty phrase', () => {
    const inputEmpty: any = '';

    const crt = new TonalCreator();
    const ph3 = crt.createCompoundPhraseme(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

    const infl = new TonalPhrasalInflector();

    const ph4 = infl.inflectEToAdnominal(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph4.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph4.getForms().length).toEqual(0);
    });

    const ph5 = infl.inflectPossesive(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph5.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph5.getForms().length).toEqual(0);
    });

    const ph6 = infl.inflectToConjunctive(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph6.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph6.getForms().length).toEqual(0);
    });

    const ph7 = infl.inflectToProceeding(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph7.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph7.getForms().length).toEqual(0);
    });

    const ph8 = infl.inflectToParticiple(inputEmpty, inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph8.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph8.getForms().length).toEqual(0);
    });

    const ph9 = infl.inflectSerial(inputEmpty, inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph9.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph9.getForms().length).toEqual(0);
    });
});

describe('Phrasal verb testing, undefined input', () => {
    const inputUnd: any = undefined;

    const crt = new TonalCreator();
    const ph3 = crt.createCompoundPhraseme(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

    const infl = new TonalPhrasalInflector();

    const ph4 = infl.inflectEToAdnominal(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph4.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph4.getForms().length).toEqual(0);
    });

    const ph5 = infl.inflectPossesive(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph5.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph5.getForms().length).toEqual(0);
    });

    const ph6 = infl.inflectToConjunctive(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph6.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph6.getForms().length).toEqual(0);
    });

    const ph7 = infl.inflectToProceeding(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph7.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph7.getForms().length).toEqual(0);
    });

    const ph8 = infl.inflectToParticiple(inputUnd, inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph8.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph8.getForms().length).toEqual(0);
    });

    const ph9 = infl.inflectSerial(inputUnd, inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph9.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph9.getForms().length).toEqual(0);
    });
});
