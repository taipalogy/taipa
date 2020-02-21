import { TonalPhrasalInflector } from '../src/dparser/inflector';
import { TonalPhrasalAssimilator } from '../src/dparser/assimilator';

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
    const phva = new TonalPhrasalInflector();

    const ph = phva.dontInflectCompound('laix', 'leh');

    test('check the base form', () => {
        expect(ph.phrase.literal).toEqual('laix leh');
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

describe('Phrasal verb testing, 2 empty words, 1 empty phrase', () => {
    const phva = new TonalPhrasalInflector();

    const inputEmpty: any = '';

    const ph1 = phva.inflectMainVerb(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph1.phrase.literal).toEqual('');
    });

    test('check the number of proceeding forms of an empty phrase', () => {
        expect(ph1.getForms().length).toEqual(0);
    });

    const ph2 = phva.dontInflectCompound(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph2.phrase.literal).toEqual('');
    });

    const ph3 = phva.inflectEToAdnominal(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph3.getForms().length).toEqual(0);
    });

    const tphassimi = new TonalPhrasalAssimilator();
    const ph4 = tphassimi.assimilateAgressive(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph4.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph4.getForms().length).toEqual(0);
    });
});

describe('Phrasal verb testing, undefined input', () => {
    const phva = new TonalPhrasalInflector();

    const inputUnd: any = undefined;

    const ph1 = phva.inflectMainVerb(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph1.phrase.literal).toEqual('');
    });

    test('check the number of proceeding forms of an empty phrase', () => {
        expect(ph1.getForms().length).toEqual(0);
    });

    const ph2 = phva.dontInflectCompound(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph2.phrase.literal).toEqual('');
    });

    const ph3 = phva.inflectEToAdnominal(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph3.getForms().length).toEqual(0);
    });

    const tphassimi = new TonalPhrasalAssimilator();
    const ph4 = tphassimi.assimilateRegressive(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph4.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph4.getForms().length).toEqual(0);
    });
});
