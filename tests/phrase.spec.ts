import { TonalPhrasalInflector, TonalPhrasalAssimilator } from '../src/dparser/analyzer';
import { AssimiDirection } from '../src/dparser/morpheme';

describe('Phrasal verb testing, transitive', () => {
    const phva = new TonalPhrasalInflector();

    const ph = phva.analyzeTransitiveFourth('koannw', 'diurh');

    test('check the base form', () => {
        expect(ph.phrase.literal).toEqual('koannw diurh');
    });

    test('check the proceeding form', () => {
        expect(ph.getProceedingForms()[0].literal).toEqual('koanny diurh');
    });
});

describe('Phrasal verb testing, transitive', () => {
    const phva = new TonalPhrasalInflector();

    const ph = phva.analyzeIntransitive('laix', 'leh');

    test('check the base form', () => {
        expect(ph.phrase.literal).toEqual('laix leh');
    });
});

describe('Adjective testing, transitive', () => {
    const phva = new TonalPhrasalInflector();

    const ph = phva.analyzeAdjective('sin', 'e');

    test('check the proceeding form', () => {
        expect(ph.getProceedingForms()[0].literal).toEqual('sin ez');
    });

    const frase = ph.getProceedingForms()[0].literal;
    const words = frase.split(' ');
    const phassi = new TonalPhrasalAssimilator();
    const ph4 = phassi.analyzeAdjective(words[0], words[1]);

    test('check the assimilated form', () => {
        expect(ph4.getAssimilatedForms(AssimiDirection.agressive)[0].literal).toEqual('sin nez');
    });
});

describe('Phrasal verb testing, 2 empty words, 1 empty phrase', () => {
    const phva = new TonalPhrasalInflector();

    const inputEmpty: any = '';

    const ph1 = phva.analyzeTransitiveFourth(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph1.phrase.literal).toEqual('');
    });

    test('check the number of proceeding forms of an empty phrase', () => {
        expect(ph1.getProceedingForms().length).toEqual(0);
    });

    const ph2 = phva.analyzeIntransitive(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph2.phrase.literal).toEqual('');
    });

    const ph3 = phva.analyzeAdjective(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph3.getProceedingForms().length).toEqual(0);
    });

    const tphassimi = new TonalPhrasalAssimilator();
    const ph4 = tphassimi.analyzeAdjective(inputEmpty, inputEmpty);

    test('check the empty phrase', () => {
        expect(ph4.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph4.getAssimilatedForms(AssimiDirection.agressive).length).toEqual(0);
    });
});

describe('Phrasal verb testing, undefined input', () => {
    const phva = new TonalPhrasalInflector();

    const inputUnd: any = undefined;

    const ph1 = phva.analyzeTransitiveFourth(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph1.phrase.literal).toEqual('');
    });

    test('check the number of proceeding forms of an empty phrase', () => {
        expect(ph1.getProceedingForms().length).toEqual(0);
    });

    const ph2 = phva.analyzeIntransitive(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph2.phrase.literal).toEqual('');
    });

    const ph3 = phva.analyzeAdjective(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph3.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph3.getProceedingForms().length).toEqual(0);
    });

    const tphassimi = new TonalPhrasalAssimilator();
    const ph4 = tphassimi.analyzeAdjective(inputUnd, inputUnd);

    test('check the empty phrase', () => {
        expect(ph4.phrase.literal).toEqual('');
    });

    test('check the number of other forms of an empty phrase', () => {
        expect(ph4.getAssimilatedForms(AssimiDirection.agressive).length).toEqual(0);
    });
});
