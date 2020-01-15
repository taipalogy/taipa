import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalInflectionAnalyzer } from '../src/dparser/analyzer';
import { AssimilatedFinalForm } from '../src/dparser/morpheme';
import { RegressiveAssimilation } from '../src/dparser/lexeme';

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sutflay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.l);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('jiokkxgay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.g);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qapfbay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.b);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qamxmay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.m);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('soanfnay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.n);
    });
});

describe("Voiced final testing", () => {
    const tia = new TonalInflectionAnalyzer();
    const l = tia.analyze('lakkwex', new AssimilatedFinalForm(), new RegressiveAssimilation())

    test("chech the surface form", () => {
        expect(l.otherForms[0].literal).toEqual('laggwex');
    });
});