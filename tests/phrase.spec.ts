import { PhrasalVerbAnalyzer } from '../src/dparser/analyzer'
import { Adnominal, Assimilation } from '../src/dparser/phraseme';

describe("Phrasal verb testing, transitive", () => {
    const phva = new PhrasalVerbAnalyzer();

    const ph = phva.analyzeTransitive('koannw', 'diurh')

    test("check the base form", () => {
        expect(ph.phrase.literal).toEqual('koannw diurh');
    });

    test("check the proceeding form", () => {
        expect(ph.proceedingForms[0].literal).toEqual('koanny diurh');
    });
});

describe("Phrasal verb testing, transitive", () => {
    const phva = new PhrasalVerbAnalyzer();
    
    const ph = phva.analyzeIntransitive('laix', 'leh');
    
    test("check the base form", () => {
        expect(ph.phrase.literal).toEqual('laix leh');
    });

});

describe("Adjective testing, transitive", () => {
    const phva = new PhrasalVerbAnalyzer();
    
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