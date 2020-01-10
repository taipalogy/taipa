import { PhrasalVerbAnalyzer } from '../src/dparser/analyzer'

describe("Phrasal verb testing, transitive", () => {
    const phva = new PhrasalVerbAnalyzer();

    const ph = phva.analyzeTransitive('koannw', 'diurh')

    test("check the base form", () => {
        expect(ph.phrase.literal).toEqual('koannw diurh');
    });

    test("check the sandhi form", () => {
        expect(ph.sandhiForm.literal).toEqual('koanny diurh');
    });
});

describe("Phrasal verb testing, transitive", () => {
    const phva = new PhrasalVerbAnalyzer();
    
    const ph = phva.analyzeIntransitive('laix', 'leh');
    
    test("check the base form", () => {
        expect(ph.phrase.literal).toEqual('laix leh');
    });

});