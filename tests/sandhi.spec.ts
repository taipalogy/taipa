import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sutflay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].getLiteral()).toEqual(TonalLetterTags.l);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('jiokkxgay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].getLiteral()).toEqual(TonalLetterTags.g);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qapfbay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].getLiteral()).toEqual(TonalLetterTags.b);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qamxmay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].getLiteral()).toEqual(TonalLetterTags.m);
    });
});

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('soanfnay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].getLiteral()).toEqual(TonalLetterTags.n);
    });
});