import { PhrasalInflectionAnalyzer } from '../src/dparser/analyzer'
import { Adnominal, Assimilation } from '../src/dparser/phraseme';

describe("Phrasal verb testing, transitive", () => {
    const phva = new PhrasalInflectionAnalyzer();

    const ph = phva.analyzeTransitive('koannw', 'diurh')

    test("check the base form", () => {
        expect(ph.phrase.literal).toEqual('koannw diurh');
    });

    test("check the proceeding form", () => {
        expect(ph.proceedingForms[0].literal).toEqual('koanny diurh');
    });
});

describe("Phrasal verb testing, transitive", () => {
    const phva = new PhrasalInflectionAnalyzer();
    
    const ph = phva.analyzeIntransitive('laix', 'leh');
    
    test("check the base form", () => {
        expect(ph.phrase.literal).toEqual('laix leh');
    });

});

describe("Adjective testing, transitive", () => {
    const phva = new PhrasalInflectionAnalyzer();
    
    const ph = phva.analyzeAdjective('sin', 'e', new Adnominal());
    
    test("check the proceeding form", () => {
        expect(ph.otherForms[0].literal).toEqual('sin ez');
    });

    const frase = ph.otherForms[0].literal;
    const words = frase.split(" ")
    const ph4 = phva.analyzeAdjective(words[0], words[1], new Assimilation());

    test("check the assimilated form", () => {
        expect(ph4.otherForms[0].literal).toEqual('sin nez');
    });
});

describe("Phrasal verb testing, 2 empty words, 1 empty phrase", () => {
    const phva = new PhrasalInflectionAnalyzer();

    const ph1 = phva.analyzeTransitive('', '');

    test("check the empty phrase", () => {
        expect(ph1.phrase.literal).toEqual('');
    });

    test("check the number of proceeding forms of an empty phrase", () => {
        expect(ph1.proceedingForms.length).toEqual(0);
    });

    const ph2 = phva.analyzeIntransitive('', '');

    test("check the empty phrase", () => {
        expect(ph2.phrase.literal).toEqual('');
    });

    const ph3 = phva.analyzeAdjective('', '', new Adnominal());

    test("check the empty phrase", () => {
        expect(ph3.phrase.literal).toEqual('');
    });

    test("check the number of other forms of an empty phrase", () => {
        expect(ph3.otherForms.length).toEqual(0);
    });

    const ph4 = phva.analyzeAdjective('', '', new Assimilation());

    test("check the empty phrase", () => {
        expect(ph4.phrase.literal).toEqual('');
    });

    test("check the number of other forms of an empty phrase", () => {
        expect(ph4.otherForms.length).toEqual(0);
    });
});
