import { TonalPhrasalInflector } from '../src/dparser/inflector';
import { TonalPhrasalAssimilator } from '../src/dparser/assimilator';
import { TonalCreator } from '../src/dparser/creator';

describe('Phrasal verb testing, transitive', () => {
    const phva = new TonalPhrasalInflector();

    const ph = phva.inflectMainVerb('koannw', 'diurh');

    test('check the base form', () => {
        expect(ph.phrase.literal).toEqual('koannw diurh');
    });

    test('check the proceeding form', () => {
        expect(ph.getForms()[0].literal).toEqual('koanny diurh');
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

    const phrm = infl.inflectToProceeding('lipp', 'kih');

    test('check the base form', () => {
        expect(phrm.phrase.literal).toEqual('lipp kih');
    });

    test('check the proceeding form', () => {
        expect(phrm.getForms()[0].literal).toEqual('lippw kihf');
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

describe('Phrasal verb testing, 2 empty words, 1 empty phrase', () => {
    const inputEmpty: any = '';

    const assimi = new TonalPhrasalAssimilator();
    const ph1 = assimi.assimilateAgressive(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph1.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph1.getForms().length).toEqual(0);
    });

    const infl = new TonalPhrasalInflector();

    const ph2 = infl.inflectMainVerb(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph2.phrase.literal).toEqual('');
    });

    test('check the number of proceeding forms of an empty phrase', () => {
        expect(ph2.getForms().length).toEqual(0);
    });

    const ph3 = infl.dontInflectCompound(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

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
});

describe('Phrasal verb testing, undefined input', () => {
    const inputUnd: any = undefined;

    const assimi = new TonalPhrasalAssimilator();
    const ph1 = assimi.assimilateRegressive(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph1.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph1.getForms().length).toEqual(0);
    });

    const infl = new TonalPhrasalInflector();

    const ph2 = infl.inflectMainVerb(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph2.phrase.literal).toEqual('');
    });

    test('check the number of proceeding forms of an empty phrase', () => {
        expect(ph2.getForms().length).toEqual(0);
    });

    const ph3 = infl.dontInflectCompound(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

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
});
